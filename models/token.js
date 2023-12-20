const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid")

const tokenSchema = new Schema({
  user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', required: true },
  token: { type: String, required: true },
});

tokenSchema.statics.createOne = async function(user_id) { 
  const token = new this({ user_id, token: uuidv4() });
  return await token.save();
}

tokenSchema.statics.getOneById = async function(idx) {
  return await this.findById(idx);
}

tokenSchema.statics.getOneByToken = async function(token) {
  return await this.findOne({ token });
}

const TokenModel = mongoose.model('Token', tokenSchema);
module.exports = TokenModel;
