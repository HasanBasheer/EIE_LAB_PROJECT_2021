'use strict'
const path = require('path')
const express = require('express')
const app = express()
const mainRouter = express.Router()
const userController = require('./controllers/user.controller.js')
const searchController = require('./controllers/search.controller.js')
const updateDataController = require('./controllers/updateData.controller.js')

const { body, validationResult } = require('express-validator')
const session = require('express-session')

mainRouter.use(
  session({
    secret: 'keypass',
    resave: false,
    saveUninitialized: false
  })
)

const isLoggedIn = (req, res, next) => {
  if (req.session.isLoggedin) {
    next()
  } else {
    res.sendFile(path.join(__dirname, 'views', 'login.html'))
  }
}

mainRouter.get('/', function (req, res) {
  req.session.destroy
  req.session.isLoggedin = false
  res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

mainRouter.get('/registration', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'registration.html'))
})

mainRouter.get('/homepage', isLoggedIn, function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'homepage.html'))
})

mainRouter.get('/upload', isLoggedIn, function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'upload.html'))
})

/*
mainRouter.get('/uploadData', isLoggedIn, function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'upload.html'))
})
*/
mainRouter.post('/user/', userController.createUser)

mainRouter.get('/user/:emailAddress', userController.findByEmailAddress)

// mainRouter.get('/user/:authtoken', userController.checkAuthToken)

mainRouter.post('/createQuery', searchController.createQuery)

//mainRouter.post('/updateData', updateDataController.createData)

module.exports = mainRouter
