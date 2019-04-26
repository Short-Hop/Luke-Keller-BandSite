const showsURL = 'https://project-1-api.herokuapp.com/showdates?api_key=21df5013-1198-4f21-8162-6676ccbfaffc';

allShows = []

function getAPIShows() {
    axios.get(showsURL).then(response => {
        console.log(response);
        response.data.forEach(function (show) {
            allShows.unshift(makeShow(show.date, show.location, show.place))
        })
        console.log(allShows);
        printShows();
    })
}

function printShows() {
    allShows.forEach(displayShow);
}

getAPIShows();

function displayShow(showObject) {
    let table = document.querySelector('tbody');

    let tableRow = document.createElement('tr')
    let dividerRow = document.createElement('tr')

    let labelContainer1 = document.createElement('td');
    labelContainer1.classList.add('main__text--label');
    let labelContainer2 = document.createElement('td');
    labelContainer2.classList.add('main__text--label');
    let labelContainer3 = document.createElement('td');
    labelContainer3.classList.add('main__text--label');
    
    let infoContainer1 = document.createElement('td');
    let infoContainer2 = document.createElement('td');
    let infoContainer3 = document.createElement('td');

    let buttonContainer = document.createElement('td')
    buttonContainer.classList.add('main__table--button');

    let dateHeader = document.createElement('h5')
    dateHeader.innerHTML = 'DATE';
    let venueHeader = document.createElement('h5')
    venueHeader.innerHTML ='VENUE';
    let locationHeader = document.createElement('h5')
    locationHeader.innerHTML = 'LOCATION';

    let showDate = document.createElement('h2');
    showDate.classList.add('main__text--date');
    showDate.innerHTML = showObject.date;

    let showPlace = document.createElement('h4');
    showPlace.classList.add('main__text--info');
    showPlace.innerHTML = showObject.place;

    let showLocation = document.createElement('h4');
    showLocation.classList.add('main__text--info');
    showLocation.innerHTML = showObject.location;

    let showButton = document.createElement('button')
    showButton.innerHTML = 'BUY TICKETS';
    showButton.classList.add('main__button--cta');

    let divContainer = document.createElement('td');
    divContainer.setAttribute('colspan', '4')

    let showDivider = document.createElement('div')
    showDivider.classList.add('main__divider')
    
    labelContainer1.appendChild(dateHeader)
    tableRow.appendChild(labelContainer1);

    infoContainer1.appendChild(showDate);
    tableRow.appendChild(infoContainer1);

    labelContainer2.appendChild(venueHeader);
    tableRow.appendChild(labelContainer2);

    infoContainer2.appendChild(showPlace)
    tableRow.appendChild(infoContainer2);

    labelContainer3.appendChild(locationHeader)
    tableRow.appendChild(labelContainer3);

    infoContainer3.appendChild(showLocation)
    tableRow.appendChild(infoContainer3);

    buttonContainer.appendChild(showButton)
    tableRow.appendChild(buttonContainer);

    divContainer.appendChild(showDivider);
    dividerRow.appendChild(divContainer)

    table.appendChild(tableRow);
    table.appendChild(dividerRow);
}

function makeShow(date1, location1, place1) {
    let show = {
        date: date1,
        location: location1,
        place: place1,
    }
    return show;
}

