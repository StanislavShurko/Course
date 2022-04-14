const express = require('express');
const router = express.Router();
const { suborders } = require('../models');

router.get('/:thingId', async (req, res) => {
    const thingId = req.params.id;
    const things = await suborders.findAll({
        where: {
            thingId: thingId,
        }
    });
    res.json(things);
});

router.post('/', async (req,res) => {
    const suborder = req.body;
    await suborders.create(suborder);
    res.json(suborder);
});

module.exports = router;