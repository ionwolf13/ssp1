const router = require('express').Router();
const { authUser, createUser, updateUser, deleteUser, findUser } = require('../../controllers/user.js');
const { resolve } = require('path');

require('dotenv').config();

router.get('/in', (req, res) => {
    res.sendFile(resolve('public', 'views', 'signIn.html'))
})

router.post('/in', (req, res) => {
    try{
        const user = authUser(req.body);
    }catch(err){
        console.log(`Sign In Error: ${err}: ${err.message}`)
    }
})

router.get('/up', (req, res) => {
    res.sendFile(resolve('public', 'views', 'signUp.html'))
})

router.post('/up', (req, res) => {
    // console.log('This is from the Sign Up Form')
    // console.log(req.body)
    try{
        const user = createUser(req.body)
        res.sendFile(resolve('public', 'views', 'data', 'home.html'))
    }catch(err){
        console.log(`Sign Up Error, ${err}: ${err.message}`)
    }
})

module.exports = router;