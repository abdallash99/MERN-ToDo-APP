const Todo = require('../model/Todo');
const auth = require('../middleware/auth');
const express = require('express');
const { check, validationResult } = require('express-validator');
const { findById } = require('../model/Todo');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const id = req.user;
        const todos = await Todo.find({ user: id }).sort({ data: -1 })
        res.status(200).json(todos);
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})



router.post('/', [
    auth,
    [check('title', 'Title IS required').notEmpty()]
], async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json(err.array())
    }
    try {
        const { title } = req.body;
        const todo = new Todo({ title, user: req.user });
        await todo.save();
        res.status(200).json(todo);
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        await Todo.findByIdAndRemove(id);
        res.status(200).json({ msg: 'Removed Sucssesfully' });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})


router.put('/:id', [
    auth,
    [check('title', 'Title IS required').notEmpty()]
], async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json(err.array())
    }
    try {
        const { title, done } = req.body;
        const id = req.params.id;
        const todo = await Todo.findById(id);
        if (req.user.toString() !== todo.user.toString()) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        await Todo.findByIdAndUpdate(id, { title, done });
        res.status(200).json({ msg: 'updated Sucssesfully' });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})



module.exports = router;