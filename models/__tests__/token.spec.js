const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server') 
const TokenModel = require('../token')
const User = require('../user')

let mongoDb = MongoMemoryServer

const connect = async () => {
    mongoDb = await MongoMemoryServer.create()
    const uri = mongoDb.getUri()
    await mongoose.connect(uri)
}

const disconnect = async () => {
    await mongoose.disconnect()
    await mongoDb.stop
}

const clean = async () => {
    await mongoose.connection.db.dropDatabase();
}

describe('Token model', () => {
    beforeAll(connect)
    beforeEach(clean)
    afterEach(clean)
    afterAll(disconnect)

    it('should create a new token', async () => {

        const user = await User.create({ username: 'JohnDoe', password: 'password' });
    
        const token = await TokenModel.create(user._id);
    
        expect(token).toBeDefined();
        expect(token.token).toMatch(/\w+/);
        expect(token.user_id.toString()).toEqual(user._id.toString());
      });
    
      it('should retrieve a token by token value', async () => {
     
        const user = await User.create({ username: 'JaneSmith', password: 'password' });
    
        const token = await TokenModel.create(user._id);
    
        const retrievedToken = await TokenModel.getOneByToken(token.token);
    
        expect(retrievedToken).toBeDefined();
        expect(retrievedToken.token).toEqual(token.token);
        expect(retrievedToken.user_id.toString()).toEqual(token.user_id.toString());
      });

})
