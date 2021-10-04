'use strict'
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const mainRouter = require('./mainRoutes')
app.use(mainRouter)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/registration', mainRouter)

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port ', port)
