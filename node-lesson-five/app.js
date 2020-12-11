const express = require('express');
const db = require('./dataBase').getInstance();

const app = express();

db.setModels();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { usersRouter } = require('./routes');

app.use('/users', usersRouter);
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
