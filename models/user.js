const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    middleName: String, 
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    company: [{
        name: String,
        state: String,
        city: String,
        smallComp: [{
                name: String,
                state: String,
                city: String,
                material: String,
                warehouse: [{
                    name: String,
                    state: String,
                    city: String,
                    inventory: String,
                    quantity: Number,
                    capacity: Number,
                    limit: Boolean
                }]
        }]
    }]
})

const User = model('User', userSchema)

module.exports = User;