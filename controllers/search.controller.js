const SearchObject = require('../models/search.model.js')
const json2csv = require('json-2-csv')

exports.downloadQuery = function (req, res) {
  const newSearchObject = new SearchObject(req.body)
  // console.log(newSearchObject)

  SearchObject.createQuery(newSearchObject, function (err, result) {
    if (err) {
      res.status(400).send({ error: true, message: err })
      return
    }

    // const json2csv = new Parser({ fields });
    json2csv.json2csv(result, (err, csv) => {
      if (err) {
        throw err
      }
      console.log(csv)
      res.header('Content-Type', 'text/csv')
      res.attachment('result.csv')
      return res.send(csv)
    })

    // converter.json2csv(res, (err, csv) => {
    //   if (err) {
    //     throw err
    //   }

    //   // print CSV string
    //   console.log(csv)
    // })
    // res.json(result)
  })
}
exports.createQuery = function (req, res) {
  const newSearchObject = new SearchObject(req.body)
  // console.log(newSearchObject)

  SearchObject.createQuery(newSearchObject, function (err, result) {
    if (err) {
      res.status(400).send({ error: true, message: err })
      return
    }
    res.json(result)
  })
}
