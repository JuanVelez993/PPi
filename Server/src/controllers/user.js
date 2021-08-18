'use strict'

const service = require('../services/User')

async function createUser(req, res) {
    try {
        console.log("request", req.body)
        console.log("request", req.body)
        const user = await service.createUser(req.body)
        res.status(204).send(user)
    } catch (err) {
        console.error(err)
        res.status(500).send('Internal server error')
    }
}

module.exports = {
    createUser
}