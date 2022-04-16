const express = require('express');
const router = express.Router();
const { users } = require('../models');

router.get('/', async (req, res) => {
    const listOfUsers = await things.findAll();
    res.json(listOfUsers);
});

router.post('/', async (req, res) => {
    const user = req.body;
    await users.create(user);
    res.json(user);
});

router.post('/login', async (req,res) => {
   const { user_name, user_password } = req.body;

   const user = await users.findOne({ where: {
        user_name: user_name,
       }});

   if(!user) res.json({ error: "user does not exist" });

   if (user_password === user.user_password) {
       res.json("You logged in!")
   } else {
       res.json({ error: "Wrong username and password combination" })
   }

});

module.exports = router;

