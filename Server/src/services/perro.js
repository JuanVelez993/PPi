'use strict'
const db = require('../repository/dbQuery')

class User {
    async selectPerros() {
        return db.consultarPerros();
    }

    async crearFormularioAdopcion(data, idUsuario) {
        db.guardarFormularioAdopcion(data, idUsuario)
    }

    async crearPerro(data) {
        return db.guardarPerro(data)
    }

    async actualizarFormularioAdopcion(id, estado) {
        return db.actualizarFormulariosAdopcion(id, estado)
    }

    async buscarFormulariosAdopcion() {
        return db.consultarFormulariosAdopcion()
    }

    async buscarFormularioAdopcion(id) {
        return db.consultarFormularioAdopcion(id)
    }

    async borrarFormularioAdopcion(id) {
        return db.eliminarFormulariosAdopcion(id)
    }

    async buscarRazas() {
        return db.consultarRazas()
    }

    async buscarColores() {
        return db.consultarColores()
    }

    async buscarGeneros() {
        return db.consultarGeneros()
    }
}

module.exports = new User()