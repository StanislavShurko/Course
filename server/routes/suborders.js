const express = require('express');
const router = express.Router();
const { suborders, things} = require('../models');
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get('/:thingId', async (req, res) => {
    const thingId = req.params.id;
    const things = await suborders.findAll({
        where: {
            thingId: thingId,
        }
    });
    res.json(things);
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