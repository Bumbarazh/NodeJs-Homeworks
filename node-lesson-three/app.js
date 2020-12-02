const fs = require('fs');
const path = require('path');
const express = require('express');
const expressHbs = require('express-handlebars');

// const pathToUsersJsonFile = path.join(process.cwd(), 'views', 'registered-users.json');

// let isUserRegistered = false;
// let isEmailInFile = false;
// let isUserEmailInFile = false;
// let isUserLogin = false;
let {
    isUserEmailInFile, isUserLogin, isUserRegistered, isEmailInFile
} = require('./variables/lets');

// const messageToLogin = 'This email is already register on our site. Please, ';
// const messageToRegister = 'Your email or password aren\'t valid. Please, try to log in again or ';
// const messageToLogOrReg = 'To see yor account, you must to ';

const {
    messageToLogOrReg, messageToRegister, messageToLogin, pathToUsersJsonFile
} = require('./variables/constants');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'views')));

// Use Handlebars as engine for render

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(process.cwd(), 'views'));

// GET Main page

const mainRouter = require('./routes/main.route');

app.use('/', mainRouter);

// GET Login page

const loginRouter = require('./routes/login.route');

app.use('/login', loginRouter);

// GET Register page

app.get('/register', ((req, res) => {
    if (isUserRegistered) {
        return res.redirect('/users');
    }

    isUserLogin = false;
    isEmailInFile = false;

    res.render('register');
}));

// GET Users page

app.get('/users', ((req, res) => {
    if (isUserRegistered) {
        console.log('users');
        fs.readFile(pathToUsersJsonFile, (err, data) => {
            const users = JSON.parse(data);

            res.render('users', { users });
        });

        return;
    }

    isUserLogin = !isUserLogin;
    res.redirect('/error');
}));

// Logout

app.get('/logout', ((req, res) => {
    isUserRegistered = !isUserRegistered;

    res.redirect('/');
}));

// GET Error page

app.get('/error', ((req, res) => res.render('error', {
    messageToLogin,
    isUserEmailInFile,
    messageToRegister,
    isEmailInFile,
    messageToLogOrReg,
    isUserLogin
})
));

// POST register a user in App

app.post('/register', ((req, res) => {
    const { email, nick, pass } = req.body;

    fs.readFile(pathToUsersJsonFile, (err, data) => {
        if (err) {
            throw err;
        }

        const users = JSON.parse(data);

        if (!users.find((user) => user.email === email)) {
            users.push({ email, pass, nick });

            fs.writeFile(pathToUsersJsonFile, JSON.stringify(users), (error) => {
                if (error) {
                    throw error;
                }
            });

            isUserRegistered = !isUserRegistered;
            return res.redirect('/users');
        }

        isUserEmailInFile = !isUserEmailInFile;
        res.redirect('/error');
    });
}));

// Start Server

app.listen(5000, () => {
    // console.log('App listen port 5000');
});
