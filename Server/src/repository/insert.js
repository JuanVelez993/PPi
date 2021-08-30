/* se genera la conexion a la base de datos llamando las dependencias correspondientes
 */
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
const R = require('ramda');

oracledb.initOracleClient();

const options = {
    autoCommit: true
};
/*Esta funcion captura los datos de los inputs para el campo nombres del registro de usuario */
async function insertNombre(data) {
    const sql = "INSERT INTO USUARIO values ((select max(ID_USUARIO)+1 from USUARIO), :nombre , :nombre2 , :apel , :apel2 , :tel , :email , :dir , :doc , :pwd)";
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

async function validarUsuario(data) {
    const sql = "SELECT * FROM USUARIO WHERE CORREO = :usuario AND CONTRA = :pass";
    const binds = {
        usuario: data.uname,
        pass: data.psw
    };

    try {
        return executeSelect(sql, binds);
    } catch (err) {
        console.error(err);
    }
}
/* Con esta funcion se general el insert en la bd en la cual se esta conectados */
async function executeSqlInsert(sql, binds) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.executeMany(sql, binds, options);
        //console.log("Result is:", result);

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
        const result = await connection.execute(sql, binds);
        console.log("Result is:", result);

        const userInfo = R.pathOr(false, ["rows", "0"], result);
        const xxx = userInfo ? R.zipObj([
            'idUsuario', 
            'primerNombre', 
            'segundoNombre',
            'primerApellido',
            'segundoApellido',
            'telefono',
            'correo',
            'direccion',
            'identificacion'
        ], userInfo) : false;
        return xxx;

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

exports.insert = insertNombre
exports.validarUsuario = validarUsuario