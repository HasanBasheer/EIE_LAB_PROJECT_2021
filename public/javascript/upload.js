'use strict'

async function updateData() {
    const res = await fetch('/updateData', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //Blank purpose
        })
    }).catch((err) => console.log(err))
    const data = await res.json()
    let updateDone = data.body
    if (updateDone === true) {
        alert('New data entries have been added')
    } else {
        alert('Update of database has failed. Please re-try file upload and try update again')
    }
}

async function uploadData() {
    const res = await fetch('/upload', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //Blank purpose
        })
    }).catch((err) => console.log(err))
    const data = await res.json()
    console.log(data.body)
}

async function deleteData() {

    var result = confirm('Are you sure you want to clear the database?')
    if(result){
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
    
        if(deleteData.body === true){
            alert('Database has been cleared successfully')
        }else{
            alert('Could not clear database')
        }
    }
}

async function changeOver(){
    window.location.href = '/homepage'
}

