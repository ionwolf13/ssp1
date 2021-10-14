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
        smallComp: [{
                name: String,
                state: String,
                warehouse: [{
                    name: String,
                    state: String,
                    city: String,
                    inventory: [{
                        item: String,
                        description: String
                    }],
                    quantity: {
                        type: Number,
                        min: [0, 'Need to be greater than 0.'],
                        max: this.capacity,
                        validate: {
                            validator: function(){
                                return this.quantity <= this.capacity  
                            },
                            message: "Exceeds your warehouse Capacity."
                        }
                    },
                    capacity: {
                        type: Number,
                        min: [0, 'Need to be greater than 0.']
                    },
                    limit: {
                        type: Boolean,
                        validate: {validator: function(){
                            if(this.quantity == this.capacity){
                                this.limit = true
                            }
                            else{
                                this.limit = false
                            }
                        }}
                    }
                }]
        }]
    }]
})

const User = model('User', userSchema)

module.exports = User;