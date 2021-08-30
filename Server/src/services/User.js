'use strict'
const db = require('../repository/insert')

class User {
    async createUser(data) {
        console.log("service: ", data)
        db.insert(data)
            //        return data
    }
}

module.exports = new User()