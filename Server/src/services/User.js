'use strict'
const db = require('../repository/dbQuery')

class User {
    async createUser(data) {
        db.insert(data)
    }
}

module.exports = new User()