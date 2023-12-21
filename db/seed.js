const User = require('../models/user')
const Subject = require('../models/subject')
const Quiz = require('../models/quiz')
const TokenModel = require('../models/token')


const seed_DB = async () => {
    try {
        // Clearing exisiting data in our collections/models
        await Subject.deleteMany({})
        await Quiz.deleteMany({})
        await TokenModel.deleteMany({})

        // Inserting sample data into our collections/models

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
                { question: 'What percent of the body is water?', 
                  answer: '70%',
                  wrongAnswers: ['20%', '100%', '50%'],
                },
                { question: 'How many teeth does an adult have?', 
                  answer: '32',
                  wrongAnswers: ['66', '13', '50'],
                },
                { question: 'What do we get from eating food?', 
                  answer: 'Energy',
                  wrongAnswers: ['Oxygen', 'Nothing', 'Water'],
                },
                { question: 'How many bones make up a human skull?', 
                  answer: '22',
                  wrongAnswers: ['29', '1', '15'],
                },
                { question: 'What insect pollinates flowers?', 
                  answer: 'bee',
                  wrongAnswers: ['mosquito', 'spider', 'fruit fly'],
                },
                { question: 'What can flowers become?', 
                  answer: 'fruit',
                  wrongAnswers: ['nothing', 'stems', 'roots'],
                },
                { question: 'What do most plants eat?', 
                  answer: 'minerals',
                  wrongAnswers: ['rocks', 'dirt', 'insects'],
                },
                { question: 'A spider has how many legs?', 
                  answer: '8',
                  wrongAnswers: ['6', '9', '7'],
                },
            ],
        })

        const historyQuiz = await Quiz.create({
            quizName: 'history-quiz', 
            questions: [
                { question: 'Henry VII had x wives?',
                  answer: '6',
                  wrongAnswers: ['2', '0', '7'],
                },
                { question: 'England fought which country for 100years?',
                  answer: 'france',
                  wrongAnswers: ['germany', 'scotland', 'denmark'],
                },
                { question: 'World war 1 lasted for how many years?', 
                  answer: '4',
                  wrongAnswers: ['2', '7', '11'],
                },
                { question: 'Who was the UK prime minister during the 2nd world war?', 
                  answer: 'Winston Churchill',
                  wrongAnswers: ['Margaret Thacther', 'Clement Attlee', 'Boris Johnson'],
                },
                { question: 'Who wrote hamlet?', 
                  answer: 'William Shakespeare',
                  wrongAnswers: ['Oscar Wilde', 'John Steinbeck', 'Robert Muchamore'],
                },
                { question: 'Who built the pyramids?', 
                  answer: 'egyptians',
                  wrongAnswers: ['romans', 'greeks', 'aliens'],
                },
                { question: 'Thomas what invented the lightbulb?', 
                  answer: 'Edison',
                  wrongAnswers: ['Jefferson', 'the Tank Engine', 'Bulb'],
                },
                { question: 'Which celtic language is NOT endangerd?', 
                  answer: 'welsh',
                  wrongAnswers: ['gaelic', 'cornish', 'manx'],
                },
                { question: 'Which welsh writer wrote the BFG?', 
                  answer: 'Roald Dahl',
                  wrongAnswers: ['Dylan Thomas', 'Jan Morris', 'RS Thomas'],
                },
                { question: 'The stone circle in england is called?', 
                  answer: 'stonehenge',
                  wrongAnswers: ['rockcircle', 'bouldermash', 'pebblebeach'],
                },
            ],
        })

        scienceSubject.quizzesId.push(scienceQuiz._id)
        historySubject.quizzesId.push(historyQuiz._id)
        
        await scienceSubject.save()
        await historySubject.save()
        await scienceQuiz.save()
        await historyQuiz.save()
        console.log('Finished seeding, exit now')
    } catch (error) {
        console.log(`Error seeding database: ${error}`)
    }
}

module.exports = {
    seed_DB
}
