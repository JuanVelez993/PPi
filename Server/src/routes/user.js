'use strict'

const schemas = require('../schemas/user')
const controller = require('../controllers/user')
const joiValidation = require('../middlewares/joiValidation')

function initUserRoutes(app) {
    app.get('/aaaa', controller.get)
    app.post('/', joiValidation(schemas.createUser, 'body'), controller.create)
    app.post('/createUser', controller.createUser)
}

module.exports = initUserRoutes