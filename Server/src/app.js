'use strict'

const bodyParser = require('body-parser')

const initRoutes = require('./routes')

function initApp(app) {
  app.use(bodyParser.json())
  
  initRoutes(app)
}

module.exports = initApp
