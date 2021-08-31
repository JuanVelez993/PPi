'use strict'
/* se declaran las dependencias que se usaran y se configura el servidor*/
const path = require('path')
const express = require('express');

const bodyParser = require('body-parser')
const session = require('express-session')
    //const initRoutes = require('./src/routes')

const controller = require('./src/controllers/user')
    //const handlebars = require('express-handlebars');
const routes = require('./src/routes/user')
const helpers = require('./src/middlewares/helpers')
    //crea una app de express
const app = express()
    // configura el puerto del server
app.set('port', 3000);
/*---------------------------------------------------------------------- */

app.use(session({
    secret: 'Keep it secret',
    name: 'uniqueSessionID',
    saveUninitialized: false
}))


/*--------------------esta seccion configura las propiedades de los archivos .hbs------------ */





//carga los archivos estaticos que deben estar ubicados en una carpeta root
const hbs = require('hbs');

app.use(express.static('public'));
//añade la carpeta de las vistas
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'))

/*------------------esta seccion define las rutas para los archivos de la web------------------------- */
// llama la pagina principal donde se iniciar al entrar en la web con el ser ver activo

app.locals.infoSession = {
    logged: false,
    info: null
};


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/AboutUs', (req, res) => {
    res.render('index-1')
})
app.get('/Nose', (req, res) => {
    res.render('index-2')
})
app.get('/PerrosAdop', (req, res) => {
    res.render('index-3')
})
app.get('/Contact', (req, res) => {
    res.render('index-4')
})
app.get('/Registro', (req, res) => {
    res.render('index-5')
})
app.get('/LogIn', (req, res) => {
    res.render('index-6')
})
app.get('/FormAdop', (req, res) => {
    res.render('index-7')
})

/*--------------------------------------------------------------------------------------------- */

/*---------------------------------middlewares----------------------------------------------------- */
const middlewares = [
    bodyParser.urlencoded({ extended: true }),
];
app.use(middlewares);
helpers.registerHelpers();

/*------------------------------------------------------------------------------------------------ */


app.use('/', routes)
    //app.post('/createUser', controller.createUser)

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})