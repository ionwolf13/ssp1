const router = require('express').Router();
const { resolve } = require('path')
require('dotenv').config();
const { authUser, createUser, updateUser, deleteUser, findUser } = require('../../controllers/user.js');

router.get('/', async (req, res) => {
    try{
        console.log('IAM HERE')
        const user = await findUser();
        console.log(user, "Second TIME")
        res.status(200).json(user)
    }catch(err){
        console.error(`-- ${err}: ${err.message}`)
    } 
})

module.exports = router;