$(document).ready(function () {
  console.log('ready')
  $('#proceedToLoginBtn').click(function () {
    window.location.href = '/'
  })

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  const firstName = $('#firstName')
  const lastName = $('#lastName')
  const email = $('#email')
  const password = $('#password')

  $('#reg').click(function () {
    let valid = true
    valid = valid && checkLength(firstName, 'First Name', 2, 20)
    valid = valid && checkLength(lastName, 'Last Name', 2, 20)
    valid = valid && checkLength(email, 'Email', 6, 80)
    valid = valid && checkLength(password, 'Password', 5, 20)

    valid = valid && checkRegexp(email, emailRegex, 'eg. john@email.com')
    valid = valid && checkRegexp(password, /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/, 'Password requires one uppercase letter, one lowercase letter, one number and one special character')
    if (!valid) {
      return
    }
    const formData = {}
    $('#myRegistrationForm').find('div')
      .find('input')
      .each(function () {
        console.log($(this).val())
        formData[$(this).attr('id')] = $(this).val()
      })
    $.post('/user', formData)
      .fail(function (err) {
        console.log('Registration Failed')
        alert(err.responseJSON.message)
        throw err
      })
      .done(function () {
        console.log('Registration Succeeded')
        $('#proceedToLoginBtn').show()
      })
  })

  function checkLength (o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
      console.log('Field Length(s) Invalid')
      if (n == 'First Name' || n == 'Last Name') {
        alert('error: ' + n + ' must be between 2 and 20 characters')
      }
      if (n == 'Email') {
        alert('error: ' + n + ' must be between 6 and 80')
      }
      if (n == 'Password') {
        alert('error: ' + n + ' must be between 5 and 20')
      }
      return false
    } else {
      return true
    }
  }

  function checkRegexp (o, regexp, n) {
    if (!(regexp.test(o.val()))) {
      console.log('regex fail')
      if (o == email) {
        alert('error: Email must be a valid email format ' + n)
      } else {
        alert('error: Password requires one uppercase letter, one lowercase letter, one number and one special character')
      }
      return false
    } else {
      return true
    }
  }
})
