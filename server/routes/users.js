const express = require('express');
const router = express.Router();
const { users } = require('../models');

router.post('/', async (req, res) => {
    const user = req.body;
    await users.create(user);
    res.json(user);
});

module.exports = router;