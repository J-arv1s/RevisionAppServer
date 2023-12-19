const Subject = require('../models/subject')


const index = async (req, res) => {
    const subjects = await Subject.getAll()
    res.status(200).json(subjects)
}

// const show = async (req, res) => {
//     const { subjectname } = req.params
//     const sub = await Subject.getOneByName( { subject_name: subjectname })
//         .populate({
//             path: 'quizes',
//             select: 'quiz_name',
//         })
//     res.status(200).json(sub)
// }


const show = async (req, res) => {
    const { subject_name } = req.params
    const subject = await Subject.getOneByName(subject_name)
    res.status(200).json(subject)
  }

const create = async (req, res) => {
    const { subject_name }  = req.body
    const newSubject = await Subject.create(subject_name)
    res.status(201).json(newSubject)
}

const destroy = async (req, res) => {
    const { subject_name } = req.params
    const subjectDelete = await Subject.findOneAndDelete({subject_name: subject_name})
    res.status(204).json(subjectDelete)
}

module.exports = {
    index,
    show,
    create,
    destroy
}
