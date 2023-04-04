// function generarCard(evento){

//     return `<div class="card" style="width: 22rem;">
//     <img src="${evento.image}" class="card-img-top" alt="img-eventos">
//     <div class="card-body">
//         <h5 class="card-title">${evento.name}</h5>
//         <p class="card-text">${evento.description}</p>
//         <div class="prices"><span>Price: $${evento.price}</span><a href="../pages/details.html" class="btn btn-primary">See more</a></div>
//     </div>
//     </div>
//     `
// }

// function filtrarPasados(arregloEventos){

//     let pasados = []

//     for (const evento of arregloEventos) {
//         if(evento.date<data.fechaActual){
//             pasados.push(evento)
//         }
//     }
//     return pasados
// }

// const events = data.eventos
// const pastEvents = filtrarPasados(events)
// const cardsDiv= document.getElementById("div-cards")
// let template= ``


// for (const evento of pastEvents) {
//     template += generarCard(evento)
// }

// cardsDiv.innerHTML = template

//-----------------------------------------------------------------------------------------------------------------------------------

const cardsDiv= document.getElementById("div-cards")
const events = data.eventos
const pastEvents = filtrarPasados(events)

function filtrarPasados(arregloEventos) {
    let pasados = []

    for (const evento of arregloEventos) {
        if(evento.date<data.fechaActual){
            pasados.push(evento)
        }
    }
    return pasados
}

function crearNodoDiv(evento) {
    const card = document.createElement("div")
        card.className = "card"
        card.style = "width: 22rem;"

    const imgCard = document.createElement("img")
        imgCard.src= evento.image
        imgCard.className="card-img-top"
        imgCard.alt="img-eventos"

    card.appendChild(imgCard)
    
    const divCard = document.createElement("div")
        divCard.className="card-body"
    
    card.appendChild(divCard)

    const tituloCard = document.createElement("h5")
        tituloCard.className="card-title"
        tituloCard.textContent=evento.name

    const descripcionCard= document.createElement("p")
        descripcionCard.className="card-text"
        descripcionCard.textContent= evento.description

    const divPrecios = document.createElement("div")
        divPrecios.className = "prices"

    divCard.append(tituloCard, descripcionCard, divPrecios)

    const spanPrecios = document.createElement("span")
        spanPrecios.textContent= `Price: $${evento.price}`

    const aSeeMore = document.createElement("a")
        aSeeMore.href="../pages/details.html"
        aSeeMore.className="btn btn-primary"
        aSeeMore.textContent="See more"

    divPrecios.append(spanPrecios, aSeeMore)

    return card
}

function imprimirNodos(arregloEventos, elementoHTML){
    const fragment = document.createDocumentFragment()
    
    for (const evento of arregloEventos) {
        fragment.appendChild(crearNodoDiv(evento))
    }

    elementoHTML.appendChild(fragment)
}

imprimirNodos(pastEvents, cardsDiv)