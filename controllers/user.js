const mongoose = require('mongoose');
const User = require('../models/user.js')
require('dotenv').config();

/******************************************************/
//Auth
/******************************************************/

const authUser = async ({username, password}) => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        const user = await User.findOne({username, password});
        if(user == null) throw 'No Account was found.';
        mongoose.connection.close();
        return user;
    }catch(err) {
        mongoose.connection.close();
        console.error(`${err}: ${err.message}`)
    }
}

/******************************************************/
//User
/******************************************************/

const createUser = async ({ firstName, lastName, email, username, password}) => {
    console.log('we are in the create User part')
    try{
        await mongoose.connect(process.env.SSP1_URL);
        console.log('Connection to Atlas Successful!')
        const user = new User({ firstName, lastName, email, username, password})
        await user.save();
        mongoose.connection.close();
        return user;
    }catch(err){
        mongoose.connection.close();
        console.error(`${err}: ${err.message}`)
    }
}

const updateUser = async () => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err){
        mongoose.connection.close();
            console.error(`${err}: ${err.message}`)
    }
}

const deleteUser = async () => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err){
        mongoose.connection.close();
            console.error(`${err}: ${err.message}`)
    }
}

const findUser = async (username) => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        const user = await User.find({}, {firstName: 1, lastName: 1, username: 1, email: 1, company: 1});
        if(user == null) throw 'No Account was found.';
        mongoose.connection.close();
        return user;
    }catch(err) {
        mongoose.connection.close();
        console.error(`${err}: ${err.message}`)
    }
}

/******************************************************/
//Company
/******************************************************/

const createCompany = async ({ currentUser ,companyName, state }) => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        const user = await User.findOneAndUpdate({username: currentUser}, { $push: {company: {name: companyName, state: state}}})
        console.log(user, "Updated USER")
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err){
        mongoose.connection.close();
            console.error(`${err}: ${err.message}`)
    }
}








/******************************************************/
//Small Company
/******************************************************/

const createSmall = async ({ bigCompany, smallCompany, state, currentUser}) => {
    
    try{
        await mongoose.connect(process.env.SSP1_URL);
        const user = await User.findOneAndUpdate(
            {username: currentUser},
            { $push: {"company.$[elem].smallComp": {name: smallCompany, state: state}}},
            { arrayFilters: [ { "elem.name": bigCompany } ] }

        )
        if(user == null) throw `User unable to update.`
        console.log('Created This User', user)
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err){
        mongoose.connection.close();
            console.error(`${err}: ${err.message}`)
    }
}




/******************************************************/
//Warehouse
/******************************************************/

const createWare = async ({warehouseName, state, city, wareCapacity, wareQuantity, wareLimit, bigCompany, smallCompany, currentUser}) => {
    
    try{
        await mongoose.connect(process.env.SSP1_URL);
        const user = await User.findOneAndUpdate(
            {username: currentUser},
            { $push: {'company.$[elem1].smallComp.$[elem2].warehouse': {name: warehouseName,
                                                                        state: state,
                                                                        city: city,
                                                                        capacity: wareCapacity,
                                                                        quantity: wareQuantity,
                                                                        limit: wareLimit,}}},
            { arrayFilters: [{"elem1.name": bigCompany}, { "elem2.name": smallCompany}]}
            )
        
        console.log(user, 'Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err){
        mongoose.connection.close();
            console.error(`${err}: ${err.message}`)
    }
}









/******************************************************/
//Item
/******************************************************/

const createItem = async ({itemName, itemDescription, bigCompany, smallCompany, warehouse, currentUser}) => {
    
    try{
        await mongoose.connect(process.env.SSP1_URL);
        const user = await User.findOneAndUpdate(
            {username: currentUser},
            {
                $inc: {'company.$[elem1].smallComp.$[elem2].warehouse.$[elem3].quantity': 1},
                $push: {'company.$[elem1].smallComp.$[elem2].warehouse.$[elem3].inventory': {item: itemName, description: itemDescription}}
            },
                {arrayFilters: [{"elem1.name": bigCompany}, { "elem2.name": smallCompany}, {"elem3.name": warehouse}]}
            )
        if(user == null) throw `User unable to update.`
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err){
        mongoose.connection.close();
            console.error(`${err}: ${err.message}`)
    }
}

const updateItem = async ({itemName, itemDescription, bigCompany, smallCompany, warehouse, item, currentUser}) => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        const user = await User.findOneAndUpdate(
            {username: currentUser},
            {
                $set: {'company.$[elem1].smallComp.$[elem2].warehouse.$[elem3].inventory.$[elem4]': {item: itemName, description: itemDescription}}
            },
                {arrayFilters: [{"elem1.name": bigCompany}, { "elem2.name": smallCompany}, {"elem3.name": warehouse}, {"elem4._id": item}]}
        )
        if(user == null) throw `User unable to update.`
        console.log(user, 'THIS BE THE RESPONSE')
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err){
        mongoose.connection.close();
        console.error(`${err}: ${err.message}`)
    }
}

const deleteItem = async ({currentUser, bigCompany, smallCompany, warehouse, item}) => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        const user = await User.findOneAndUpdate(
            {username: currentUser},
            {
                $inc:{'company.$[elem1].smallComp.$[elem2].warehouse.$[elem3].quantity': -1},
                $pull: {'company.$[elem1].smallComp.$[elem2].warehouse.$[elem3].inventory':  {_id: item}}
            },
                {arrayFilters: [{"elem1.name": bigCompany}, { "elem2.name": smallCompany}, {"elem3.name": warehouse}]}
        )
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err){
        mongoose.connection.close();
            console.error(`${err}: ${err.message}`)
    }
}





module.exports = { authUser, createUser, updateUser, deleteUser, findUser , 
                createCompany, 
                createSmall, 
                createWare, 
                createItem, updateItem, deleteItem}