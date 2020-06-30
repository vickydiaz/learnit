const express = require('express');
const router = express.Router();
const Word = require('../models/Word');


// GET api/words  [Get all words]
router.get('/', async (req, res) => {
    try {
        const words = await Word.find().populate({
            path: 'list',
            select: 'title'
        });
        res.status(200).json(words);
    } catch (err) {
        console.log(err);
    }
})

// GET api/words/review  [Get all words to be reviewed]
router.get('/review', async (req, res) => {
    try {
        const words = await Word.find({ dueDate: { $lte: Date.now() } });
        res.status(200).json(words);
    } catch (err) {
        console.log(err);
    }
})

// GET api/words/:id  [Get a single word]
router.get('/:id', async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        res.status(200).json(word);
    } catch (err) {
        console.log(err);
    }
})


// POST api/words  [Save a new word]
router.post('/', async (req, res) => {
    try {
        const word = await Word.create(req.body);
        res.status(201).json({ word });
    } catch (err) {
        console.log(err);
    }
})


// PUT api/words/:id  [Update a word]
router.put('/:id', async (req, res) => {
    try {
        const word = await Word.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!word) {
            return res.status(404).json({msg: "Word not found"});
        }

        res.status(200).json({ word });
    } catch (err) {
        console.log(err);
    }
})

// DELETE api/words/:id  [Delete a word]
router.delete('/:id', async (req, res) => {
    const word = await Word.findByIdAndDelete(req.params.id);

    if(!word) {
        return res.status(404).json({msg: "Word not found"});
    }

    res.status(200).json({word})
})


module.exports = router;