const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server') 
const Quiz = require('../quiz')

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

    it('creates a new quiz', async () => {
        const data = {
            quizName: 'testQuiz', 
            questions: [
                { question: 'Question 1?', answer: 'Answer 1', wrongAnswer: ['wrong1', 'wrong2', 'wrong3'] },
            ],
            subject: 'test-subject'
        }
        const newQuiz = await Quiz.createOne(data)
        
        expect(newQuiz).toBeDefined()
        expect(newQuiz.quizName).toBe(data.quizName)

        const getQuiz = await Quiz.findById(newQuiz._id)
        expect(getQuiz).toBeDefined()
        expect(getQuiz.quizName).toBe('testQuiz')
    })

    it('should find an exisiting quiz using its name', async () => {
        const data = {
            quizName: 'testQuiz', 
            questions: [
                { question: 'Question 1?', answer: 'Answer 1', wrongAnswer: ['wrong1', 'wrong2', 'wrong3'] },
            ],
            subject: 'test-subject'
        }
        const newQuiz = await Quiz.createOne(data)
        expect(newQuiz).toBeDefined()

        const searchedQuiz = await Quiz.findByName('testQuiz')
        expect(searchedQuiz.quizName).toBe('testQuiz')
    })

    it('should update a quiz using its own name', async () => {
        const data = {
            quizName: 'testQuiz', 
            questions: [
                { question: 'Question 1?', answer: 'Answer 1', wrongAnswer: ['wrong1', 'wrong2', 'wrong3'] },
            ],
            subject: 'test-subject'
        }
        const newQuiz = await Quiz.createOne(data)
        expect(newQuiz).toBeDefined()

        const updateData = {
            quizName: "updatedName"
        }
        
        const updatedQuiz = await Quiz.updateByName('testQuiz', updateData)
        await updatedQuiz.save()
        expect(updatedQuiz.quizName).toBe('updatedName')
    })

    it('should allow extra questions to be added', async () => {
        const data = {
            quizName: 'testQuiz', 
            questions: [
                { question: 'Question 1?', answer: 'Answer 1', wrongAnswer: ['wrong1', 'wrong2', 'wrong3'] },
            ],
            subject: 'test-subject'
        }
        let newQuiz = await Quiz.createOne(data)
        expect(newQuiz).toBeDefined()

        const newQuestion = {
            question: "Question2",
            answer: 'Answer 2',
            wrongAnswer: ['wrong1fff', 'wgggrong2', 'wrhhhong3']
        }

        expect(newQuiz.questions).toHaveLength(1)

        newQuiz = await Quiz.addQuestion('testQuiz', newQuestion)
        expect(newQuiz.questions).toHaveLength(2)
    })

    it('should allow questions to be deleted', async () => {
        const data = {
            quizName: 'testQuiz', 
            questions: [
                { question: 'Question 1?', answer: 'Answer 1', wrongAnswer: ['wrong1', 'wrong2', 'wrong3'] },
                { question: "Question2", answer: 'Answer 2', wrongAnswer: ['wrong1fff', 'wgggrong2', 'wrhhhong3'] }
            ],
            subject: 'test-subject'
        }

        const newQuiz = await Quiz.createOne(data)
        expect(newQuiz).toBeDefined()
        
        const questions = newQuiz.questions
        const questionID = questions[0]._id.toString()

        const newQuiz2 = await Quiz.deleteQuestion('testQuiz', questionID)
        expect(newQuiz2.questions).toHaveLength(1)
    })
})
