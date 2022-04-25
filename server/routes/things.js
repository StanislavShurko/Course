const express = require('express');
const router = express.Router();
const { things } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware")

router.get('/', async (req, res) => {
    const listOfThings = await things.findAll();
    res.json(listOfThings);
});

router.get('/byId', async (req, res) => {
    const id = req.query.subId;
    const post = await things.findByPk(id);
    res.json(post.thing_name);
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

        if (thingState && thing.thing_name === thingState.thing_name && thing.thing_type === thingState.thing_type && thing.thing_price === thingState.thing_price) {
            thingState.thing_count = thingState.thing_count + thing.thing_count;
            thingState.save();
            res.json("Додано до " + thingState.thing_name)
        } else {
            await things.create(thing);
            res.json("Створено новый товар");
        }

});

router.post('/order', validateToken ,async (req, res) => {
    const order = req.body;

    const orderState = await things.findOne({
        where : {
            thing_name: order.thing_name,
            thing_type: order.thing_type,
            thing_price: order.thing_price,
        }
    });

    if (orderState && order.thing_name === orderState.thing_name && order.thing_type === orderState.thing_type && order.thing_price === orderState.thing_price) {
        if (orderState.thing_count >= order.thing_count) {
            orderState.thing_count = orderState.thing_count - order.thing_count;
            res.json("Відправлено замовлення " + orderState.thing_name + ". В кількості: " + order.thing_count)
        } else {
            res.json("Такої кількості немає на складі:" + orderState.thing_count)
        }
        orderState.save();
    } else {
        res.json("Такого товару немає на складі");
    }

});

router.get('/last', async (req,res) => {
    const last = await things.findOne({
        order: [[ 'id', 'DESC' ]]
    })
    res.json(last.id);
});

router.get('/total', async (req, res) => {
    const obj = await things.findAll();
    let total = 0;
    for (let i = 0; i < obj.length; i++) {
        total += Number(obj[i].thing_count) * Number(obj[i].thing_price);
    }
    res.json(total);
});

module.exports = router;