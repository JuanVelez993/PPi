'use strict'

const session = require('express-session')
const service = require('../services/LogIn')

async function validarUsuario(req, res, next) {
    try {
        const validacion = service.logIn(req.body)
        validacion.then((userInfo) => {         
            if (userInfo) {
                req.app.locals.infoSession = { logged: true, info: userInfo };
                res.render("index")
            } else {
                req.app.locals.infoSession = { logged: false, info: null };
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
        res.render("index")
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

module.exports = {
    validarUsuario,
    cerrarSesion
}