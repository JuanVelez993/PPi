'use strict'
const db = require('../repository/dbQuery')

class User {
    async createUser(data) {
        const response = await db.insert(data)
        return response
    }
}

module.exports = new User()