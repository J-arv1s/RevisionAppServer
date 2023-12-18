const { ObjectId } = require("mongodb")
const { v4: uuidv4 } = require('uuid');

const client = require("../db/setup")

class Token {
  
  constructor(data) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.token = data.token;
  }

  static async create(user_id) {
    await client.connect()
    const token = uuidv4()
    const response = await client.db("token").collection("token").insertOne({
      user_id: user_id,
      token: token
    })
    const newId = response.insertedId;
    const newToken = await Token.getOneById(newId);
    return newToken;
  }

  static async getOneById(idx) {
    await client.connect();
    const id = new ObjectId(idx);
    const response = await client.db("token").collection("token").findOne({
      _id: id
    });
    if (!response) {
      throw new Error("Unable to locate token.");
    }
    const token = new Token(response);
    token.id = response._id;
    return token;
  }

  static async getOneByToken(token) {
    await client.connect();
    const response = await client
      .db("token")
      .collection("token")
      .findOne({ token: token });
    
    if (!response) {
      throw new Error("Unable to locate token.");
    }
  
    const foundToken = new Token(response);
    foundToken.id = response._id;
    return foundToken;
  }

}

module.exports = Token;
