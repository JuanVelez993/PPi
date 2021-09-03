'use strict'

const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./src/routes/router')
const helpers = require('./src/middlewares/helpers')

const app = express()
const hbs = require('hbs');

app.set('port', 3000);

app.use(express.static('public'));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'))

app.locals.infoSession = {
    logged: false,
    info: null
};

const middlewares = [ bodyParser.urlencoded({ extended: true }) ];
app.use(middlewares);

helpers.registerHelpers();
app.use('/', routes)
app.listen(3000, () => { console.log('Server is up on port 3000') })