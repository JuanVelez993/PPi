'use strict'
const db = require('../repository/insert')

class User {
    async selectPerros() {
        return db.consultarPerros();
    }

    async crearFormularioAdopcion(data, idUsuario) {
        db.guardarFormularioAdopcion(data, idUsuario)
    }
}

module.exports = new User()