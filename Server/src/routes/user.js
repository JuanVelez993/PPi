'use strict'

const controller = require('../controllers/user')

const express = require('express');
const routerUser = express.Router();

routerUser.post('/createUser', controller.createUser);

module.exports = routerUser;