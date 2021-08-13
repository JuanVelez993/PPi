/*Usando la depedencia de nodejs oracledb se usa esta instruccion para conectar con el usuario
cuyas tablas vayamos a usar en la aplicacion*/ 

module.exports = {
    user: "us_mockweb",
    password: "contra",
    connectString: "localhost:1521/XE",
    externalAuth: false
};