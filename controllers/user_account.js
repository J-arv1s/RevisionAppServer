const bcrypt = require('bcrypt');

const user_account = require('../models/user_account')
const TokenSchema = require("../models/token")

async function register (req, res) {
    const data = req.body;

    const salt = await bcrypt.genSalt(parsInt(process.env.BCRYPT_SALT_ROUNDS))
    data.password = await bcrypt.hash(data.password, salt)

    const result = await user_account.create({username: data.username, password: data.password})
    console.log(result);
    res.status(201).send(result);
}

async function login (req, res) {
    try {
    const data = req.body;

    const user = await user_account.findOne({username: data.username})

    const authenticated = await bcrypt.compare(data.password, user.password)
    if (!authenticated) {
        throw new Error("Incorrect credentials");
    } else {
        const token = await TokenSchema.create(user.id)
        res.status(200).json({ authenticated: true, token: token.token })
    }
} catch (err) {
    res.status(401).json({ error: err.message })
}
}

module.exports = {
    register, login
}
