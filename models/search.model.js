const connection = require('../config/db.config')

const SearchObject = function (searchObject) {
  this.date = searchObject.date
  this.maxduration = searchObject.maxduration
  this.maxstrikepoint = searchObject.maxstrikepoint
  this.minduration = searchObject.minduration
  this.minstrikepoint = searchObject.minstrikepoint
  this.minMsTime = searchObject.minMsTime
  this.maxMsTime = searchObject.maxMsTime
  this.polarities_negative = searchObject.polarities_negative
  this.polarities_positive = searchObject.polarities_positive
  this.polarities_wc = searchObject.polarities_wc
  this.processes_attemptedlead = searchObject.processes_attemptedlead
  this.processes_m = searchObject.processes_m
  this.processes_stroke = searchObject.processes_stroke
  this.time = searchObject.time
  this.visibilities_out = searchObject.visibilities_out
  this.visibilities_visible = searchObject.visibilities_visible
}

SearchObject.createQuery = function (searchObject, result) {
  console.log(searchObject)
  // res(null, [])
  const searchParams = []
  let searchQuery = 'SELECT * FROM lightning_data WHERE 1 = 1'
  if (searchObject.date) {
    searchQuery += ' and process_day = ?'
    searchParams.push(searchObject.date)
  }
  if (searchObject.time) {
    searchQuery += ' and process_time = ?'
    searchParams.push(searchObject.time)
  }
  if (searchObject.minMsTime && searchObject.maxMsTime) {
    searchQuery += ' and process_time_millisecond between ? and ?'
    searchParams.push(searchObject.minMsTime)
    searchParams.push(searchObject.maxMsTime)
  }
  if (searchObject.processes_m || searchObject.processes_stroke || searchObject.processes_attemptedlead) {
    const processInValues = []
    if (searchObject.processes_m === 'true') {
      processInValues.push('M')
    }
    if (searchObject.processes_stroke === 'true') {
      processInValues.push('Stroke')
    }
    if (searchObject.processes_attemptedlead === 'true') {
      processInValues.push('Attempted Leader')
    }
    if (processInValues.length > 0) {
      searchQuery += ' and process in (?)'
      searchParams.push(processInValues)
    }
  }
  if (searchObject.visibilities_visible || searchObject.visibilities_out) {
    const processInValues = []
    if (searchObject.visibilities_visible === 'true') {
      processInValues.push('visible')
    }
    if (searchObject.visibilities_out === 'true') {
      processInValues.push('out')
    }
    if (processInValues.length > 0) {
      searchQuery += ' and process in (?)'
      searchParams.push(processInValues)
    }
  }
  if (searchObject.minstrikepoint && searchObject.maxstrikepoint) {
    searchQuery += ' and strike_point between ? and ?'
    searchParams.push(searchObject.minstrikepoint)
    searchParams.push(searchObject.maxstrikepoint)
  }
  if (searchObject.minduration && searchObject.maxduration) {
    searchQuery += ' and duration between ? and ?'
    searchParams.push(searchObject.minduration)
    searchParams.push(searchObject.maxduration)
  }
  if (searchObject.polarities_positive || searchObject.polarities_negative || searchObject.polarities_wc) {
    const processInValues = []
    if (searchObject.polarities_positive === 'true') {
      processInValues.push('Positive')
    }
    if (searchObject.polarities_negative === 'true') {
      processInValues.push('Negative')
    }
    if (searchObject.polarities_wc === 'true') {
      processInValues.push('Without Classification')
    }
    if (processInValues.length > 0) {
      searchQuery += ' and polarity in (?)'
      searchParams.push(processInValues)
    }
  }
  connection.query(searchQuery, searchParams, function (err, res) {
    if (err) {
      console.log('Could not find user with email address ' + searchObject, err)
      result(null, null)
    } else {
      result(null, res)
    }
  })
}

module.exports = SearchObject
