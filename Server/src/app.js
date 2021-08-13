'use strict'
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser')
const initRoutes = require('./routes')

const app = express()
app.set('port', 3000);

app.set('views', path.join(__dirname, 'PPI/Server/src/views'));

app.get('*', (req, res) => {
    res.render('Index-5', {
        title: 'Registro',
        errorMessage: 'Que mira, abrase',
        footer: 'Created for the nodeJS course',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})

/*function initApp(app) {
  app.use(bodyParser.json())
  initRoutes(app)
}*/