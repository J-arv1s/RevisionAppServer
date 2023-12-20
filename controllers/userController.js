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

        const result = await User.createOne(data)
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
            const token = await TokenModel.createOne(user.id)
            res.status(200).json({ message: "Logged in", authenticated: true, token: token.token })
        }
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

const show = async (req, res) => {
    const { username } = req.params
    const user = await User.findOne( { username: username })
    res.status(200).json(user)
}

const destroy = async (req, res) => {
    const { username } = req.params
    const userToDelete = await User.findOneAndDelete({ username: username })
    res.status(204).json(userToDelete)
}

const update = async (req, res) => {
    try {
        const { username } = req.params;
        const data = req.body;

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedUser = await User.updateOneByName(username, data);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    index, register, login, show, destroy, update
}
