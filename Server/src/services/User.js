'use strict'
const db = require('../repository/insert')

class User {
    async createUser(data) {
        db.insert(data)
    }
}

module.exports = new User()