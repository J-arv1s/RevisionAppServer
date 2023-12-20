const User = require('../models/user')
const Subject = require('../models/subject')
const Quiz = require('../models/quiz')
const TokenModel = require('../models/token')


const seed_DB = async () => {
    try {
        // Clearing exisiting data in our collections/models
        await User.deleteMany({})
        await Subject.deleteMany({})
        await Quiz.deleteMany({})
        await TokenModel.deleteMany({})

        // Inserting sample data into our collections/models
        await User.insertMany([
            { username: 'jarvis', password: '123', combinedScore: 1 },
            { username: 'tahha', password: '123', combinedScore: 4 },
            { username: 'admin', password: 'admin', isAdmin: true },
        ])

        // const subjects = await Subject.insertMany([
        //     { subjectName: 'science', quizzes: [] },
        //     { subjectName: 'history', quizzes: [] },
        // ])

        const scienceSubject = await Subject.create({
            subjectName: 'science',
            quizzesId: [],
        })
        const historySubject = await Subject.create({
            subjectName: 'history',
            quizzesId: [],
        })

        const scienceQuiz = await Quiz.create({
            quizName: 'science-quiz', 
            questions: [
                { question: 'Chemincal compound of water?', 
                  answer: 'h2o',
                  wrongAnswers: ['he2o', 'o2', 'h2'] 
                },
                { question: 'Humans need to breath what?', 
                  answer: 'oxygen',
                  wrongAnswers: ['water', 'helium', 'carbon'],
                },
            ],
        })

        const historyQuiz = await Quiz.create({
            quizName: 'history-quiz', 
            questions: [
                { question: 'Henry VII had x wives?',
                  answer: '6',
                  wrongAnswer: ['2', '0', '7'],
                },
                { question: 'England fought which country for 100years?',
                  answer: 'france',
                  wrongAnswer: ['germany', 'scotland', 'denmark'],
                },
            ],
        })

        scienceSubject.quizzesId.push(scienceQuiz._id)
        historySubject.quizzesId.push(historyQuiz._id)
        
        await scienceSubject.save()
        await historySubject.save()

    } catch (error) {
        console.log(`Error seeding database: ${error}`)
    }
}

module.exports = {
    seed_DB
}
