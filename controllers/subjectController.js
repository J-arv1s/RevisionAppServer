const subject = require('../models/subject')


const index = async (req, res) => {
    const subjects = await subject.find()
    res.status(200).json(subjects)
}

const show_by_name = async (req, res) => {
    const { subjectname } = req.params
    const sub = await subject.findOne( { subject_name: subjectname })
        .populate({
            path: 'quizzes',
            select: 'quiz_name',
        })
    res.status(200).json(sub)
}

module.exports = {
    index,
    show_by_name
}
