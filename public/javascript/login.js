'use strict'

const email = document.getElementById('email')
const password = document.getElementById('password')

async function verifyLogin () {
  if (email.value === '') {
    alert('Please input email')
    return false
  } else if (password.value === '') {
    alert('Please input Password')
    return false
  } else if (email.value.length < 5) {
    alert('email needs to be atleast 5 characters')
    return false
  } else if (password.value.length < 8) {
    alert('Password needs to be atleast 8 characters')
    return false
  } else {
    const res = await fetch('/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username.value,
        password1: password.value
      })
    }).catch((err) => console.log(err))
    const data = await res.json()
    check = data.body
  }
}
