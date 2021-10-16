'use strict'

const express = require('express')
const router = express.Router()

const updateDataController = require('../controllers/updateData.controller')

router.post('/', (req, res) => {
    /*
    const process_reference = req.body.process_reference
    const stroke_channel_num = req.body.stroke_channel_num
    const process_day = req.body.process_day
    const process_time = req.body.process_time
    const process = req.body.process
    const strike_point = req.body.strike_point
    const polarity = req.body.polarity
    const visibility = req.body.visibility
    const duration = req.body.duration
    */
    //updateDataController.createData(process_reference, stroke_channel_num, process_day, process_time, 
      //  process, strike_point, polarity, visibility, duration, res)
    updateDataController.createData(req, res)
})

router.post('/purge', (req, res) => {
  updateDataController.deleteData(req, res)
})

module.exports = router