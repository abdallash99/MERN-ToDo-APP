const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const config = require('config')
const { check, validationResult } = require('express-validator')
const router = express.Router();


router.post('/', [
    check('password', 'password length is greater than 6').isLength({ min: 6 }),
    check('name', 'Name Is Required').notEmpty(),
    check('email', 'email shold be email').isEmail()
], async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array())
        }
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({ msg: 'Email is already exist' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password: hashPassword })
        await user.save();
        const payload = {
            user: user._id
        }
        const token = jwt.sign(payload, config.get('secret'), { expiresIn: '1h' })
        res.status(200).json({ token });
    } catch (err) {
        console.log(err)
        res.status(500).send('internal Server Error')
    }
})

module.exports = router;