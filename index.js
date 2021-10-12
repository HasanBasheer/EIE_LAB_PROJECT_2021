'use strict'
const path = require('path')
const express = require('express')
const multer = require('multer')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function(req, file, cb){
    //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    cb(null, file.originalname)
  }
})

app.get('/upload', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'upload.html'))
})

app.post('/upload', (req, res) => {
  const upload = multer({storage: storage}).single('upload')//, fileFilter: helpers.fileFilter

  upload(req, res, function(err){
    if(req.fileValidationError){
      return res.send(req.fileValidationError)
    }
    else if (!req.file){
      return res.send('Please select a file to upload')
    }
    else if (err instanceof multer.MulterError){
      return res.send(err)
    }
    else if (err){
      return res.send(err)
    }
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'))
  })
})

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

// app.use('/login.html', mainRouter)

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port ', port)

module.exports = app
