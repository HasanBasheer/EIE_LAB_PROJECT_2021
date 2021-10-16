'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const helpers = require('./helpers')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        cb(null, file.originalname)
    }
})


router.post('/', (req, res) => {
        const upload = multer({ storage: storage, fileFilter: helpers.fileFilter }).single('upload')//, fileFilter: helpers.fileFilter
        upload(req, res, function (err) {
            if (req.fileValidationError) {
                return res.json({ body: req.fileValidationError })
            }
            else if (!req.file) {
                return res.send('Please select a file to upload')
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err)
            }
            else if (err) {
                return res.send(err)
            }
            //res.sendFile(path.join(__dirname, '../views', './upload.html'))
            res.send('File has been successfully uploaded')
        })
})

module.exports = router