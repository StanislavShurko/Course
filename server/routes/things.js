const express = require('express');
const router = express.Router();
const { things } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware")

router.get('/', async (req, res) => {
    const listOfThings = await things.findAll();
    res.json(listOfThings);
});

router.post('/', validateToken, async (req, res) => {
    const thing = req.body;
    await things.create(thing);
    res.json(thing);
});

module.exports = router;