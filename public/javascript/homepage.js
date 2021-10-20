$(document).ready(function () {
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
  $('#filterButton').click(function () {
    const formData = {}

    // if (($('#minDate').val() === '') || ($('#maxDate').val() === '')) {
    //   if (($('#minDate') === '') && ($('#maxDate') === '')) {
    //     // do nothing
    //     exit
    //   } else {
    //     alert('Please fill in both maximum and minimum range values for the date')
    //     return
    //   }
    // }

    // if (($('#minMsTimeBox').val() === '') || ($('#maxMsTimeBox').val() === '')) {
    //   if (($('#minMsTimeBox') === '') && ($('#maxMsTimeBox') === '')) {
    //     // do nothing
    //     exit
    //   } else {
    //     alert('Please fill in both maximum and minimum range values for the millisecond')
    //     return
    //   }
    // }

    // if (($('#minstrikepointbox').val() === '') || ($('#maxstrikepointbox').val() === '')) {
    //   if (($('#minstrikepointbox') === '') && ($('#maxstrikepointbox') === '')) {
    //     // do nothing
    //   } else {
    //     alert('Please fill in both maximum and minimum range values for the strike points')
    //     return
    //   }
    // }

    // if (($('#mindurationbox').val() === '') || ($('#maxdurationbox').val() === '')) {
    //   if (($('#mindurationbox') === '') && ($('#maxdurationbox') === '')) {
    //     // do nothing
    //   } else {
    //     alert('Please fill in both maximum and minimum range values for the duration')
    //     return
    //   }
    // }

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
    $.post('/createQuery', formData, function (data, status, jqXHR) { // success callback
      console.log('status: ' + status + ', data: ' + data)
      // $('#resultsContainer').empty()
      console.log('BE stuff' + data.length)
      let durationTotal = 0
      $.each(data, function (index, lightning) {
        // console.log(lightning)
        // alert(index + ': ' + value)
        $('#resultsContainer').append('<tr>><td>' + lightning.process_reference + '</td><td>' + lightning.stroke_channel_num + '</td>' +
        '<td>' + new Date(lightning.process_day).toISOString().slice(0, 10) /* lightning.process_day */+ '</td>' + '<td>' + lightning.process_time + '</td>' + '<td>' + lightning.process_time_millisecond + '</span>' +
        '<td>' + lightning.process + '</td>' + '<td>' + lightning.strike_point + '</td>' + '<td>' + lightning.polarity + '</td>' + '<td>' + lightning.visibility + '</td>' +
        '<td>' + lightning.duration + '</ td>' +
        '</tr>')
        durationTotal += Number(lightning.duration)
      })
      console.log(durationTotal)
      $('#numResultsContainer').empty()
      const resultsCount = $('#resultsContainer tr').length - 1
      $('#numResultsContainer').append('<h2>Results Table</h2>')
      $('#numResultsContainer').append('<label><b>Number of Results: </b>' + resultsCount + '</label><br/>' +
      '<label><b>Average Duration: </b>' + ((resultsCount === 0) ? 0 : (durationTotal / resultsCount)) + '</label')
      $('#numResultsContainer').append('')
    })
  })
})
