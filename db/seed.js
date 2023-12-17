const mongoose = require('mongoose')


const user_accounts = mongoose.model('user_accounts', new mongoose.Schema({
    user_id: Number,
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
}))

const tokens = mongoose.model('tokens', new mongoose.Schema({
    user_id: Number,
    token_id: Number,
    token: String,
}))

const subjects = mongoose.model('subjects', new mongoose.Schema({
    subject_id: Number,
    subject_name: String,
}))

const questions = mongoose.model('questions', new mongoose.Schema({
    subject_id: Number,
    question_id: Number,
    question_text: String,
    question_answer: String,
}))

const seed_DB = async () => {
    try {
        // Clearing exisiting data in our collections/models
        await user_accounts.deleteMany({})
        await tokens.deleteMany({})
        await subjects.deleteMany({})
        await questions.deleteMany({})

        // Inserting sample data into our collections/models
        await user_accounts.insertMany([
            { user_id: 1, username: 'jarvis', password: '123' },
            { user_id: 2, username: 'tahha', password: '123' },
            { user_id: 3, username: 'sara', password: '123' },
            { user_id: 4, username: 'billy', password: '123' },
            { user_id: 5, username: 'admin', password: 'admin', is_admin: true },
        ])
        await tokens.insertMany([
            { user_id: 1, token_id: 1, token: 'asdf' },
        ])
        await subjects.insertMany([
            { subject_id: 1, subject_name: 'science' },
            { subject_id: 2, subject_name: 'history' },
            { subject_id: 3, subject_name: 'geography' },
        ])
        await questions.insertMany([
            { subject_id: 1, question_id: 1, question_text: 'Chemincal compound of water?', question_answer: 'h2o' },
            { subject_id: 1, question_id: 2, question_text: 'Earth is number what in solar system?', question_answer: '3' },
            { subject_id: 2, question_id: 3, question_text: 'Henry VII had how many wives?', question_answer: '6' },
            { subject_id: 2, question_id: 4, question_text: 'What plague killed 75 - 200 million?', question_answer: 'black death' },
            { subject_id: 3, question_id: 5, question_text: 'Canada sits above?', question_answer: 'america' },
            { subject_id: 3, question_id: 6, question_text: 'The UK flag has the colours red, white and..?', question_answer: 'blue' },
        ])
    } catch (error) {
        console.log(`Error seeding database: ${error}`)
    }
}

module.exports = {
    user_accounts,
    tokens,
    subjects,
    questions,
    seed_DB
}