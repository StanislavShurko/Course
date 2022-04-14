const express = require('express');
const router = express.Router();
const { things } = require('../models');

router.get('/', async (req, res) => {
    const listOfThings = await things.findAll();
    res.json(listOfThings);
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await things.findAll({where: {
        userIdUser: userId
        }})
    res.json(user);
});

router.post('/', async (req, res) => {
    const thing = req.body;
    await things.create(thing);
    res.json(thing);
});

module.exports = router;