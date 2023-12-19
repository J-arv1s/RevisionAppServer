const User = require('../models/user')
const Subject = require('../models/subject')
const quiz = require('../models/quiz')
const TokenModel = require('../models/token')


const seed_DB = async () => {
    try {
        // Clearing exisiting data in our collections/models
        await User.deleteMany({})
        await Subject.deleteMany({})
        await quiz.deleteMany({})
        await TokenModel.deleteMany({})

        // Inserting sample data into our collections/models
        await User.insertMany([
            { username: 'jarvis', password: '123' },
            { username: 'tahha', password: '123' },
            { username: 'admin', password: 'admin', isAdmin: true },
        ])

        const subjects = await Subject.insertMany([
            { subject_name: 'science', quizes: [] },
            { subject_name: 'history', quizes: [] },
        ])

        const science_quiz = await quiz.create({
            quiz_name: 'science_quiz', 
            questions: [
                { question: 'Chemincal compound of water?', answer: 'h2o' },
                { question: 'Humans breath what?', answer: 'oxygen' },
            ],
        })

        const history_quiz = await quiz.create({
            quiz_name: 'history_quiz', 
            questions: [
                { question: 'Henry VII had x wives?', answer: '6' },
                { question: 'England fought which country for 100years?', answer: 'france' },
            ],
        })

        const [science_subject, history_subject] = subjects
        science_subject.quizes.push(science_quiz._id)
        history_subject.quizes.push(history_quiz._id)
        
        await science_subject.save()
        await history_subject.save()

    } catch (error) {
        console.log(`Error seeding database: ${error}`)
    }
}

module.exports = {
    seed_DB
}
