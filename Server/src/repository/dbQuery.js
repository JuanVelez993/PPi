/* se genera la conexion a la base de datos llamando las dependencias correspondientes
 */
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
const entity = require('./entity.js');
const R = require('ramda');

oracledb.initOracleClient();

const options = {
    autoCommit: true
};

async function insertUser(data) {
    const sql = "INSERT INTO USUARIO values ((SELECT CASE max(ID_USUARIO) WHEN NULL THEN 1 ELSE max(ID_USUARIO)+1 END FROM USUARIO), :nombre , :nombre2 , :apel , :apel2 , :tel , :email , :dir , :doc , :pwd)";
    const binds = [{
        nombre: data.nombre,
        nombre2: data.nombre2,
        apel: data.apel,
        apel2: data.apel2,
        tel: data.tel,
        email: data.email,
        dir: data.dir,
        doc: data.doc,
        pwd: data.pwd
    }];

    try {
        executeSqlInsert(sql, binds)
    } catch (err) {
        console.error(err);
    }
}

async function insertFormularioAdopcion(data, idUsuario) {
    const sql = "INSERT INTO FORMULARIO_ADOPCION values ((SELECT CASE max(ID_FORMULARIO) WHEN NULL THEN 1 ELSE max(ID_FORMULARIO)+1 END FROM FORMULARIO_ADOPCION)," +
        ":idUsuario , :idPerro, :idEstadoAdopcion, :motivoAdopcion , :animalesEnCasa , :animalesAnteriores , :numeroHijos , :habitantesCasa , :salario , :estadoCivil , :alergiasFamilia, :referencias, SYSDATE, NULL)";
    const binds = [{
        idUsuario: idUsuario,
        idPerro: data.idPerro,
        motivoAdopcion: data.mov_adop,
        animalesEnCasa: data.ani_cas,
        animalesAnteriores: data.ani_ant,
        numeroHijos: data.hijos,
        habitantesCasa: data.habit_cas,
        salario: data.salario,
        estadoCivil: data.est_civ,
        alergiasFamilia: data.ale_fam,
        referencias: data.ref,
        idEstadoAdopcion: 1
    }];

    try {
        executeSqlInsert(sql, binds)
    } catch (err) {
        console.error(err);
    }
}

async function updateFormulariosAdopcion(id, estado) {
    const sql = "UPDATE FORMULARIO_ADOPCION SET ID_ESTADO_ADOPCION = :idEstado, FECHA_ADOPCION = SYSDATE WHERE ID_FORMULARIO = :idFormulario";
    const binds = [{
        idFormulario: id,
        idEstado: estado
    }];
    try {
        executeSqlInsert(sql, binds)
    } catch (err) {
        console.error(err);
    }
}

async function validarUsuario(data) {
    const sql = "SELECT U.*, E.ID_CARGO FROM EMPLEADO E " +
        "RIGHT JOIN USUARIO U ON U.ID_USUARIO = E.ID_USUARIO " +
        "WHERE U.CORREO = :usuario AND U.CONTRA  = :pass ";
    const binds = {
        usuario: data.uname,
        pass: data.psw
    };

    try {
        return executeSelect(sql, binds).then(result => {
            const userInfo = R.pathOr(false, ["0"], result);
            return userInfo ? entity.usuario(userInfo) : false;
        });
    } catch (err) {
        console.error(err);
    }
}

async function selectUsuario(data) {
    const sql = "SELECT * FROM USUARIO WHERE CORREO = :correo";
    const binds = { correo: data.mail };
    try {
        return executeSelect(sql, binds).then(result => {
            const userInfo = R.pathOr(false, ["0"], result);
            return userInfo ? entity.usuario(userInfo) : false;
        });
    } catch (err) {
        console.error(err);
    }
}

async function selectPerros() {
    const sql = "SELECT P.ID_PERRO , R.NOMBRE_RAZA, C.COLOR , G.GENERO , P.NOMBRE_PERRO, P.EDAD, P.DESCRIPCION FROM PERRO P " +
        " JOIN RAZA R ON R.ID_RAZA = P.ID_RAZA" +
        " JOIN COLOR C ON C.ID_COLOR = P.ID_COLOR" +
        " JOIN GENERO G ON G.ID_GENERO = P.ID_GENERO" +
        " LEFT JOIN FORMULARIO_ADOPCION FA ON FA.ID_PERRO = P.ID_PERRO" +
        " WHERE FA.ID_PERRO IS NULL OR FA.ID_ESTADO_ADOPCION = 3"
        ;
    try {
        return executeSelect(sql).then(result => result.map(perro => entity.perro(perro)));
    } catch (err) {
        console.error(err);
    }
}

async function selectFormulariosAdopcion() {
    const sql = "SELECT FA.ID_FORMULARIO, P.ID_PERRO , R.NOMBRE_RAZA, C.COLOR , G.GENERO , P.NOMBRE_PERRO, P.EDAD, P.DESCRIPCION, U.PRIMER_NOMBRE, " +
        "FA.MOTIVO_ADOPCION, FA.ANIMALES_CASA , FA.ANIMALES_ANTERIORES, FA.CANTIDAD_HIJOS , FA.CANT_HABIT_CASA , FA.SALARIO , FA.ESTADO_CIVIL, " +
        "FA.ALERGIAS_FAMILIA, EA.DESCRIPCION, to_char(FA.FECHA_FORMULARIO, 'dd Month YYYY', 'NLS_DATE_LANGUAGE = spanish'), U.CORREO " +
        "FROM PERRO P " +
        "JOIN RAZA R ON R.ID_RAZA = P.ID_RAZA " +
        "JOIN COLOR C ON C.ID_COLOR = P.ID_COLOR " +
        "JOIN GENERO G ON G.ID_GENERO = P.ID_GENERO " +
        "JOIN FORMULARIO_ADOPCION FA ON FA.ID_PERRO = P.ID_PERRO " +
        "JOIN USUARIO U ON U.ID_USUARIO = FA.ID_USUARIO " +
        "JOIN ESTADO_ADOPCION EA ON EA.ID_ESTADO_ADOPCION = FA.ID_ESTADO_ADOPCION " +
        "ORDER BY EA.ID_ESTADO_ADOPCION ";
    try {
        return executeSelect(sql).then(result => result.map(formulario => entity.formularioAdopcion(formulario)));
    } catch (err) {
        console.error(err);
    }
}

async function selectFormularioAdopcion(id) {
    try {
        return selectFormulariosAdopcion().then(result => result.find(formulario => formulario.idFormulario == id));
    } catch (err) {
        console.error(err);
    }
}

async function executeSqlInsert(sql, binds) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.executeMany(sql, binds, options);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function executeSelect(sql, binds) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = binds ? await connection.execute(sql, binds) : await connection.execute(sql);
        return R.pathOr([], ["rows"], result);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

exports.insert = insertUser
exports.validarUsuario = validarUsuario
exports.guardarFormularioAdopcion = insertFormularioAdopcion
exports.consultarPerros = selectPerros
exports.consultarUsuario = selectUsuario
exports.consultarFormulariosAdopcion = selectFormulariosAdopcion
exports.consultarFormularioAdopcion = selectFormularioAdopcion
exports.actualizarFormulariosAdopcion = updateFormulariosAdopcion