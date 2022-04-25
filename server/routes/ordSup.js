const express = require('express');
const router = express.Router();
const { ordSup, things} = require('../models');

router.get('/', async (req, res) => {
    const listOfOrdSup = await ordSup.findAll();
    res.json(listOfOrdSup);
});

router.get('/sold', async (req, res) => {
    const listOfOrdSup = await ordSup.findAll({
        where: {
            ordSup_type: "Order",
        }
    });
    res.json(listOfOrdSup);
});

router.post('/', async (req, res) => {
    const ordsup = req.body;
    await ordSup.create(ordsup);
    res.json(ordsup);
});

router.get('/last', async (req,res) => {
    const last = await ordSup.findOne({
        order: [[ 'id', 'DESC' ]]
    })
    res.json(last.id);
});

router.get('/order', async (req, res) => {
    const listOfThings = await things.findAll();
    res.json(listOfThings);
});

module.exports = router;