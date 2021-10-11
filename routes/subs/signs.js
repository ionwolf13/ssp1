const router = require('express').Router();
const { authUser, createUser, updateUser, deleteUser, findUser } = require('../../controllers/user.js');
const { resolve } = require('path');

require('dotenv').config();

router.get('/in', (req, res) => {
    res.sendFile(resolve('public', 'views', 'signIn.html'))
})

router.post('/in', async (req, res) => {
    try{
        const user = await authUser(req.body);
        if(user == null) throw 'No Account Was found.';
        res.sendFile(resolve('public', 'views', 'data', 'profile.html'))
    }catch(err){
        res.sendFile(resolve('public', 'views', 'signIn.html'))
        console.log(`Sign In Error: ${err}: ${err.message}`)
    }
})

router.get('/up', (req, res) => {
    res.sendFile(resolve('public', 'views', 'signUp.html'))
})

router.post('/up', async (req, res) => {
    try{
        const user = await createUser(req.body)
        if(user == null) throw 'Cannot create Account.';
        res.sendFile(resolve('public', 'views', 'data', 'profile.html'))
    }catch(err){
        res.sendFile(resolve('public', 'views', 'signUp.html'))
        console.log(`Sign Up Error, ${err}: ${err.message}`)
    }
})

module.exports = router;