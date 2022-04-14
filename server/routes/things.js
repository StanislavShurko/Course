const express = require('express');
const router = express.Router();
const { things } = require('../models');

router.get('/', async (req, res) => {
    const listOfThings = await things.findAll();
    res.json(listOfThings);
});

router.post('/', async (req, res) => {
    const thing = req.body;
    await things.create(thing);
    res.json(thing);
});

module.exports = router;