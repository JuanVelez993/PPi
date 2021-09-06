'use strict'

const controllerUser = require('../controllers/user')
const controllerLogIn = require('../controllers/logIn')
const controllerPerro = require('../controllers/perro')

const express = require('express');
const router = express.Router();

router.post('/createUser', controllerUser.createUser);
router.post('/saveAdoptForm', controllerPerro.saveAdoptForm);
router.post('/saveDog', controllerPerro.saveDog);
router.post('/forgotPassword', controllerLogIn.recuperarPassword);
router.post('/logIn', controllerLogIn.validarUsuario);

router.get('/', controllerPerro.consultarPerrosInicio)
router.get('/updateAdoptForm/:id/:estado', controllerPerro.updateAdoptForm);
router.get('/deleteAdoptForm/:id', controllerPerro.deleteAdoptForm);
router.get('/AdminFormAdop', controllerPerro.consultarFormulariosAdopcion)
router.get('/RegistroPerro', controllerPerro.consultarGenericos)
router.get('/logout', controllerLogIn.cerrarSesion);
router.get('/PerrosAdop', controllerPerro.consultarPerros)
router.get('/AboutUs', (req, res) => { res.render('index-1') })
router.get('/Nose', (req, res) => { res.render('index-2') })
router.get('/Contact', (req, res) => { res.render('index-4') })
router.get('/Registro', (req, res) => { res.render('index-5') })
router.get('/LogIn', (req, res) => { res.render('index-6') })
router.get('/RecuperarPassword', (req, res) => { res.render('index-8') })
router.get('/FormAdop/:idPerro/:nombre', (req, res) => {
    res.render('index-7', { idPerro: req.params.idPerro, nombrePerro: req.params.nombre })
})

module.exports = router;