'use strict'

const xlsxFile = require('read-excel-file/node')
const connection = require('../config/db.config')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

let process_day = ''
let process_time = ''
let process_time_millisecond = ''
let process_reference = ''
let stroke_channel_num = ''
let process = ''
let strike_point = ''
let polarity = ''
let visibility = ''
let duration = ''

let pr = []
let scn = []
let py = []
let pm = []
let pd = []
let ph = []
let pmin = []
let ps = []
let pmilli = []
let p = []
let sp = []
let pol = []
let v = []
let d = []

exports.createData = function (req, res) {
    let fileName = fs.readdirSync('./upload/')
    console.log('The files path is: ' + fileName)
    if (fileName) {
        xlsxFile('./upload/' + fileName).then((rows) => { //'../EIE_LAB_PROJECT_2021/upload/Data.xlsx'
            pr = rows.map(d => d[0])
            scn = rows.map(d => d[1])
            py = rows.map(d => d[4])
            pm = rows.map(d => d[5])
            pd = rows.map(d => d[6])
            ph = rows.map(d => d[7])
            pmin = rows.map(d => d[8])
            ps = rows.map(d => d[9])
            pmilli = rows.map(d => d[10])
            p = rows.map(d => d[11])
            sp = rows.map(d => d[12])
            pol = rows.map(d => d[13])
            v = rows.map(d => d[15])
            d = rows.map(d => d[16])
        })

        connection.query('DELETE FROM flash_table WHERE flash_ID > 0', function (err, res) {
            if (err) {
                console.log('error: ', err)
                res(err, null)
            } else {
                connection.query('ALTER TABLE flash_table AUTO_INCREMENT = 1', function (err, res) {
                    if (err) {
                        console.log('error: ', err)
                        res(err, null)
                    } else {
                        console.log('Database has been purged and new data has been added')
                        //'./HSvideos_and_LLS_11May2020_MCF.xlsx'  , { sheet: 'HS_data' }
                        for (let x = 1; x < pr.length; x++) {
                            //const newLightning = new Lightning(req.body)
                            process_reference = pr[x]
                            stroke_channel_num = scn[x]
                            process = p[x]
                            strike_point = sp[x]
                            polarity = pol[x]
                            visibility = v[x]
                            duration = d[x]
                            process_day = py[x] + '-' + pm[x] + '-' + pd[x]
                            process_time = ph[x] + ':' + pmin[x] + ':' + ps[x]
                            process_time_millisecond = pmilli[x]

                            const newLightning = {
                                process_reference,
                                stroke_channel_num,
                                process_day,
                                process_time,
                                process,
                                process_time_millisecond,
                                strike_point,
                                polarity,
                                visibility,
                                duration
                            }
                            connection.query('INSERT INTO flash_table set ?', newLightning, function (err, res) {
                                if (err) {
                                    console.log('error: ', err)
                                    res(err, null)
                                }
                            })
                        }
                    }
                })
            }
        })
        console.log('Finish Upload - controller')
        let done = true
        res.json({body: done})
        //unlinkAsync('./upload/' + fileName)
    } else {
        console.log("File name is empty. Please upload a file")
        //res.json({ body: "empty file name" })
    }
}

