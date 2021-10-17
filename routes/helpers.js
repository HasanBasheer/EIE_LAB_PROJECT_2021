'use strict'

const fileFilter = function(req, file, cb) {
    if(!file.originalname.match(/\.(xlsx)$/)){
        req.fileValidationError = 'Only excel .xlsx files are allowed'
        return cb(new Error('Only excel .xlsx files are allowed'), false)
    }
    cb(null, true)
}

module.exports.fileFilter = fileFilter