'use strict'
/* se declaran las dependencias que se usaran y se configura el servidor*/
const path = require('path')
const express = require('express');
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
    //const initRoutes = require('./src/routes')

const controller = require('./src/controllers/user')
const routes = require('./src/routes/user')
    //crea una app de express
const app = express()
    // configura el puerto del server
app.set('port', 3000);
/*---------------------------------------------------------------------- */


/*--------------------esta seccion configura las propiedades de los archivos .hbs------------ */

app.set('view engine', 'hbs')
    //carga los archivos estaticos que deben estar ubicados en una carpeta root 
app.use(express.static('public'));
//añade la carpeta de las vistas
app.set('views', path.join(__dirname, 'src/views'));


/*------------------esta seccion define las rutas para los archivos de la web------------------------- */
// llama la pagina principal donde se iniciar al entrar en la web con el ser ver activo
app.get('/', (req, res) => {
    res.render('Index', {
        title: 'Home',
        errorMessage: 'Server is not working',
        footer: '',
    })
})
app.get('/AboutUs', (req, res) => {
    res.render('Index-1')
})
app.get('/Nose', (req, res) => {
    res.render('Index-2')
})
app.get('/PerrosAdop', (req, res) => {
    res.render('Index-3')
})
app.get('/Contact', (req, res) => {
    res.render('Index-4')
})
app.get('/Registro', (req, res) => {
    res.render('Index-5')
})
app.get('/LogIn', (req, res) => {
    res.render('Index-6')
})

/*--------------------------------------------------------------------------------------------- */

/*---------------------------------middlewares----------------------------------------------------- */
const middlewares = [
    bodyParser.urlencoded({ extended: true }),
];
app.use(middlewares);
/*------------------------------------------------------------------------------------------------ */


app.use('/', routes)
    //app.post('/createUser', controller.createUser)

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})