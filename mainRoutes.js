'use strict'
const path = require('path')
const express = require('express')
// const app = express()
const mainRouter = express.Router()

mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

mainRouter.get('/registration', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'registration.html'))
})

mainRouter.get('/homepage', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'homepage.html'))
})

module.exports = mainRouter
