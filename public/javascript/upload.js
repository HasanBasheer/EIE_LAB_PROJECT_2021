'use strict'

/*
const fs = require('fs').promises
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

async function removeFile(fileName) {
    await unlinkAsync('./upload/' + fileName)
    return
}
*/

//var files = event.target.files
/*
function getExtension(filename) {
    var parts = filename.split('.')
    return parts[parts.length - 1]
}

function isExcel(filename) {
    var ext = getExtension(filename)
    if (ext.toLowerCase() === 'xlsx') {
        return true
    }
    return false
}
*/
function dragOverHandler(ev){
    console.log('File in drop zone')
    ev.preventDefault()
}

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
    let updateDone = data.body
    //console.log("upload.js part: " + updateDone)
    if (updateDone === true) {
        alert('New data entries have been added')
    } else {
        alert('Update of database has failed. Please re-try file upload and try update again')
    }
}

async function uploadData() {
    //let complete = true //action="/upload"
    //console.log('File im getting doc id = ' + getExtension(file))
    var file = document.getElementById('fileInput').files.item(0).name

    console.log("file check: " + isExcel(file))

    const res = await fetch('/upload', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //file_name: isExcel(file)
        })
    }).catch((err) => console.log(err))
    const data = await res.json()
    console.log(data.body)
}

if (complete === true) {
    alert('File has been uploaded successfully')
}

async function deleteData() {
    const res = await fetch('/updateData/purge', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //no send
        })
    }).catch((err) => console.log(err))
    const deleteData = await res.json()
    console.log(deleteData.body)

    if(deleteData.body === true)
    {
        alert('Database has been cleared successfully')
    }else{
        alert('Could not clear database')
    }
}

