const user_account = require('../models/user')
const subject = require('../models/subject')
const quiz = require('../models/quiz')


const seed_DB = async () => {
    try {
        // Clearing exisiting data in our collections/models
        await user_account.deleteMany({})
        await subject.deleteMany({})
        await quiz.deleteMany({})

        // Inserting sample data into our collections/models
        await user_account.insertMany([
            { username: 'jarvis', password: '123' },
            { username: 'tahha', password: '123' },
            { username: 'admin', password: 'admin', is_admin: true },
        ])

        await subject.insertMany([
            { subject_name: 'science' },
            { subject_name: 'history' },
        ])

        await quiz.insertMany([
            { quiz_name: 'science_quiz', questions: [
                { question: 'Chemincal compound of water?', answer: 'h2o' },
                { question: 'Humans breath what?', answer: 'oxygen' },
            ]},
            { quiz_name: 'history_quiz', questions: [
                { question: 'Henry VII had x wives?', answer: '6' },
                { question: 'England fought which country for 100years?', answer: 'france' },
            ]},
        ])

    } catch (error) {
        console.log(`Error seeding database: ${error}`)
    }
}

module.exports = {
    seed_DB
}
