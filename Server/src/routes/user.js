'use strict'

const controllerUser = require('../controllers/user')
const controllerLogIn = require('../controllers/logIn')
const controllerPerro = require('../controllers/perro')

const express = require('express');
const routerUser = express.Router();

routerUser.post('/createUser', controllerUser.createUser);
routerUser.post('/saveAdoptForm', controllerPerro.saveAdoptForm);
routerUser.get('/prueba', controllerUser.prueba);
routerUser.post('/logIn', controllerLogIn.validarUsuario);
routerUser.get('/logout', controllerLogIn.cerrarSesion);

routerUser.get('/', controllerPerro.consultarPerrosInicio)
routerUser.get('/AboutUs', (req, res) => { res.render('index-1') })
routerUser.get('/Nose', (req, res) => { res.render('index-2') })
routerUser.get('/PerrosAdop', controllerPerro.consultarPerros)
routerUser.get('/Contact', (req, res) => { res.render('index-4') })
routerUser.get('/Registro', (req, res) => { res.render('index-5') })
routerUser.get('/LogIn', (req, res) => { res.render('index-6') })
routerUser.get('/RecuperarPassword', (req, res) => { res.render('index-8') })
routerUser.get('/FormAdop/:idPerro/:nombre', (req, res) => {
    console.log("idPerro",req.params.idPerro )
    console.log("nombrePerro", req.params.nombre)
    res.render('index-7', { idPerro: req.params.idPerro, nombrePerro: req.params.nombre })
})
routerUser.post('/forgotPassword', controllerLogIn.recuperarPassword);

module.exports = routerUser;