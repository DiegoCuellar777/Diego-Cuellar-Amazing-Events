export function generateCard(event){

    return `<div class="card" style="width: 22rem;">
    <img src="${event.image}" class="card-img-top" alt="img-eventos">
    <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <div class="prices"><span>Price: $${event.price}</span><a href="./pages/details.html?name=${event.name}" class="btn btn-primary">See more</a></div>
    </div>
    </div>
    `
}

export function generateCardUpcomingAndPast(event){

    return `<div class="card" style="width: 22rem;">
    <img src="${event.image}" class="card-img-top" alt="img-eventos">
    <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <div class="prices"><span>Price: $${event.price}</span><a href="../pages/details.html?name=${event.name}" class="btn btn-primary">See more</a></div>
    </div>
    </div>
    `
}


export function getElement (id) {
    return document.getElementById(id)
}

export function innerHTML(array, container) {
    let template= ``

    for (const event of array) {
        template += generateCard(event)
    }
    if (template=="") {
        container.innerHTML = `<h2 class="no-events">There are no events with these characteristics</h2>`
    }else{
        container.innerHTML = template
    }
}

export function innerHTMLUpcomingAndPast(array, container) {
    let template= ``

    for (const event of array) {
        template += generateCardUpcomingAndPast(event)
    }
    if (template=="") {
        container.innerHTML = `<h2 class="no-events">There are no events with these characteristics</h2>`
    }else{
        container.innerHTML = template
    }
}

export function printChecks(checkList, container){
    let template=""
    for (const check of checkList) {
        template += `<input class="form-check-input" type="checkbox" value="${check}" id="${check}">
            <label class="form-check-label" for="food-fair">
            ${check}
            </label>`
    }
    container.innerHTML = template
}

export function filterByCategory(eventArray, categories) {

    if (categories.length == 0) {
        return eventArray
    }else{
        let filteredEvents = eventArray.filter(event => categories.includes(event.category))
        return filteredEvents;
    }
}

export function filterByText(eventArray, text) {
    return eventArray.filter( event => event.name.toLowerCase().includes(text.toLowerCase()) || event.description.toLowerCase().includes(text.toLowerCase()) )
}

export function crossedFilter(eventArray, categories, text) {
    let filteredByCategory = filterByCategory(eventArray, categories)
    let filteredByText = filterByText(filteredByCategory, text)

    return filteredByText    
}

export function filterFuture(arrayEvents, current){

    let future = []

    for (const event of arrayEvents) {
        if(event.date>current){
            future.push(event)
        }
    }
    return future
}

export function filterPast(arrayEvents, current){

    let past = []

    for (const event of arrayEvents) {
        if(event.date<current){
            past.push(event)
        }
    }
    return past
}

export function printEvent(event, container){
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

    container.innerHTML = details
}

export function renderTable1(highPEvent, lowPevent, largerCap, container) {

    let template = `<td>${highPEvent.name} ${(highPEvent.assistance/highPEvent.capacity * 100).toFixed(1)} %</td>
    <td>${lowPevent.name} ${lowPevent.assistance/lowPevent.capacity * 100} %</td>
    <td>${largerCap.name} ${largerCap.capacity} </td>`
    
    container.innerHTML = template
}

export function printRow(category){
        return `<tr>
            <td>${category.categoryName}</td>
            <td>${category.revenue}</td>
            <td>${category.average} %</td>
        </tr>`
}
    
export function renderTables(categoriesData, tbody) {
        let template = ""
    
        for (const category of categoriesData) {
            template += printRow(category)
        }
    
        tbody.innerHTML = template
}
    
    