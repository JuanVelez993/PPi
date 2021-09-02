'use strict'

const service = require('../services/perro')

async function consultarPerros(req, res, next) {
    try {
        const perros = service.selectPerros()
        perros.then((perrosInfo) => {         
            res.render("index-3", { perros: perrosInfo })
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

async function consultarPerrosInicio(req, res, next) {
    try {
        const perros = service.selectPerros()
        perros.then((perrosInfo) => {         
            res.render("index", { perros: perrosInfo })
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

async function saveAdoptForm(req, res) {
    try {
        console.log("req", req)
        const user = await service.crearFormularioAdopcion(req.body, req.app.locals.infoSession.info.idUsuario)
        //res.status(204).send(user)
        res.render("index-7", { mensajeUsuario: "Formulario registrado correctamente", idPerro: req.body.idPerro })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

module.exports = {
    consultarPerros,
    saveAdoptForm,
    consultarPerrosInicio
}