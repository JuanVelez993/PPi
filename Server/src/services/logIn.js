'use strict'
const db = require('../repository/dbQuery')
const email = require('../services/email')

class LogIn {
  async logIn(data) {
    const response = await db.validarUsuario(data);
    return response
  }

  async enviarCorreoPassword(data) {
    return db.consultarUsuario(data).then((usuario) => {
      return email.enviarCorreoRecuperarPassword(usuario);
    })
  }
}

module.exports = new LogIn()