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
    const sql = "INSERT INTO FORMULARIO_ADOPCION values ((select max(ID_FORMULARIO)+1 from FORMULARIO_ADOPCION), :idUsuario , :idPerro, :idEstadoAdopcion, :motivoAdopcion , :animalesEnCasa , :animalesAnteriores , :numeroHijos , :habitantesCasa , :salario , :estadoCivil , :alergiasFamilia, :referencias, SYSDATE, NULL)";
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
    console.log("binds", binds)

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
        return executeSelectUser(sql, binds);
    } catch (err) {
        console.error(err);
    }
}

async function selectUsuario(data) {
    const sql = "SELECT * FROM USUARIO WHERE CORREO = :correo";
    const binds = {
        correo: data.mail,
    };

    try {
        return executeSelectUser(sql, binds);
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
        return executeSelectPerros(sql);
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

async function executeSelectUser(sql, binds) {
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
            'identificacion',
            'password'
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

async function executeSelectPerros(sql) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql);

        const perrosBd = R.pathOr([], ["rows"], result);
        const perros = perrosBd.map(perro => {
            return R.zipObj([
                'idPerro', 
                'raza', 
                'color',
                'genero',
                'nombre',
                'edad',
                'descripcion'
            ], perro)
        })
        console.log("perros", perros)
        return perros;

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