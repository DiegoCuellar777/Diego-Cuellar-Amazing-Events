const events = data.eventos
const pastEvents = filterPast(events)
const $checksDiv = getElement("checks")
const $search = getElement("search")
const cardsDiv= document.getElementById("div-cards")

const categories = events.map(event => event.category)
const setCategories = new Set (categories)
const arrayCategories = Array.from(setCategories)

printChecks(arrayCategories, $checksDiv)
innerHTML(pastEvents,cardsDiv)

let selected = []

$checksDiv.addEventListener("change", () => {
    selected = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(e => e.id)
    const filteredEvents = crossedFilter(pastEvents, selected, $search.value)
    innerHTML(filteredEvents, cardsDiv)
})

$search.addEventListener("keyup", () => {
    selected = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(e => e.id)
    const filteredEvents = crossedFilter(pastEvents, selected, $search.value)
    innerHTML(filteredEvents, cardsDiv)
})

function generateCard(event){

    return `<div class="card" style="width: 22rem;">
    <img src="${event.image}" class="card-img-top" alt="img-eventos">
    <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <div class="prices"><span>Price: $${event.price}</span><a href="../pages/details.html" class="btn btn-primary">See more</a></div>
    </div>
    </div>
    `
}

function filterPast(arrayEvents){

    let past = []

    for (const evento of arrayEvents) {
        if(evento.date<data.fechaActual){
            past.push(evento)
        }
    }
    return past
}

function getElement (id) {
    return document.getElementById(id)
}

function innerHTML(array, container) {
    let template= ``

    for (const evento of array) {
        template += generateCard(evento)
    }
    if (template=="") {
        container.innerHTML = `<h2 class="no-events">There are no events with these characteristics</h2>`
    }else{
        container.innerHTML = template
    }
}

function printChecks(checkList, container){
    template=""
    for (const check of checkList) {
        template += `<input class="form-check-input" type="checkbox" value="${check}" id="${check}">
            <label class="form-check-label" for="food-fair">
            ${check}
            </label>`
    }
    container.innerHTML = template
}

function filterByCategory(eventArray, categories) {

    if (categories.length == 0) {
        return eventArray
    }else{
        let filteredEvents = eventArray.filter(event => categories.includes(event.category))
        return filteredEvents;
    }
}

function filterByText(eventArray, text) {
    return eventArray.filter( event => event.name.toLowerCase().includes(text.toLowerCase()) || event.description.toLowerCase().includes(text.toLowerCase()) )
}

function crossedFilter(eventArray, categories, text) {
    let filteredByCategory = filterByCategory(eventArray, categories)
    let filteredByText = filterByText(filteredByCategory, text)

    return filteredByText    
}
//-----------------------------------------------------------------------------------------------------------------------------------

// const cardsDiv= document.getElementById("div-cards")
// const events = data.eventos
// const pastEvents = filtrarPasados(events)

// function filtrarPasados(arregloEventos) {
//     let pasados = []

//     for (const evento of arregloEventos) {
//         if(evento.date<data.fechaActual){
//             pasados.push(evento)
//         }
//     }
//     return pasados
// }

// function crearNodoDiv(evento) {
//     const card = document.createElement("div")
//         card.className = "card"
//         card.style = "width: 22rem;"

//     const imgCard = document.createElement("img")
//         imgCard.src= evento.image
//         imgCard.className="card-img-top"
//         imgCard.alt="img-eventos"

//     card.appendChild(imgCard)
    
//     const divCard = document.createElement("div")
//         divCard.className="card-body"
    
//     card.appendChild(divCard)

//     const tituloCard = document.createElement("h5")
//         tituloCard.className="card-title"
//         tituloCard.textContent=evento.name

//     const descripcionCard= document.createElement("p")
//         descripcionCard.className="card-text"
//         descripcionCard.textContent= evento.description

//     const divPrecios = document.createElement("div")
//         divPrecios.className = "prices"

//     divCard.append(tituloCard, descripcionCard, divPrecios)

//     const spanPrecios = document.createElement("span")
//         spanPrecios.textContent= `Price: $${evento.price}`

//     const aSeeMore = document.createElement("a")
//         aSeeMore.href="../pages/details.html"
//         aSeeMore.className="btn btn-primary"
//         aSeeMore.textContent="See more"

//     divPrecios.append(spanPrecios, aSeeMore)

//     return card
// }

// function imprimirNodos(arregloEventos, elementoHTML){
//     const fragment = document.createDocumentFragment()
    
//     for (const evento of arregloEventos) {
//         fragment.appendChild(crearNodoDiv(evento))
//     }

//     elementoHTML.appendChild(fragment)
// }

// imprimirNodos(pastEvents, cardsDiv)