import {getElement, printChecks, crossedFilter, filterFuture, innerHTMLUpcomingAndPast} from "./functions.js"

const url = "https://mindhub-xj03.onrender.com/api/amazing"

const $checksDiv = getElement("checks")
const $search = getElement("search")
const cardsDiv= document.getElementById("div-cards")

fetch(url)
    .then(response => response.json())
    .then(data => {
        let events = data.events
        let current = data.currentDate
        let upcomingEvents = filterFuture(events, current)
        let arrayCategories =  [... new Set (events.map(event => event.category))]
        printChecks(arrayCategories, $checksDiv)
        innerHTMLUpcomingAndPast(upcomingEvents,cardsDiv)

        $checksDiv.addEventListener("change", () => {
            let selected = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(e => e.id)
            const filteredEvents = crossedFilter(upcomingEvents, selected, $search.value)
            innerHTMLUpcomingAndPast(filteredEvents, cardsDiv)
        })
        
        $search.addEventListener("keyup", () => {
            let selected = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(e => e.id)
            const filteredEvents = crossedFilter(upcomingEvents, selected, $search.value)
            innerHTMLUpcomingAndPast(filteredEvents, cardsDiv)
        })
    })
    .catch(err => console.log(err))  
//-----------------------------------------------------------------------------------------------------------------------------------

// const cardsDiv= document.getElementById("div-cards")
// const events = data.eventos
// const futureEvents = filtrarFuturos(events)

// function filtrarFuturos(arregloEventos) {
//     let futuros = []

//     for (const evento of arregloEventos) {
//         if(evento.date>data.fechaActual){
//             futuros.push(evento)
//         }
//     }
//     return futuros
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

// imprimirNodos(futureEvents, cardsDiv)