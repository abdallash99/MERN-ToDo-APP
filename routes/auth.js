const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const config = require('config')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    const id = req.user;
    try {
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error')
    }
})


router.post('/', [
    check('password', 'password length is greater than 6').isLength({ min: 6 }),
    check('email', 'email shold be email').isEmail()
], async (req, res) => {
    const { email, password } = req.body;

    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error.array())
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User Does not exist' })
        }
        const payload = {
            user: user._id
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                msg: 'Incorrect Password'
            })
        }
        const token = jwt.sign(payload, config.get('secret'), { expiresIn: '1h' })
        res.status(200).json({ token });
    } catch (err) {
        console.log(err)
        res.status(500).send('internal Server Error')
    }
})

module.exports = router;