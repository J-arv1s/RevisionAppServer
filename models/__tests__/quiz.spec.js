const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server') 
const { Quiz }= require('../quiz')

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


describe('Quiz model', () => {
    beforeAll(connect)
    beforeEach(clean)
    afterEach(clean)
    afterAll(disconnect)


    it('should fetch an empty list of quizzes', async () => {
        const quizzes = await Quiz.find()
        expect(quizzes).toHaveLength(0)
    })

    it('should fetch list of quizzes', async () => {
        const newQuiz = await Quiz.createOne({
            quizName: 'test_quiz', 
            questions: []
        })
        const newQuiz2 = await Quiz.createOne({
            quizName: 'test_quiz2', 
            questions: [
                { question: 'Question 1?', answer: 'Answer 1' },
                { question: 'Question 2?', answer: 'Answer 2' },
            ]
        })
        const quizzes = await Quiz.find()
        expect(quizzes).toHaveLength(2)
    })

    it('creates a new quiz', async () => {
        const data = {
            quizName: 'testQuiz', 
            questions: [
                { question: 'Question 1?', answer: 'Answer 1' },
            ]
        }
        const newQuiz = await Quiz.createOne(data)

        expect(newQuiz).toBeDefined()
        expect(newQuiz.quizName).toBe(data.quizName)

        const getQuiz = await Quiz.findById(newQuiz._id)
        expect(getQuiz).toBeDefined()
        expect(getQuiz.quizName).toBe('testQuiz')
    })
})
