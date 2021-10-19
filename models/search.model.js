const connection = require('../config/db.config')

const SearchObject = function (searchObject) {
  this.processReference = searchObject.processReference
  this.minNumStroke = searchObject.minNumStroke
  this.maxNumStroke = searchObject.maxNumStroke
  this.minDate = searchObject.minDate
  this.maxDate = searchObject.maxDate
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
  this.processes_spider = searchObject.processes_spider
  this.processes_up = searchObject.processes_up
  this.processes_mup = searchObject.processes_mup
  this.processes_srs = searchObject.processes_srs
  this.processes_evant = searchObject.processes_evant
  this.processes_evpost = searchObject.processes_evpost
  this.processes_cc = searchObject.processes_cc
  this.processes_recoillead = searchObject.processes_recoillead
  this.processes_wc = searchObject.processes_wc
  this.processes_stroke = searchObject.processes_stroke
  this.processes_srsm = searchObject.processes_srsm
  this.time = searchObject.time
  this.visibilities_out = searchObject.visibilities_out
  this.visibilities_visible = searchObject.visibilities_visible
  this.includeNull = searchObject.includeNull
}

SearchObject.createQuery = function (searchObject, result) {
  // console.log(searchObject)
  // res(null, [])
  const searchParams = []
  let searchQuery = 'SELECT * FROM flash_table WHERE 1 = 1'

  if (searchObject.includeNull === 'true') {
    if (searchObject.processReference) {
      searchQuery += ' and (process_reference = ? or process_reference is null)'
      searchParams.push(searchObject.processReference)
    }
    if (searchObject.minNumStroke && searchObject.maxNumStroke) {
      searchQuery += ' and (stroke_channel_num between ? and ? or stroke_channel_num is null)'
      searchParams.push(Number(searchObject.minNumStroke))
      searchParams.push(Number(searchObject.maxNumStroke))
    }
    if (searchObject.minDate && searchObject.maxDate) {
      searchQuery += ' and process_day between ? and ?'
      searchParams.push(searchObject.minDate)
      searchParams.push(searchObject.maxDate)
    }
    if (searchObject.time) {
      searchQuery += ' and (process_time = ? or process_time is null)'
      searchParams.push(searchObject.time)
    }
    if (searchObject.minMsTime && searchObject.maxMsTime) {
      searchQuery += ' and (process_time_millisecond between ? and ? or process_time_millisecond is null)'
      searchParams.push(Number(searchObject.minMsTime))
      searchParams.push(Number(searchObject.maxMsTime))
    }
    if (searchObject.processes_m || searchObject.processes_stroke || searchObject.processes_attemptedlead || searchObject.processes_spider || searchObject.processes_up ||
      searchObject.processes_mup || searchObject.processes_srs || searchObject.processes_evant || searchObject.processes_evpost || searchObject.processes_cc ||
      searchObject.processes_recoillead || searchObject.processes_srsm || searchObject.processes_wc) {
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
      if (searchObject.processes_spider === 'true') {
        processInValues.push('Spider')
      }
      if (searchObject.processes_up === 'true') {
        processInValues.push('up')
      }
      if (searchObject.processes_mup === 'true') {
        processInValues.push('M-up')
      }
      if (searchObject.processes_srs === 'true') {
        processInValues.push('SRS')
      }
      if (searchObject.processes_evant === 'true') {
        processInValues.push('Ev. Anterior')
      }
      if (searchObject.processes_evpost === 'true') {
        processInValues.push('Ev. Posterior')
      }
      if (searchObject.processes_cc === 'true') {
        processInValues.push('CC')
      }
      if (searchObject.processes_recoillead === 'true') {
        processInValues.push('Recoil Leader')
      }
      if (searchObject.processes_srsm === 'true') {
        processInValues.push('SRS-M')
      }
      if (searchObject.processes_wc === 'true') {
        processInValues.push('Without Classification')
      }
      if (processInValues.length > 0) {
        searchQuery += ' and (process in (?) or process is null)'
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
        searchQuery += ' and (visibility in (?) or visibility is null)'
        searchParams.push(processInValues)
      }
    }
    if (searchObject.minstrikepoint && searchObject.maxstrikepoint) {
      searchQuery += ' and (strike_point between ? and ? or strike_point is null)'
      searchParams.push(Number(searchObject.minstrikepoint))
      searchParams.push(Number(searchObject.maxstrikepoint))
    }
    if (searchObject.minduration && searchObject.maxduration) {
      searchQuery += ' and (duration between ? and ? or duration is null)'
      searchParams.push(Number(searchObject.minduration))
      searchParams.push(Number(searchObject.maxduration))
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
        searchQuery += ' and (polarity in (?) or polarity is null)'
        searchParams.push(processInValues)
      }
    }
  } else {
    if (searchObject.processReference) {
      searchQuery += ' and process_reference = ?'
      searchParams.push(searchObject.processReference)
    }
    if (searchObject.minNumStroke && searchObject.maxNumStroke) {
      searchQuery += ' and stroke_channel_num between ? and ?'
      searchParams.push(Number(searchObject.minNumStroke))
      searchParams.push(Number(searchObject.maxNumStroke))
    }
    if (searchObject.minDate && searchObject.maxDate) {
      searchQuery += ' and process_day between ? and ?'
      searchParams.push(searchObject.minDate)
      searchParams.push(searchObject.maxDate)
    }
    if (searchObject.time) {
      searchQuery += ' and process_time = ?'
      searchParams.push(searchObject.time)
    }
    if (searchObject.minMsTime && searchObject.maxMsTime) {
      searchQuery += ' and process_time_millisecond between ? and ?'
      searchParams.push(Number(searchObject.minMsTime))
      searchParams.push(Number(searchObject.maxMsTime))
    }
    if (searchObject.processes_m || searchObject.processes_stroke || searchObject.processes_attemptedlead || searchObject.processes_spider || searchObject.processes_up ||
    searchObject.processes_mup || searchObject.processes_srs || searchObject.processes_evant || searchObject.processes_evpost || searchObject.processes_cc ||
    searchObject.processes_recoillead || searchObject.processes_wc) {
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
      if (searchObject.processes_spider === 'true') {
        processInValues.push('Spider')
      }
      if (searchObject.processes_up === 'true') {
        processInValues.push('up')
      }
      if (searchObject.processes_mup === 'true') {
        processInValues.push('M-up')
      }
      if (searchObject.processes_srs === 'true') {
        processInValues.push('SRS')
      }
      if (searchObject.processes_evant === 'true') {
        processInValues.push('Ev. Anterior')
      }
      if (searchObject.processes_evpost === 'true') {
        processInValues.push('Ev. Posterior')
      }
      if (searchObject.processes_cc === 'true') {
        processInValues.push('CC')
      }
      if (searchObject.processes_recoillead === 'true') {
        processInValues.push('Recoil Leader')
      }
      if (searchObject.processes_srsm === 'true') {
        processInValues.push('SRS-M')
      }
      if (searchObject.processes_wc === 'true') {
        processInValues.push('Without Classification')
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
      searchParams.push(Number(searchObject.minstrikepoint))
      searchParams.push(Number(searchObject.maxstrikepoint))
    }
    if (searchObject.minduration && searchObject.maxduration) {
      searchQuery += ' and duration between ? and ?'
      searchParams.push(Number(searchObject.minduration))
      searchParams.push(Number(searchObject.maxduration))
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
  }
  // console.log(searchQuery)
  // console.log(searchParams)
  const q = connection.query(searchQuery, searchParams, function (err, res) {
    if (err) {
      // console.log('Could not find user with email address ' + searchObject, err)
      result(null, null)
    } else {
      // console.log('data returned: ' + res.length)
      result(null, res)
    }
  })
  // console.log(q)
  // connection.release
}

module.exports = SearchObject
