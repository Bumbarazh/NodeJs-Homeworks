const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const usersRouter = require('./routes/users.route');

app.use('/users', usersRouter);

app.listen(5000, () => {
    // console.log('App listen port 5000');
});
