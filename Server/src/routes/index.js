'use strict'

const initUserRoutes = require('./user')

function initRoutes(app) {
  initUserRoutes(app)
}

module.exports = initRoutes
