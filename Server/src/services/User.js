'use strict'
const db = require('../controllers/insert')

const users = [123123]

class User {
    constructor() {}

    async getAll() {

        return users
    }

    async create(data) {
        users.push(data)

        return data
    }

    async createUser(data) {
        console.log("service: ", data)
        db.insert(data)
            //        return data
    }
}

module.exports = new User()