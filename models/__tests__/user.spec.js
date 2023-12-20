const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server') 
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

describe('User model', () => {
    beforeAll(connect)
    beforeEach(clean)
    afterEach(clean)
    afterAll(disconnect)

    it('should return an array of all users', async () => {
        const users = await User.getAll(mongoose.connection);
        expect(Array.isArray(users)).toBe(true);
      });

      it('should retrieve a user by ID', async () => {
        const createdUser = await User.createOne({ username: 'Tahha', password: 'password1' });
  
        const user = await User.getOneById(createdUser._id);
  
        expect(user._id.toString()).toBe(createdUser._id.toString());
        expect(user.username).toBe('Tahha');
      });
          
})
