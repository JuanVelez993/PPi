'use strict'

const service = require('../services/User')

async function get (req, res) {
  try {
    const users = await service.getAll()
    res.status(200).send(users)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}

async function create (req, res) {
  try {
    const user = await service.create(req.body)
    res.status(201).send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}

module.exports = {
  get,
  create
}
