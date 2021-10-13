const connection = require('../config/db.config')

const Token = function (token) {
  this.authtoken = Token.authtoken
}

Token.checkAuthToken = function (authtoken, result) {
  connection.query('SELECT * FROM tokens_table WHERE token = ?', authtoken, function (err, res) {
    if (err) {
      console.log('Invalid Authentication Token', err)
      result(null, null)
    } else {
      result(null, res)
    }
  })
}

module.exports = Token
