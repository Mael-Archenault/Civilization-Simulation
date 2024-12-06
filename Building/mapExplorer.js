let peopleButton = document.querySelector('.peopleButton');
let placesButton = document.querySelector('.placesButton');
let peopleList = document.querySelector('.peopleList');
let placesList = document.querySelector('.placesList');


let peopleNumber = 3;

peopleButton.onclick = () => {
    // change category to active
    peopleButton.classList.toggle('active');
    peopleList.classList.toggle('visible');

    // add the elements of the category according to the maps data
    setPeopleList(peopleList, mapData, selectedXIndex, selectedYIndex);
}

placesButton.onclick = () => {
    // change category to active
    placesButton.classList.toggle('active');
    placesList.classList.toggle('visible');
    // add the elements of the category according to the maps data
    //
}

setPeopleList = (parent, mapData, selectedXIndex, selectedYIndex) => {
    parent.innerHTML = "";  
    let people = mapData.peopleMap[selectedYIndex][selectedXIndex];
    console.log(people);
    if (people.length == 0) {
            addHuman(parent, null);
    }
    else {
        for (let i = 0; i < people.length; i++){
            console.log(people[i].name);
            addHuman(parent, people[i]);
        }
    }

}
addHuman = (parent, human) => {

    let listElement = document.createElement('li');
    if (human == null) {
        listElement.textContent = 'No Human in the area';
        console.log("1");
    }
    else {
        console.log("2");
        listElement.textContent = human.name;
    }
    listElement.classList.add('infoBox');
    parent.appendChild(listElement);
}

setPeopleList(peopleList, mapData.peopleMap, selectedXIndex, selectedYIndex);



