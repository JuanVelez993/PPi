const R = require('ramda');

function usuario(data) {
    return R.zipObj([
        'idUsuario',
        'primerNombre',
        'segundoNombre',
        'primerApellido',
        'segundoApellido',
        'telefono',
        'correo',
        'direccion',
        'identificacion',
        'password',
        'cargo'
    ], data);
}

function perro(data) {
    return R.zipObj([
        'idPerro',
        'raza',
        'color',
        'genero',
        'nombre',
        'edad',
        'descripcion',
        'rutaImagen'
    ], data);
}

function formularioAdopcion(data) {
    return R.zipObj([
        'idFormulario',
        'idPerro',
        'raza',
        'color',
        'genero',
        'nombrePerro',
        'edad',
        'descripcionPerro',
        'nombreUsuario',
        'motivoAdopcion',
        'numeroAnimalesCasa',
        'animalesAnteriores',
        'cantidadhijos',
        'cantidadHabitantesCasa',
        'salario',
        'estadoCivil',
        'alergias',
        'estadoSolicitud',
        'fechaFormulario',
        'correo'
    ], data);
}

function generico(data) {
    return R.zipObj([
        'id',
        'descripcion'
    ], data);
}

module.exports = {
    usuario,
    perro,
    formularioAdopcion,
    generico
}