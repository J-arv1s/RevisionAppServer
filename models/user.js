const { ObjectId } = require("mongodb")
const client = require("../db/setup")

class User {

    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.isAdmin = data.is_admin;
    }

    static async getAll() {
        await client.connect()
        const response = await client.db('user_account').collection('user_account').find()
        const allValues = await response.toArray()
        return allValues
    }

    static async getOneById(idx) {
        await client.connect()

        const id = new ObjectId(idx)
        const response = await client.db('user_account').collection('user_account').find({
            _id: id,
        })

        const value = await response.toArray()

        const user = new User(value[0])
        user['id'] = id
        return user;
    }

    static async getOneByUsername(username) {
        await client.connect();

        const response = await client.db('user_account').collection('user_account').find({
            username: username
        });

        const value = await response.toArray();

        const user = new User(value[0]);
        user['username'] = username;
        return user;

    }

    static async create(data) {
        await client.connect()

        const { username, password, isAdmin=false } = data;
        
        const response = await client.db('user_account').collection('user_account').insertOne({
            username: username,
            password: password,
            isAdmin,
        })
        return "User created"
    }
}

module.exports = User;
