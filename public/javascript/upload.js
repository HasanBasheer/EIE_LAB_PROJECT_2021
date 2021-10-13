'use strict'

let complete = false;

async function updateData() {
    console.log('data function')
    const res = await fetch('/updateData', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //blank
            /*
            process_reference: '1',
            stroke_channel_num: '1',
            time_abs: '12',
            process_day: 12-02-2017,
            process_time: 10-10-10,
            process: 'deez',
            strike_point: '2',
            polarity: 'positive',
            visibility: 'clear',
            duration: 12
            */
        })
      }).catch((err) => console.log(err))
      const data = await res.json()
      complete = data.body
}