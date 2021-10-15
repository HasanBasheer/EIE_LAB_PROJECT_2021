'use strict'
const path = require('path')
const express = require('express')
//const multer = require('multer')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

/*
app.get('/upload', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'upload.html'))
})
*/


const mainRouter = require('./mainRoutes')
app.use(mainRouter)

/*
app.get('/', (req, res) => {
  res.send('Hello World')
})
*/

app.use('/registration', mainRouter)

const loginRoutes = require('./routes/login.routes')
app.use('/', loginRoutes)

const updateDataRoutes = require('./routes/updateData.routes')
app.use('/updateData', updateDataRoutes)

const uploadRoutes = require('./routes/upload.routes')
app.use('/upload', uploadRoutes)

// app.use('/login.html', mainRouter)

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port ', port)

//module.exports = app
