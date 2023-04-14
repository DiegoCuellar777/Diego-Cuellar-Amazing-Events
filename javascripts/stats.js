import { filterPast, filterFuture, getElement, renderTable1, renderTables} from "./functions.js";

const url = "https://mindhub-xj03.onrender.com/api/amazing"
const $trBody1 = getElement("bodyTable1")
const $tBody2 = getElement("tBody2")
const $tBody3 = getElement("tBody3")

fetch(url)
    .then(response => response.json())
    .then(data => {
        let events = data.events
        let current = data.currentDate
        let pastEvents = filterPast(events, current)
        let futureEvents = filterFuture(events, current)

        let attendancePercentages = pastEvents.map(event=> event.assistance / event.capacity).sort((a,b)=> b-a)
        let highestPercentageAttendance = pastEvents.find(event=> event.assistance / event.capacity === attendancePercentages[0])
        let lowestPercentageAttendance = pastEvents.find(event=> event.assistance / event.capacity === attendancePercentages[attendancePercentages.length-1])
        let capacities = events.map(event => event.capacity).sort((a,b)=>b-a)
        let largerCapacity = events.find(event=> event.capacity == capacities[0])
        
        renderTable1(highestPercentageAttendance,lowestPercentageAttendance, largerCapacity ,$trBody1)

        let categoriesPast = [...new Set (pastEvents.map(event => event.category))]
        console.log(categoriesPast);
        let categoriesFuture = [...new Set (futureEvents.map(event => event.category))]
        console.log(categoriesFuture);

        let futureEventsByCategory = []
        categoriesFuture.forEach(category => {
            futureEventsByCategory.push(futureEvents.filter(event=> event.category == category)) 
        }) // Se crea un arreglo con los eventos futuros filtrados por categoria.
        console.log(futureEventsByCategory);


        let pastEventsByCategory = []
        categoriesPast.forEach(category=>{
            pastEventsByCategory.push(pastEvents.filter((event=> event.category == category)))
        }) // Se crea un arreglo con los eventos pasados filtrados por categoria.
        console.log(pastEventsByCategory);

        let upcomingCategoriesData = []

        for (const category of futureEventsByCategory) {
            
            let revenue = category.reduce((acu, act) => acu + act.price*act.estimate, 0)
            let percentageAttendanceSum = category.reduce((acu,act)=> acu + (act.estimate / act.capacity),0 )
            let averagePercentage = percentageAttendanceSum/category.length
        
            let categoryData = { 
                "categoryName": category[0].category,  
                "revenue": revenue,
                "average": (averagePercentage*100).toFixed(2)
            }

            upcomingCategoriesData.push(categoryData)
        }

        console.log(upcomingCategoriesData);

        let pastCategoriesData = []

        for (const category of pastEventsByCategory) {
            
            let revenue = category.reduce((acu, act) => acu + act.price*act.assistance, 0)
            let percentageAttendanceSum = category.reduce((acu,act)=> acu + (act.assistance / act.capacity),0 )
            let averagePercentage = percentageAttendanceSum/category.length
        
            let categoryData = { 
                "categoryName": category[0].category,  
                "revenue": revenue,
                "average": (averagePercentage*100).toFixed(2)
            }

            pastCategoriesData.push(categoryData)
        }

        console.log(pastCategoriesData);

        renderTables(upcomingCategoriesData, $tBody2)
        renderTables(pastCategoriesData, $tBody3)
    })
    .catch(err => console.log(err))   

