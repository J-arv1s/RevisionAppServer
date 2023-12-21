const Subject = require('../models/subject')


const index = async (req, res) => {
    const subjects = await Subject.getAll()
    res.status(200).json(subjects)
}

const show = async (req, res) => {
    const { subjectName } = req.params
    const subject = await Subject.getOneByName(subjectName)
    res.status(200).json(subject)
  }

const create = async (req, res) => {
    const { subjectName } = req.body
    const newSubject = await Subject.createOne(subjectName)
    res.status(201).json(newSubject)
}

const destroy = async (req, res) => {
    const { subjectName } = req.params
    const subjectDelete = await Subject.findOneAndDelete({subjectName: subjectName})
    res.status(204).json(subjectDelete)
}

const update = async (req, res) => {
    try {
        const { subjectName } = req.params;
        const data = req.body;

        const updatedSubject = await Subject.updateOneByName(subjectName, data);
        res.status(200).json(updatedSubject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    index,
    show,
    create,
    destroy,
    update
}
