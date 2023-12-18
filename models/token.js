// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

// const Token = mongoose.model('token', new mongoose.Schema({
//     token:  {
//         type: String,
//         default: uuidv4,
//     },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'user_account' },
// }))




// module.exports = Token;

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TokenSchema = mongoose.model('token', new mongoose.Schema({
    token:  {
        type: String,
        required: true,
    },
    user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'user_account', required: true },
}))

  
    TokenSchema.statics.create = async function(user_id) {
      const token = new TokenSchema({ user_id, token: uuidv4() });
      const newToken = await token.save();
      return new Token(newToken.toObject());
    }
  
    TokenSchema.statics.getOneById = async function(id) {
      const token = await TokenSchema.findById(id);
      if (!token) {
        throw new Error('Unable to locate token.');
      } else {
        return new Token(token.toObject());
      }
    }
  
    TokenSchema.statics.getOneByToken = async function(token) {
      const token = await TokenSchema.findOne({ token });
      if (!token) {
        throw new Error('Unable to locate token.');
      } else {
        return new Token(token.toObject());
      }
    }

  module.exports = TokenSchema;
