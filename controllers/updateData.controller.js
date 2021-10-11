'use strict'

const Lightning = require('../models/updateData.model')


// exports.createData = function (process_reference, stroke_channel_num, process_day, process_time, 
//     process, strike_point, polarity, visibility, duration, res) {

exports.createData = function (req, res) {
    //run python excel code
    console.log('controller')
    
    const newLightning = new Lightning(req.body)

    /*
    const newLightning = {
        process_reference, 
        stroke_channel_num, 
        process_day, 
        process_time, 
        process, 
        strike_point, 
        polarity, 
        visibility, 
        duration
    }
    */

    Lightning.create(newLightning, function (err, lightning) {
      if (err) {
        res.status(400).send({ error: true, message: err })
        return
      }
      res.json({
        error: false,
        message:
          'Data Added',
        data: lightning
      })
    })
  }