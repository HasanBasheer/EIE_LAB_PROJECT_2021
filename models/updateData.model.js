'use strict'

const connection = require('../config/db.config')

// student object creation
const Lightning = function (lightning) {
  this.process_reference = lightning.process_reference
  this.stroke_channel_num = lightning.stroke_channel_num
  this.thunderstorm_day = lightning.thunderstorm_day
  this.process_day = lightning.process_day
  this.process_time = lightning.process_time
  this.process = lightning.process
  this.strike_point = lightning.strike_point
  this.polarity = lightning.polarity
  this.visibility = lightning.visibility
  this.duration = lightning.duration
}

Lightning.create = function (newLightning, result) { // do validations and throw exceptions
    /*
  this.findByEmailAddress(newStudent.email, function (err, res) {
    if (res && res.length > 0) {
      console.log('error: Email address already in use ' + newStudent.email, err)
      result('error: Email address already in use ' + newStudent.email, null)
      return
    }
    */ //instead of checking duplicate entries, maybe delete database and add new entried from beginning
    connection.query('INSERT INTO flash_table set ?', newLightning, function (err, res) {
      if (err) {
        console.log('error: ', err)
        result(err, null)
      } else {
        result(null)
      }
    })
  //})
}

module.exports = Student