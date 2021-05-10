'use stric'

function joiValidation(schema, prop) {
  return function (req, res, next) {
    const { value, error } = schema.validate(req[prop])

    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    req[prop] = value

    next()
  }
}

module.exports = joiValidation
