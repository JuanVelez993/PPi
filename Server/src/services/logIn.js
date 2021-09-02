'use strict'
const db = require('../repository/insert')
const nodemailer = require('nodemailer');

class LogIn {
  async logIn(data) {
    return db.validarUsuario(data);
  }

  async enviarCorreoPassword(data) {
    return db.consultarUsuario(data).then((usuario) => {
      const mailFrom = "puppyadopt.ppi@gmail.com";
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: mailFrom,
          pass: 'callefalsa123'
        }
      });

      const mailOptions = {
        from: mailFrom,
        to: data.mail,
        subject: 'Puppy Adopt - Recuperación de Contraseña',
        text: 'Tu contraseña es: ' + usuario.password
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })
  }
}

module.exports = new LogIn()