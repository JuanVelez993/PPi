'use strict'
const db = require('../repository/insert')
const nodemailer = require('nodemailer');

class LogIn {
    async logIn(data) {
        return db.validarUsuario(data);
    }

    async enviarCorreoPassword(data) {
        const transporter = nodemailer.createTransport({
            service: 'xeoty',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'yourpassword'
            }
          });
    }
}

module.exports = new LogIn()