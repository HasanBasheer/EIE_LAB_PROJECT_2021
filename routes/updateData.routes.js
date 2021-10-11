'use strict'

const express = require('express')
const router = express.Router()

const updateDataController = require('../controllers/updateData.controller')

router.post('/updateData', (req, res) => {
    updateDataController.createData()
})

module.exports = router