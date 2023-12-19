const mongoose = require('mongoose')

const TokenModel = require('../models/token')

async function authenticator(req, res, next) {
    try {
        const userToken = req.headers.authorisation

        if (!userToken) {
            throw new Error("User not authenticated")
        } else {
            const validToken = await TokenModel.getOneByToken(userToken)
            if (!validToken) {
                throw new Error("Not a valid token")
            } else {
                next()
            }
        }
    } catch (err) {
        res.status(403).json({ error: err.message })
    }
}

module.exports = authenticator;
