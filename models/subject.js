const mongoose = require('mongoose')

const Subject = mongoose.model('Subject', new mongoose.Schema({
    subject_name: String,
    quizzes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'quiz',
    }],
}))
module.exports = Subject