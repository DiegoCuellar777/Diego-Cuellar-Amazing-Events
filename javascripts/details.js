let urlParams = location.search //Se obtiene la ubicacion (location) de  la pagina despues del ?
let params = new URLSearchParams(urlParams)  // Se crea un nuevo objeto tipo SearchParams con la ubicacion como parametro, para usar el metodo get()
let eventName = params.get("name") // Se usa el metodo get() para obtener el nombre unico del evento

const events = data.eventos

let detailsEvent = events.find(event => event.name == eventName)

let $detailsDiv = document.getElementById("detailsDiv")

function printEvent(event){
    let details = ""
    details = `<img src="${event.image}" alt="event-image" class="descriptionImg">
    <div class="description">
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <p><span>Date:</span> ${event.date}</p>
        <p><span>Place:</span>${event.place}</p>
        <p><span>Capacity:</span>${event.capacity}</p>
        <p><span>Price:</span>${event.price}</p>
    </div>`

    $detailsDiv.innerHTML = details
}
console.log(eventName)

printEvent(detailsEvent)


