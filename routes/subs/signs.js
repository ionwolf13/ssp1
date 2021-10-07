const router = require('express').Router();
const { resolve } = require('path');

require('dotenv').config();

router.get('/in', (req, res) => {
    res.sendFile(resolve('public', 'views', 'signIn.html'))
})

router.post('/in', (req, res) => {
    console.log(req.body)
})

router.get('/up', (req, res) => {
    res.sendFile(resolve('public', 'views', 'signUp.html'))
})

module.exports = router;