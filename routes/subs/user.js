const router = require('express').Router();
const { resolve } = require('path')
require('dotenv').config();
const { createUser, updateUser, deleteUser, findUser, createCompany, createSmall, createWare , createItem, updateItem, deleteItem} = require('../../controllers/user.js');

router.get('/', async (req, res) => {
    try{
        const user = await findUser();
        res.status(200).json(user)
    }catch(err){
        console.error(`-- ${err}: ${err.message}`)
    } 
})





router.post('/', async (req, res) => {
    console.log(req.body, "FORM INFO POST ROUTE")
    let currentMethod = null;
    if(req.body.postId === '001'){
        currentMethod = createCompany;
    }
    else if(req.body.postId === '002'){
        currentMethod = createSmall;
    }
    else if(req.body.postId === '003'){
        currentMethod = createWare;
    }
    else if(req.body.postId === '004'){
        currentMethod = createItem;
    }
    try{

        const user = await currentMethod(req.body);
        // res.status(200).json(user)
        res.sendFile(resolve('public', 'views', 'data','profile'))

    }catch(err){
        console.error(`${err}: ${err.message}`)
    }
})





router.put('/:itemName/:itemDescription/:postId/:bigCompany/:smallCompany/:warehouse/:item/:currentUser', async (req, res) => {
    console.log(req.body,"THIS BE THE BODY")
    let currentMethod = null;
    if(req.params.postId === '001'){
        currentMethod = "";
    }
    else if(req.params.postId === '002'){
        currentMethod = '';
    }
    else if(req.params.postId === '003'){
        currentMethod = '';
    }
    else if(req.params.postId === '004'){
        currentMethod = updateItem;
    }
    try{
        const user = await currentMethod(req.params);
        res.status(200).json(user)
    }catch(err){
        console.error(`${err}: ${err.message}`)
    }
})





router.delete('/:currentUser/:bigCompany/:smallCompany/:warehouse/:item/:postId', async (req, res) => {
    console.log(req.params, "FORM INFO")
    let currentMethod = null;
    if(req.params.postId === '001'){
        currentMethod = createCompany;
    }
    else if(req.params.postId === '002'){
        currentMethod = createSmall;
    }
    else if(req.params.postId === '003'){
        currentMethod = createWare;
    }
    else if(req.params.postId === '004'){
        currentMethod = deleteItem;
    }
    try{
        const user = await currentMethod(req.params);
        res.sendFile(resolve('public', 'views', 'data', 'profile.html'))
    }catch(err){
        console.error(`${err}: ${err.message}`)
    }
})




module.exports = router;