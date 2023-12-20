const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server') 
const Subject = require('../subject')

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

describe('Subject model', () => {
    beforeAll(connect)
    beforeEach(clean)
    afterEach(clean)
    afterAll(disconnect)

    it('should create a new subject', async () => {
        const subject_name = 'Mathematics';
        const subject = await Subject.create(subject_name);
        expect(subject.subject_name).toBe(subject_name);
      });
    
      it('should retrieve a subject by its name', async () => {
        const subject_name = 'Science';
        await Subject.create(subject_name);
        const subject = await Subject.getOneByName(subject_name);
        expect(subject.subject_name).toBe(subject_name);
      });
          
})
