'use strict'

const service = require('../services/LogIn')

async function validarUsuario(req, res, next) {
    try {
        const validacion = service.logIn(req.body)
        validacion.then((userInfo) => {
            if (userInfo) {
                req.app.locals.infoSession = {
                    logged: true,
                    info: userInfo,
                    isAdmin: userInfo.cargo == 1
                };
                res.redirect("/")
            } else {
                req.app.locals.infoSession = {
                    logged: false,
                    info: null,
                    isAdmin: false
                };
                res.render("index-6", { mensajeError: "usuario o contraseña incorrecto" })
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

async function cerrarSesion(req, res, next) {
    try {
        req.app.locals.infoSession = { logged: false, info: null };
        res.redirect("/")
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

async function recuperarPassword(req, res, next) {
    try {
        service.enviarCorreoPassword(req.body).then((result) =>
            res.render("index-8", { mensaje: (result ? "Correo enviado correctamente" : "Ocurrió un error enviando el correo" ) })
        ).catch(error => {
            console.log("Error enviando Correo: ", error)
            res.render("index-8", { mensaje: "Ocurrió un error enviando el correo" })
        });
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
        res.render("index-8", { mensaje: "Error al enviar el correo" })
    }
}

module.exports = {
    validarUsuario,
    cerrarSesion,
    recuperarPassword
}