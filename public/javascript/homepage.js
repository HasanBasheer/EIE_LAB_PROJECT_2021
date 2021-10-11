'use strict'

let complete = false;

async function updateData() {
    const res = await fetch('/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //blank
        })
      }).catch((err) => console.log(err))
      const data = await res.json()
      complete = data.body
}