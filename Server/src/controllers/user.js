'use strict'

const service = require('../services/user')

async function createUser(req, res) {
    try {
        const user = await service.createUser(req.body)
            //res.status(204).send(user)
        res.render("index-5", { mensajeUsuario: "Usuario creado correctamente" })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

async function prueba(req, res) {
    try {
        //console.log("app", app.locals)
        //console.log("req", req.app.locals)
        //console.log("res", res.locals)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

module.exports = {
    createUser,
    prueba
}