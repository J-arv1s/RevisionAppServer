const mongoose = require('mongoose')

const user_account = mongoose.model('user_account', new mongoose.Schema({
    is_admin: { 
        type: Boolean, 
        default: false 
    },
    username: {
        type: String,
        required: true
    },
    password: String,
}))

module.exports = user_account