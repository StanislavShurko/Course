const express = require('express');
const router = express.Router();
const { users } = require('../models');
const { sign } = require("jsonwebtoken")

router.get('/', async (req, res) => {
    const listOfUsers = await users.findAll();
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

   if (user_password === user.user_password ) {
       const accessToken = sign({
           user_name: user.user_name,
           id: user.id,

       }, "importantSecret" );
       res.json(accessToken);
   } else {
       res.json({ error: "Wrong username and password combination" });
   };

});

router.get('/id', async (req, res) => {
    const listOfUsers = await users.findOne({
        where: {
            user_name: req.query.username,
            user_password: req.query.password,
        }
    });
    res.json(listOfUsers.id);
});

module.exports = router;

