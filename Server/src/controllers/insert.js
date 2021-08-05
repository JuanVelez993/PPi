/* se genera la conexion a la base de datos llamando las dependencias correspondientes
 */
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

oracledb.initOracleClient();

const options = {
    autoCommit: true
};
/*Esta funcion captura los datos de los inputs para el campo nombres del registro de usuario */
async function insertNombre(data) {
    const sql = "INSERT INTO nombremw values ((select max(id_nom)+1 from nombremw), :nombre)";
    const binds = [
        { nombre: data.nombre }
    ];

    try {
        executeSqlInsert(sql, binds)
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
        console.log("Result is:", result);

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