'use strict'
const db = require('../repository/dbQuery')

class User {
    async selectPerros() {
        return db.consultarPerros();
    }

    async crearFormularioAdopcion(data, idUsuario) {
        db.guardarFormularioAdopcion(data, idUsuario)
    }

    async actualizarFormularioAdopcion(id, estado) {
        db.actualizarFormulariosAdopcion(id, estado)
    }

    async buscarFormulariosAdopcion() {
        return db.consultarFormulariosAdopcion()
    }

    async buscarFormularioAdopcion(id) {
        return db.consultarFormularioAdopcion(id)
    }
}

module.exports = new User()