const mongoose = require('mongoose')

const user_account = mongoose.model('user_account', new mongoose.Schema({
    is_admin: { 
        type: Boolean, 
        default: false 
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
}))

user_account.statics.getOneByUsername = function(username) {
    return this.where({ username: new RegExp(username, 'i')})
};

user_account.statics.getOneById = function(userId) {
    return this.findById(userId);
};

user_account.statics.create = function(username, password, isAdmin) {
    return this.create({
        username,
        password,
        is_admin: isAdmin || false,
    });
}

module.exports = user_account
