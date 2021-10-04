'use strict'
const User = require('../models/user.model.js')
const { body } = require('express-validator')
const { validationResult } = require('express-validator')

exports.findByEmailAddress = function (req, res) {
  const emailAddress = req.params.emailAddress
  User.findByEmailAddress(req.params.emailAddress, function (err, result) {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      if (!result) {
        res
          .status(404)
          .send({
            error: true,
            message: 'User not found with email address ' + emailAddress
          })
      }
      res.json(result)
    }
  })
}

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      console.log(JSON.stringify(body))
      return [
        body('firstName', 'firstName doesn\'t exists').exists(),
        body('lastName', 'lastName doesn\'t exists').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('password', 'password doesn\'t exists').exists()
      ]
    }
  }
}

exports.createUser = function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
    return
  }
  const newUser = new User(req.body)
  // handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({
        error: true,
        message:
          'Please provide all required fields to create a new user'
      })
    return
  }

  User.create(newUser, function (err, user) {
    if (err) {
      res.status(400).send({ error: true, message: err })
      return
    }
    res.json({
      error: false,
      message:
        'User with email address ' + newUser.email + ' added successfully!',
      data: user
    })
  })
}
