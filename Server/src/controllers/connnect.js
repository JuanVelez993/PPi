/* se definen 2 constantes de las cuales se requieren dos cosas : la depdencia oracledb y el archivo donde
se definio el usuario al que se conectara*/
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

oracledb.initOracleClient();

async function run() {

    let connection;

    try {

        connection = await oracledb.getConnection(dbConfig);

        console.log('Connection was successful!');

        /*const result = await connection.execute(
            `SELECT *
       FROM nombremw
       where id_nom in (:idbv, :aaa)`, [1, 4]
        );

        console.log(result.metaData);
        console.log(result.rows);*/

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

run();