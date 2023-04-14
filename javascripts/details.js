import { printEvent } from "./functions.js"

let eventName = new URLSearchParams(location.search).get("name")

const url = "https://mindhub-xj03.onrender.com/api/amazing"

let $detailsDiv = document.getElementById("detailsDiv")

fetch(url)
    .then(response => response.json())
    .then(data => {
        let events = data.events
        let detailsEvent = events.find(event => event.name == eventName)
        printEvent(detailsEvent, $detailsDiv)
    })
    .catch(err => console.log(err))   