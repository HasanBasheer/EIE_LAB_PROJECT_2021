$(document).ready(function () {
  console.log('homepage ready')
  $('#logout').click(function () {
    window.location.href = '/'
  })
  $('#clearFilter').click(function () {
    $('#resultsContainer').empty()
    $('#resultsContainer').append('<tr><td>' + 'Flash_ID' + '</td><td>' + 'Process Reference' + '</td><td>' + 'Number of Strokes in same Channel' + '</td>' +
    '<td>' + 'Date (YYYY-MM-DD)' + '</td>' + '<td>' + 'Time (HH:MM:SS)' + '</td>' + '<td>' + ' Time (ms)' + '</td>' +
    '<td>' + 'Process' + '</td>' + '<td>' + 'Strike Point' + '</td>' + '<td>' + 'Polarity' + '</td>' + '<td>' + 'Visibility' + '</td>' +
    '<td>' + 'Duration (ms)' + '</td>' +
    '</tr>')
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
        console.log(lightning)
        // alert(index + ': ' + value)
        $('#resultsContainer').append('<tr><td>' + lightning.flash_ID + '</td><td>' + lightning.process_reference + '</td><td>' + lightning.stroke_channel_num + '</td>' +
        '<td>' + new Date(lightning.process_day).toISOString().slice(0, 10) /* lightning.process_day */+ '</td>' + '<td>' + lightning.process_time + '</td>' + '<td>' + lightning.process_time_millisecond + '</span>' +
        '<td>' + lightning.process + '</td>' + '<td>' + lightning.strike_point + '</td>' + '<td>' + lightning.polarity + '</td>' + '<td>' + lightning.visibility + '</td>' +
        '<td>' + lightning.duration + '</td>' +
        '</tr>')
      })
    })
  })
})
