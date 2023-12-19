const bcrypt = require('bcrypt');
const User = require('../models/user');
const TokenModel = require("../models/token")

const index = async (req, res) => {
    try {
        const users = await User.getAll()
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json({
            "success": false,
            "error": e,
        })
    }
}

const register = async (req, res) => {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
        data.password = await bcrypt.hash(data.password, salt)

        const result = await User.create(data)
        console.log(result)
        res.status(201).send(result)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.getOneByUsername(data.username)

        const authenticated = await bcrypt.compare(data.password, user.password)
        if (!authenticated) {
            throw new Error("Incorrect credentials");
        } else {
            const token = await TokenModel.create(user.id)
            res.status(200).json({ authenticated: true, token: token.token })
        }
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

    const show = async (req, res) => {
        const { username } = req.params
        const user = await user_account.findOne( { username: username })
        res.status(200).json(user)
    }

    const destroy = async (req, res) => {
        const { id } = req.params
        const user_to_delete = await user_account.findOneAndDelete({_id: id})
        res.status(204).json(user_to_delete)
    }

module.exports = {
    index, register, login, show, destroy
}
