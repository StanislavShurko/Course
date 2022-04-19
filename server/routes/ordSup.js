const express = require('express');
const router = express.Router();
const { ordSup, things} = require('../models');

router.get('/', async (req, res) => {
    const listOfOrdSup = await ordSup.findAll();
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

module.exports = router;