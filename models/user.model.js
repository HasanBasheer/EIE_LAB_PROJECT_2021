'use strict'

const connection = require('../config/db.config')
const bcrypt = require('bcrypt')
// const { connect } = require('../config/db.config')
const saltRounds = 10

// user object creation
const User = function (user) {
  this.firstname = user.firstName
  this.lastname = user.lastName
  this.email = user.email
  this.password = user.password
}

User.checkAuthToken = function (authtoken, result) {
  connection.query('SELECT * FROM tokens_table WHERE token = ?', authtoken, function (err, res) {
    if (err) {
      console.log('Invalid Authentication Token', err)
      result(null, null)
    } else {
      connection.query('DELETE FROM tokens_table WHERE token = ?', authtoken)
      result(null, res)
    }
  })
  connection.release
}

User.findByEmailAddress = function (email, result) {
  connection.query('SELECT * FROM users_table WHERE email = ?', email, function (err, res) {
    if (err) {
      console.log('Could not find user with email address ' + email, err)
      result(null, null)
    } else {
      result(null, res)
    }
  })
  connection.release
}

User.create = function (newUser, result) { // do validations and throw exceptions
  this.findByEmailAddress(newUser.email, function (err, res) {
    if (res && res.length > 0) {
      console.log('error: Email address already in use ' + newUser.email, err)
      result('error: Email address already in use ' + newUser.email, null)
      // alert('Email address ' + newUser.email + ' already in use')
      return
      // res.JSON({ body: 'Email already in use' })
    }
    const password = newUser.password
    newUser.password = bcrypt.hashSync(newUser.password, saltRounds)
    connection.query('INSERT INTO users_table SET ?', newUser, function (err, res) {
      if (err) {
        console.log('error: ', err)
        result(err, null)
      } else {
        result(null, res.insertId)
      }
    })
    connection.release
  })
}

module.exports = User
