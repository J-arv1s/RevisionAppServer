const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  combinedScore: { type: Number, default: 0 },
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

userSchema.statics.updateOneByName = async function (username, data) {
  return await this.findOneAndUpdate({ username }, data, { new: true });
};

userSchema.statics.getUserScore = async function (username) {
  const user = await User.getOneByUsername(username)
  const score = user.combinedScore
  return score
}

userSchema.statics.updateUserScore = async function (username, score) {
  const user = await User.getOneByUsername(username)
  const incomingScore = score
  const startingScore = user.combinedScore

  user.combinedScore = incomingScore + startingScore
  await user.save()
  return user.combinedScore
}

const User = mongoose.model('User', userSchema);
module.exports = User;
