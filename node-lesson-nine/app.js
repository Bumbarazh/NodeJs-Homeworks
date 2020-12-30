const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

const db = require('./dataBase').getInstance();
const cronJobRun = require('./cron-jobs');

const app = express();

db.setModels();
// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

const { usersRouter, authRouter, carsRouter } = require('./routes');

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/cars', carsRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.code || 500)
        .json({
            message: err.message,
        });
});

app.listen(5000, () => {
    // console.log('App listen port 5000');
    cronJobRun();
});

// eslint-disable-next-line no-underscore-dangle
function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/action-logs', { useNewUrlParser: true });
    const connect = mongoose.connection;

    connect.on('error', (error) => {
        console.log(error);
    });
}
