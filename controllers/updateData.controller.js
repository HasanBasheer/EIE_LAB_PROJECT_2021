'use strict'

const Lightning = require('../models/updateData.model')


exports.createData = function (req, res) {

    //run python excel code


    // const newLightning = new Lightning(req.body)

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