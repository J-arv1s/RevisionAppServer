const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
});

class Token {
  static async create(user_id) { 
    const token = new Token({ user_id, token: uuidv4() });
    return await token.save();
  }
  
  static async getOneById(idx) {
    return await Token.findById(idx);
  }
  
  static async getOneByToken(token) {
    return await Token.findOne({ token });
  }
}

tokenSchema.loadClass(Token);
const TokenModel = mongoose.model('Token', tokenSchema);
module.exports = TokenModel;
