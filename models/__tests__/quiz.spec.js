const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server') 
const quiz = require('../quiz')

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
        const quizzes = await quiz.find()
        expect(quizzes).toHaveLength(0)
    })

    // it('should fetch an empty response when searching for non-exisitent quiz', async () => {
    //     const q = await quiz.findByName('hidden_quiz')
    //     expect(q).toHaveLength(0)
    // })

    // it('should fecth a response when searching for a exisiting quiz', async () => {
    //     const new_quiz = await quiz.createOne({
    //         quiz_name: 'real_quiz', 
    //         questions: []
    //     })

    //     const q = await quiz.findByName('real_quiz')
    //     expect(q).toHaveLength(1)
    // })

    it('should fetch list of quizzes', async () => {
        const new_quiz = await quiz.createOne({
            quiz_name: 'test_quiz', 
            questions: []
        })
        const new_quiz2 = await quiz.createOne({
            quiz_name: 'test_quiz2', 
            questions: [
                { question: 'Question 1?', answer: 'Answer 1' },
                { question: 'Question 2?', answer: 'Answer 2' },
            ]
        })
        const quizzes = await quiz.find()
        expect(quizzes).toHaveLength(2)
    })

    it('creates a new quiz', async () => {
        const data = {
            quiz_name: 'test_quiz', 
            questions: [
                { question: 'Question 1?', answer: 'Answer 1' },
            ]
        }
        const new_quiz = await quiz.createOne(data)

        expect(new_quiz).toBeDefined()
        expect(new_quiz.quiz_name).toBe(data.quiz_name)

        const get_quiz = await quiz.findById(new_quiz._id)
        expect(get_quiz).toBeDefined()
        expect(get_quiz.quiz_name).toBe('test_quiz')
    })
})
