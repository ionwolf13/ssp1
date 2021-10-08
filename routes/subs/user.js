const router = require('express').Router();
const { resolve } = require('path')
require('dotenv').config();

router.get('/', (req, res) => {
    console.log(req.params,' THESE ARE THE PARAMS')
    res.sendFile(resolve('public', 'views', 'subs', 'home.html'))
})

module.exports = router;