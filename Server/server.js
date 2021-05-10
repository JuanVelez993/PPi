'use strict'

const express = require('express')

const initApp = require('./src/app')

const app = express()

initApp(app)

app.listen(3000, () => console.log('server is running on port 3000'))