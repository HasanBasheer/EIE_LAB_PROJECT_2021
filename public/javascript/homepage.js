$(document).ready(function () {
  const resultsCount = $('#resultsContainer tr').length - 1
  $('#numResultsContainer').append('<label>Number of Results: ' + resultsCount + '</label>')
  console.log('homepage ready')
  $('#logout').click(function () {
    window.location.href = '/'
  })

  $('#minNumStrokeSlider').change(function () {
    const $this = $(this)
    if ($this.val() >= $('#maxNumStrokeSlider').val()) {
      $('#maxNumStrokeSlider').val($this.val())
      $('#maxNumStrokeBox').val($this.val())
    }
  })
  $('#maxNumStrokeSlider').change(function () {
    const $this = $(this)
    if ($this.val() <= $('#minNumStrokeSlider').val()) {
      $('#minNumStrokeSlider').val($this.val())
      $('#minNumStrokeBox').val($this.val())
    }
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
    $('#resultsContainer').empty()
    $('#resultsContainer').append('<tr><td>' + '<b>Flash_ID</b>' + '</td><td>' + '<b>Process Reference</b>' + '</td><td>' + '<b>Number of Strokes in same Channel</b>' + '</td>' +
    '<td>' + '<b>Date (YYYY-MM-DD)</b>' + '</td><td>' + '<b>Time (HH:MM:SS)</b>' + '</td><td>' + '<b>Time (ms)</b>' + '</td><td>' + '<b>Process</b>' + '</td><td>' + '<b>Strike Point</b>' +
    '</td><td>' + '<b>Polarity</b>' + '</td><td>' + '<b>Visibility</b>' + '</td><td>' + '<b>Duration (ms)</b>' + '</td>' +
    '</tr>')
    $('#numResultsContainer').empty()
    const resultsCount = $('#resultsContainer tr').length - 1
    $('#numResultsContainer').append('<label>Number of Results: ' + resultsCount + '</label>')
    $('#numResultsContainer').append('<h2>Results Table</h2>')
  })
  $('#filterButton').click(function () {
    const formData = {}
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
      $.each(data, function (index, lightning) {
        // console.log(lightning)
        // alert(index + ': ' + value)
        $('#resultsContainer').append('<tr><td>' + lightning.flash_ID + '</td><td>' + lightning.process_reference + '</td><td>' + lightning.stroke_channel_num + '</td>' +
        '<td>' + new Date(lightning.process_day).toISOString().slice(0, 10) /* lightning.process_day */+ '</td>' + '<td>' + lightning.process_time + '</td>' + '<td>' + lightning.process_time_millisecond + '</span>' +
        '<td>' + lightning.process + '</td>' + '<td>' + lightning.strike_point + '</td>' + '<td>' + lightning.polarity + '</td>' + '<td>' + lightning.visibility + '</td>' +
        '<td>' + lightning.duration + '</td>' +
        '</tr>')
      })
      $('#numResultsContainer').empty()
      const resultsCount = $('#resultsContainer tr').length - 1
      $('#numResultsContainer').append('<h2>Results Table</h2>')
      $('#numResultsContainer').append('<label>Number of Results: ' + resultsCount + '</label>')
    })
  })
})
