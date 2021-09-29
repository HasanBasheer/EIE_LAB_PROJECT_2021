'use strict'
const path = require('path')
const express = require('express')
// const app = express()
const mainRouter = express.Router()
const userController = require('./controllers/user.controller.js')
const { body, validationResult } = require('express-validator')

mainRouter.get('/homepage', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'homepage.html'))
})
mainRouter.get('/registration', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'registration.html'))
})
mainRouter.post('/user/', userController.validate('createUser'), userController.createUser)

mainRouter.get('/user/:emailAddress', userController.findByEmailAddress)

mainRouter.post('/student/', userController.validate('createUser'), userController.createUser)

module.exports = mainRouter
