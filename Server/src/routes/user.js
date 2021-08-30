'use strict'

const controllerUser = require('../controllers/user')
const controllerLogIn = require('../controllers/logIn')

const express = require('express');
const routerUser = express.Router();

routerUser.post('/createUser', controllerUser.createUser);
routerUser.post('/logIn', controllerLogIn.validarUsuario);
routerUser.get('/logout', controllerLogIn.cerrarSesion);
//routerUser.get('/forgotPassword', controllerLogIn.cerrarSesion);

module.exports = routerUser;