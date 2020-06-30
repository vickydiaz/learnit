const express = require('express');
const router = express.Router();
const List = require('../models/List');


// GET api/list  [Get all lists]
router.get('/', async (req, res) => {
    try {
        const lists = await List.find();
        res.status(200).json(lists);
    } catch (err) {
        console.log(err);
    }
})


// GET api/lists/:id  [Get a single list]
router.get('/:id', async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.status(200).json(list);
    } catch (err) {
        console.log(err);
    }
})


// POST api/lists  [Save a new list]
router.post('/', async (req, res) => {
    try {
        const list = await List.create(req.body);
        res.status(201).json({ list });
    } catch (err) {
        console.log(err);
    }
})


// PUT api/lists/:id  [Update a list]
router.put('/:id', async (req, res) => {
    try {
        const list = await List.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!list) {
            return res.status(404).json({msg: "List not found"});
        }

        res.status(200).json({ list });
    } catch (err) {
        console.log(err);
    }
})

// DELETE api/lists/:id  [Delete a list]
router.delete('/:id', async (req, res) => {
    const list = await List.findByIdAndDelete(req.params.id);

    if(!list) {
        return res.status(404).json({msg: "List not found"});
    }

    res.status(200).json({list})
})


module.exports = router;