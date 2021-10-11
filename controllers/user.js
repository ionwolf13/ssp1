const mongoose = require('mongoose');
const User = require('../models/user.js')
require('dotenv').config();

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

module.exports = { authUser, createUser, updateUser, deleteUser, findUser }