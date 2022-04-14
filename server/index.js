const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers

const thingRouter = require('./routes/things');
app.use('/things', thingRouter);

const suborderRouter = require('./routes/suborders');
app.use('/suborders', suborderRouter);

const ordSupRouter = require('./routes/ordSup');
app.use('/ordSup', ordSupRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

db.sequelize.sync().then( () => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    });
});
