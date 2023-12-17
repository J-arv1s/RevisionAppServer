const { user_accounts } = require('../db/seed')

const index = async (req, res) => {
    const users = await user_accounts.find()
    res.status(200).json(users)
}

module.exports = {
    index
}