const mongoose = require('mongoose');
require('dotenv').config();

const authUser = async () => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err) {
        mongoose.connection.close();
        console.error(`${err}: ${err.message}`)
    }
}

const createUser = async () => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
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

const findUser = async () => {
    try{
        await mongoose.connect(process.env.SSP1_URL);
        console.log('Connection to Atlas Successful!')
        mongoose.connection.close();
    }catch(err){
        mongoose.connection.close();
        console.error(`${err}: ${err.message}`)
    }
}

module.exports = { authUser, createUser, updateUser, deleteUser, findUser }