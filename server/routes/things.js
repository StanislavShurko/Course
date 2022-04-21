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

    const thingState = await things.findOne({
        where : {
            thing_name: thing.thing_name,
            thing_type: thing.thing_type,
            thing_price: thing.thing_price,
        }
    });

    if (thing.thing_name === thingState.thing_name && thing.thing_type === thingState.thing_type && thing.thing_price === thingState.thing_price) {
        thingState.thing_count = thingState.thing_count + thing.thing_count;
        thingState.save();
        res.json(thingState)
    } else {
        await things.create(thing);
        res.json(thing);
    }
});

router.get('/last', async (req,res) => {
    const last = await things.findOne({
        order: [[ 'id', 'DESC' ]]
    })
    res.json(last.id);
});

module.exports = router;