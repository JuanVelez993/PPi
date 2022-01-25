'use strict'
const db = require('../repository/dbQuery')
const email = require('../services/email')

class LogIn {
  async logIn(data) {
    return db.validarUsuario(data);
  }

  async enviarCorreoPassword(data) {
    return db.consultarUsuario(data).then((usuario) => {
      return email.enviarCorreoRecuperarPassword(usuario);
    })
  }
}

module.exports = new LogIn()