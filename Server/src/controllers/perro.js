'use strict'

const service = require('../services/perro')
const email = require('../services/email')

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

async function consultarFormulariosAdopcion(req, res, next) {
    try {
        const formularios = service.buscarFormulariosAdopcion()
        formularios.then((formInfo) => {
            res.render("index-9", { formularios: formInfo })
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
        const user = await service.crearFormularioAdopcion(req.body, req.app.locals.infoSession.info.idUsuario)
        res.render("index-7", { mensajeUsuario: "Formulario registrado correctamente", idPerro: req.body.idPerro })
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

async function updateAdoptForm(req, res) {
    try {
        await service.actualizarFormularioAdopcion(req.params.id, req.params.estado).then(() =>
            service.buscarFormularioAdopcion(req.params.id).then(formulario => email.enviarCorreoFormulario(formulario))
        );

        res.redirect("/AdminFormAdop")
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

module.exports = {
    consultarPerros,
    saveAdoptForm,
    consultarPerrosInicio,
    consultarFormulariosAdopcion,
    updateAdoptForm
}