'use strict'

const express = require('express')
const router = express.Router()
const connection = require('../config/db.config')
const bcrypt = require('bcrypt')
const mainRouter = require('../mainRoutes')

mainRouter.post('/', function (req, result) {
  const email = req.body.email
  const password = req.body.password
  const obj = connection.escape(email)

  connection.query('SELECT * FROM users_table WHERE email = ' + obj, function (err, resp) {
      if (err) {
        throw err
      } else if (resp[0] !== undefined) {
        const hashedPassword = resp[0].password
        bcrypt.compare(password, hashedPassword, function (err, res) { // bcrypt uses same salt to check password
          if (err) {
            throw err
          }
          if (res === true) {
            req.session.isLoggedin = true
            req.session.ids = resp[0].user_ID
            result.json({ body: true })
          } else {
            result.json({ body: false })
          }
          connection.release
        })
      } else {
        result.json({ body: false })
      }
    }
  )
})

module.exports = router
