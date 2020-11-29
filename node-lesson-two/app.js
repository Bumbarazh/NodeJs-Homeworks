const fs = require('fs');
const path = require('path');
const express = require('express');
const expressHbs = require('express-handlebars');

const pathToUsersJsonFile = path.join(process.cwd(), 'views', 'registered-users.json');
let isUserRegistered = false;
let isEmailInFile = false;
let isUserEmailInFile = false;

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

app.get('/', ((req, res) => {
    res.render('main');
}));

// GET Login page

app.get('/login', ((req, res) => {
    res.render('auth', { isEmailInFile });
}));

// GET Register page

app.get('/register', ((req, res) => {
    res.render('register', { isUserEmailInFile });
}));

// GET Users page

app.get('/users', ((req, res) => {
    if (isUserRegistered) {
        fs.readFile(pathToUsersJsonFile, (err, data) => {
            const users = JSON.parse(data);
            res.render('users', { users });
        });
    } else {
        res.redirect('/error');
    }
}));

// Logout

app.get('/logout', ((req, res) => {
    isUserRegistered = !isUserRegistered;
    isEmailInFile = false;
    isUserEmailInFile = false;
    res.redirect('/');
}));

// GET Error page

app.get('/error', ((req, res) => {
    res.render('error');
}));

// POST Login user to App or give him a message

app.post('/login', ((req, res) => {
    const { email, pass } = req.body;
    fs.readFile(pathToUsersJsonFile, (err, data) => {
        if (err) {
            throw err;
        }
        const users = JSON.parse(data);
        if (users.find((user) => user.email === email && user.pass === pass)) {
            isUserRegistered = !isUserRegistered;
            res.redirect('/users');
        } else {
            isEmailInFile = !isEmailInFile;
            res.redirect('/login');
        }
    });
}));

// Post register a user in App

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
            res.redirect('/users');
        } else {
            isUserEmailInFile = !isUserEmailInFile;
            res.redirect('/register');
        }
    });
}));

// Start Server

app.listen(5000, () => {
    // console.log('App listen port 5000');
});
