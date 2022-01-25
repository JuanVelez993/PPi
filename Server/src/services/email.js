'use strict'
const nodemailer = require('nodemailer');

class Email {

  async enviarCorreoRecuperarPassword(usuario) {
    const subject = 'Puppy Adopt - Recuperación de Contraseña';
    const text = 'Tu contraseña es: ' + usuario.password;
    return this.enviarCorreo(usuario.correo, subject, text);
  }

  async enviarCorreoFormulario(formulario) {
    const subject = "Puppy Adopt - Respuesta solicitud de Adopcion de " + formulario.nombrePerro;
    const text = "Buenos días " + formulario.nombreUsuario + ", con el presente correo le informamos que su solicitud"
      + " para adoptar a " + formulario.nombrePerro + " se encuentra en estado " + formulario.estadoSolicitud.toUpperCase()
    this.enviarCorreo(formulario.correo, subject, text);
  }

  async enviarCorreo(email, subject, text) {
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
      to: email,
      subject: subject,
      text: text
    };
    
    return transporter.sendMail(mailOptions);
  }
}

module.exports = new Email()