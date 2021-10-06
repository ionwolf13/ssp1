const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    firstName: String,
    middleName: String, 
    lastName: String,
    email: String,
    password: String
    // company: [{
    //     name: String,
    //     state: String,
    //     city: String,
    //     franchise: [{
    //             name: String,
    //             state: String,
    //             city: String,
    //             material: String,
    //             warehouse: [{
    //                 name: String,
    //                 state: String,
    //                 city: String,
    //                 inventory: String,
    //                 quantity: Number,
    //                 capacity: Number,
    //                 limit: Boolean
    //             }]
    //     }]
    // }]
})

const User = model('User', userSchema)

module.exports = User;