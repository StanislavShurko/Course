const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers

const thingRouter = require('./routes/things');
app.use('/things', thingRouter);

const ordersRouter = require('./routes/order');
app.use('/order', ordersRouter);

const subordersRouter = require('./routes/suborder');
app.use('/suborder', subordersRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

db.sequelize.sync().then( () => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    });
});
