'use strict'

require('dotenv').config()

// const fs = require('fs')
const mysql = require('mysql2')
// const serverCa = [fs.readFileSync('./config/BaltimoreCyberTrustRoot.crt.pem', 'utf8')]

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
  /* ssl: {
    rejectUnauthorized: true,
    ca: serverCa
  } */
})

connection.getConnection(
  function (err) {
    if (err) {
      console.log('!!! Cannot Connect to Database !!!')
      throw err
    } else {
      console.log('Database connected')
    }
  }
)

module.exports = connection
