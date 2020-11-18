
// document.getElementsByClassName("delete-button").addEventListener("click", event => {
//     console.log("click")
//     console.log(event.currentTarget.data)
//     // fetch("/quotes", {
//     //     method: 'delete',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({
//     //         name: event.currentTarget.data
//     //     })
//     // })
//     //     .then(res => {
//     //         if (res.ok) return res.json()
//     //     })
//     //     .then(data => {
//     //         window.location.reload()
//     //     })
// })


var elements = document.getElementsByClassName("delete-button");

var deleteFunction = function(event) {
    console.log("click")
    console.log(event)
    console.log(event.target.getAttribute("data-id"))
    //console.log(event.target.attributes.data)
    const theName = event.target.getAttribute("data-id");
    fetch("/quotes", {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: theName
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            window.location.reload()
        })
}

for(var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", deleteFunction, false)
}

