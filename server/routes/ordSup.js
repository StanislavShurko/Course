const express = require('express');
const router = express.Router();
const { ordSup, suborders} = require('../models');

router.get('/', async (req, res) => {
    const listOfOrdSup = await things.findAll();
    res.json(listOfOrdSup);
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.id;
    const users = await suborders.findAll({
        where: {
            userId: userId,
        }
    });
    res.json(users);
});

router.post('/', async (req, res) => {
    const ordsup = req.body;
    await ordSup.create(ordsup);
    res.json(ordsup);
});

module.exports = router;