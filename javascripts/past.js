import {getElement, printChecks, crossedFilter, filterPast, innerHTMLUpcomingAndPast} from "./functions.js"

const url = "https://mindhub-xj03.onrender.com/api/amazing"

const $checksDiv = getElement("checks")
const $search = getElement("search")
const cardsDiv= document.getElementById("div-cards")

fetch(url)
    .then(response => response.json())
    .then(data => {
        let events = data.events
        let current = data.currentDate
        let pastEvents = filterPast(events, current)
        let arrayCategories = [...new Set (events.map(event => event.category))]
        printChecks(arrayCategories, $checksDiv)
        innerHTMLUpcomingAndPast(pastEvents,cardsDiv)

        $checksDiv.addEventListener("change", () => {
            let selected = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(e => e.id)
            const filteredEvents = crossedFilter(pastEvents, selected, $search.value)
            innerHTMLUpcomingAndPast(filteredEvents, cardsDiv)
        })
        
        $search.addEventListener("keyup", () => {
            let selected = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(e => e.id)
            const filteredEvents = crossedFilter(pastEvents, selected, $search.value)
            innerHTMLUpcomingAndPast(filteredEvents, cardsDiv)
        })
    })
    .catch(err => console.log(err))   

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