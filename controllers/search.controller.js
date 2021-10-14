const SearchObject = require('../models/search.model.js')

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
