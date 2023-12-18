const mongoose = require('mongoose')

const subject = mongoose.model('subject', new mongoose.Schema({
    subject_name: String,
    quizes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'quiz',
    }],
}))
module.exports = subject