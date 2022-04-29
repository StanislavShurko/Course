const express = require('express');
const router = express.Router();
const { suborders, things, ordSup, users} = require('../models');
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get('/sold', async (req, res) => {
    const listOfSupply = await things.findAll({include: suborders})
    res.json(listOfSupply);
});

router.get('/sold2', async (req, res) => {
    const listOfSupply = await suborders.findAll({include: [things, ordSup]})
    res.json(listOfSupply);
});

router.get('/sold3', async (req, res) => {
    const listOfSupply = await ordSup.findAll({include: [suborders, users]})
    res.json(listOfSupply);
});


router.post('/', validateToken, async (req,res) => {
    const thing = req.body.data;

    const thingState = await things.findOne({
        where : {
            thing_name: thing.thing_name,
            thing_type: thing.thing_type,
            thing_price: thing.thing_price,
        }
    });

    const suborder = {};
    suborder.os_count = req.body.os_count;
    suborder.ordSupId = req.body.ordSupId;
    suborder.thingId = thingState.id
    await suborders.create(suborder);
    res.json(suborder);
});

module.exports = router;