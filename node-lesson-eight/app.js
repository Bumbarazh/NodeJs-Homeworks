const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const path = require('path');
const db = require('./dataBase').getInstance();

const app = express();

db.setModels();

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
});
