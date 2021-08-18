'use strict'
const db = require('../controllers/insert')



class User {

    async createUser(data) {
        console.log("service: ", data)
        db.insert(data)
            //        return data
    }
}

module.exports = new User()