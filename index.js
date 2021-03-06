const express = require('express');
const { resolve } = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8088;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/sign', require('./routes/subs/signs.js'))
app.use('/profile', require('./routes/subs/user.js'))

app.get(['/home','/'], (req, res) => {
    res.sendFile(resolve('public', 'views', 'index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(resolve('public', 'views', 'about.html'))
})

app.get('*', (req, res) => {
    res.sendFile(resolve('public', 'views', 'index404.html'))
    res.status(404)
})

app.listen(port, () => {
    console.log('Listeninig on port ', port)
})