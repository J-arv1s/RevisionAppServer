const user_account = require('../models/user_account')


const index = async (req, res) => {
    const users = await user_account.find()
    res.status(200).json(users)
}

const show_by_name = async (req, res) => {
    const { username } = req.params
    const user = await user_account.findOne( { username: username })
    res.status(200).json(user)
}

const create = async (req, res) => {
    const {is_admin, username, password} = req.body
    try {
        const new_user = await user_account.create({ is_admin, username, password })
        res.status(201).json(new_user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const destroy = async (req, res) => {
    const { id } = req.params
    const user_to_delete = await user_account.findOneAndDelete({_id: id})
    res.status(204).json(user_to_delete)
}

module.exports = {
    index,
    show_by_name,
    create
}