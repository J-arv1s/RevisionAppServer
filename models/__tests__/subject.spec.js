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
        const subjectName = 'Mathematics';
        const subject = await Subject.createOne(subjectName);
        expect(subject.subjectName).toBe(subjectName);
      });
    
      it('should retrieve a subject by its name', async () => {
        const subjectName = 'Science';
        await Subject.createOne(subjectName);
        const subject = await Subject.getOneByName(subjectName);
        expect(subject.subjectName).toBe(subjectName);
      });
    
})

