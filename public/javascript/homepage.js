$(document).ready(function () {
  console.log(m = moment('2013-03-01', 'YYYY-MM-DD'))
  console.log('homepage ready')
  $('#logout').click(function () {
    window.location.href = '/'
  })

  $('#minMsTimeSlider').change(function () {
    const $this = $(this)
    if ($this.val() >= $('#maxMsTimeSlider').val()) {
      $('#maxMsTimeSlider').val($this.val())
      $('#maxMsTimeBox').val($this.val())
    }
  })
  $('#maxMsTimeSlider').change(function () {
    const $this = $(this)
    if ($this.val() <= $('#minMsTimeSlider').val()) {
      $('#minMsTimeSlider').val($this.val())
      $('#minMsTimeBox').val($this.val())
    }
  })

  $('#minstrikepoint').change(function () {
    const $this = $(this)
    if ($this.val() >= $('#maxstrikepoint').val()) {
      $('#maxstrikepoint').val($this.val())
      $('#maxstrikepointbox').val($this.val())
    }
  })
  $('#maxstrikepoint').change(function () {
    const $this = $(this)
    if ($this.val() <= $('#minstrikepoint').val()) {
      $('#minstrikepoint').val($this.val())
      $('#minstrikepointbox').val($this.val())
    }
  })

  $('#minduration').change(function () {
    const $this = $(this)
    if ($this.val() >= $('#maxduration').val()) {
      $('#maxduration').val($this.val())
      $('#maxdurationbox').val($this.val())
    }
  })
  $('#maxduration').change(function () {
    const $this = $(this)
    if ($this.val() <= $('#minduration').val()) {
      $('#minduration').val($this.val())
      $('#mindurationbox').val($this.val())
    }
  })

  $('#clearFilter').click(function () {
    const resultsCount = $('#resultsContainer tr').length - 1
    if (resultsCount > 0) {
      const clearResultsConfirm = confirm('There are results in the table. Are you sure you would like to clear the results and reset the filters?')
      if (clearResultsConfirm) {
        location.reload()
      }
    } else {
      const clearResultsConfirm = confirm('Are you sure you would like to reset the filters?')
      if (clearResultsConfirm) {
        location.reload()
      }
    }
  })
  $('#filterButton, #downloadReportButton').click(function () {
    const formData = {}

    if ((!isEmpty($('#minDate').val()) && !isEmpty($('#maxDate').val()))) {
      console.log(compareDate($('#minDate').val(), $('#maxDate').val()))
      console.log(compareDate($('#maxDate').val(), $('#minDate').val()))
      if (compareDate($('#minDate').val(), $('#maxDate').val()) > 0) {
        alert('Please min date must be less than max date')
        return
      }
      if (compareDate($('#maxDate').val(), $('#minDate').val()) < 0) {
        alert('Please max date must be greater than min date')
        return
      }
    }
    if ((!isEmpty($('#minDate').val()) && isEmpty($('#maxDate').val())) || (isEmpty($('#minDate').val()) && !isEmpty($('#maxDate').val()))) {
      alert('Please fill in both maximum and minimum range values for the date')
      return
    }

    if ((!isEmpty($('#minMsTimeBox').val()) && isEmpty($('#maxMsTimeBox').val())) || (isEmpty($('#minMsTimeBox').val()) && !isEmpty($('#maxMsTimeBox').val()))) {
      alert('Please ensure that you fill in both maximum and minimum range values for the millisecond')
      return
    }

    if ((!isEmpty($('#minstrikepointbox').val()) && isEmpty($('#maxstrikepointbox').val())) || (isEmpty($('#minstrikepointbox').val()) && !isEmpty($('#maxstrikepointbox').val()))) {
      alert('Please ensure that you fill in both maximum and minimum range values for the strike point')
      return
    }
    if ((!isEmpty($('#mindurationbox').val()) && isEmpty($('#maxdurationbox').val())) || (isEmpty($('#mindurationbox').val()) && !isEmpty($('#maxdurationbox').val()))) {
      alert('Please ensure that you fill in both maximum and minimum range values for the duration')
      return
    }
    $('#flex-container').find('input').each(function () {
      const $this = $(this)
      if (!$this.attr('name')) {
        return true
      }
      if ($this.is(':checkbox')) {
        formData[$this.attr('name')] = $this.is(':checked')
      } else {
        formData[$this.attr('name')] = $this.val()
      }
    })
    const filterButtonClicked = ($(this).attr('id') === 'filterButton')
    let postUrl = '/downloadQuery'
    if (filterButtonClicked) {
      postUrl = '/createQuery'
    }
    $.post(postUrl, formData, function (data, status, jqXHR) { // success callback
      console.log('status: ' + status + ', data: ' + data)
      if (!filterButtonClicked) {
        const blob = new Blob([data])
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'results.csv'
        link.click()
        return
      }

      // $('#resultsContainer').empty()
      console.log('BE stuff' + data.length)
      let durationTotal = 0
      const durationValuesArray = []
      let dateValuesArray = []
      $.each(data, function (index, lightning) {
        // console.log(lightning)
        // alert(index + ': ' + value)
        $('#resultsContainer').append('<tr>><td>' + lightning.process_reference + '</td><td>' + lightning.stroke_channel_num + '</td>' +
        '<td>' + new Date(lightning.process_day).toISOString().slice(0, 10) /* lightning.process_day */+ '</td>' + '<td>' + lightning.process_time + '</td>' + '<td>' + lightning.process_time_millisecond + '</span>' +
        '<td>' + lightning.process + '</td>' + '<td>' + lightning.strike_point + '</td>' + '<td>' + lightning.polarity + '</td>' + '<td>' + lightning.visibility + '</td>' +
        '<td>' + lightning.duration + '</ td>' +
        '</tr>')
        durationTotal += Number(lightning.duration)
        durationValuesArray.push(Number(lightning.duration))
        dateValuesArray.push(new Date(lightning.process_day).toISOString().slice(0, 10))
      })
      const date1 = new Date(dateValuesArray[0])
      const date2 = new Date(dateValuesArray[dateValuesArray.length-1])
      console.log(date1 + " " + date2)
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      durationValuesArray.sort()
      durationValuesArray.filter(Number)
      console.log(durationValuesArray)
      console.log(durationValuesArray.length)
      console.log('Duration Total ' + durationTotal)
      $('#numResultsContainer').empty()
      const resultsCount = $('#resultsContainer tr').length - 1
      console.log('TOTAL TABLE: ' + resultsCount)
      $('#numResultsContainer').append('<h2>Results Table</h2>')
      console.log(durationValuesArray)
      let meanVal = ((resultsCount === 0) ? 0 : (durationTotal / resultsCount))
      console.log(meanVal)
      $('#numResultsContainer').append('<label><b>Number of Results: </b>' + resultsCount + '</label><br/>' +
      '<label><b>Mean Duration: </b>' + meanVal + '</label><br/>' +
      '<label><b>Min Duration Value: </b>' + ((durationValuesArray.length === 0) ? 0 : durationValuesArray[0]) + '</label><br/>' +
      '<label><b>Max Duration Value: </b>' + ((durationValuesArray.length === 0) ? 0 : durationValuesArray[durationValuesArray.length - 1]) + '</label><br/>' +
      // median
      '<label><b>Median Duration Value: </b>' + ((durationValuesArray.length === 0) ? 0 : getMedian(durationValuesArray)) + '</label><br/>')
      $('#numResultsContainer').append('')
      // duration range
      //only keeps integer number and removes everything else
      $('#numResultsContainer').append('<label><b>Range Duration Value: </b>' + ((durationValuesArray.length === 0) ? 0 : (durationValuesArray[durationValuesArray.length -1] - durationValuesArray[0])) + '</label><br/>')
      // standard deviation
      $('#numResultsContainer').append('<label><b>Standard Deviation Duration Value: </b>' + ((durationValuesArray.length === 0) ? 0 : stdDev(durationValuesArray, meanVal)) + '</label><br/>')
      //time range
      $('#numResultsContainer').append('<label><b>Result Date range (days): </b>' + diffDays + '</label><br/>')
      //table (histogram) process frequency between different times
      // Ill think about this one tomorrow ?????

    })
  })
})
function isEmpty (value) {
  if (typeof value !== 'undefined' && value) {
    return false
  };
  return true
}

function compareDate (dateTimeA, dateTimeB) {
  const momentA = moment(dateTimeA, 'YYYY/MM/DD')
  const momentB = moment(dateTimeB, 'YYYY/MM/DD')
  if (momentA > momentB) return 1
  else if (momentA < momentB) return -1
  else return 0
}

function stdDev (durationArray, meanDur) {
  arraySquares = 0
  for (let i = 0 ; i < durationArray.length ; i++){
    arraySquares += (durationArray[i] - meanDur)*(durationArray[i] - meanDur)
  }
  arraySquares = arraySquares/(durationArray.length - 1)
  let stdDeviation = Math.sqrt(arraySquares)

  return stdDeviation
}

function getMedian(durArray) {
  let median = 0
  if((durArray.length % 2) === 0){
    median = ((durArray[durArray.length / 2] + durArray[(durArray.length / 2) - 1])/2)
    return median
  }else{
    median = (durArray[((durArray.length-1) / 2)])
    return median
  }

}

