'use strict'
const db = require('../repository/insert')

class LogIn {
    async logIn(data) {
        return db.validarUsuario(data);
    }
}

module.exports = new LogIn()