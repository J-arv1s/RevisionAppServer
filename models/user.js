const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  // total/average score of subject/quizes
  // scores : [ ref quiz, ref sub -> score  ]
  isAdmin: { type: Boolean, default: false },
});

userSchema.statics.getAll = async function () {
  return await this.find();
};

userSchema.statics.getOneById = async function (id) {
  return await this.findById(id);
};

userSchema.statics.getOneByUsername = async function (username) {
  return await this.findOne({ username });
};

userSchema.statics.createOne = async function (data) {
    const { username, password, isAdmin = false } = data;
    const newUser = new this({ username, password, isAdmin });
    return await newUser.save(); 
  };

const User = mongoose.model('User', userSchema);
module.exports = User;
