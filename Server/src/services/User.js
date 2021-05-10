'use strict'

const users = []

class User {
  constructor() { }
  
  async getAll () {

    return users
  }
  
  async create(data) {
    users.push(data)

    return data
  }
}

module.exports = new User()
