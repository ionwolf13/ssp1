const router = require('express').Router();
const { resolve } = require('path')
require('dotenv').config();
const { createUser, updateUser, deleteUser, findUser, updateCompany, updateSmall, updateWare } = require('../../controllers/user.js');

router.get('/', async (req, res) => {
    try{
        const user = await findUser();
        res.status(200).json(user)
    }catch(err){
        console.error(`-- ${err}: ${err.message}`)
    } 
})

router.post('/', async (req, res) => {
    console.log(req.body, "FORM INFO")
    let currentMethod = null;
    if(req.body.postId === '001'){
        currentMethod = updateCompany;
    }
    else if(req.body.postId === '002'){
        currentMethod = updateSmall;
    }
    else if(req.body.postId === '003'){
        currentMethod = updateWare;
    }
    try{
        const user = await currentMethod(req.body);
        res.sendFile(resolve('public', 'views', 'data', 'profile.html'))
    }catch(err){
        console.error(`${err}: ${err.message}`)
    }
})

module.exports = router;