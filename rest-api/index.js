const express = require('express');
const mongoose = require('mongoose');
// const apiRouter = require('./router')
const cors = require('./middlewares/cors');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');
const dataController = require('./controllers/dataController')

const connectionString = 'mongodb://127.0.0.1:27017/pcbuildz';

start();

async function start() {
    await mongoose.connect(connectionString);
    console.log('Database connected');

    const app = express();


    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        res.json({ message: 'REST service operational' });
    });

    // app.use('/users');
    app.use('/items/catalog', dataController);

    app.listen(3000, () => console.log('REST service started on port 3000!'));
}