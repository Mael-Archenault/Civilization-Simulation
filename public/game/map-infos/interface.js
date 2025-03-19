this.peopleButton = document.querySelector('.peopleButton');
this.placesButton = document.querySelector('.placesButton');
this.peopleList = document.querySelector('.peopleList');
this.placesList = document.querySelector('.placesList');



setPeopleList = (mapData, selectedXIndex, selectedYIndex)=>{
    peopleList.innerHTML = "";  
    let people = mapData.peopleMap[selectedYIndex][selectedXIndex];
    console.log(people, selectedXIndex, selectedYIndex);
    if (people.length == 0) {
            addHumanCard(peopleList, null);
    }
    else {
        for (let i = 0; i < people.length; i++){
            addHumanCard(peopleList, people[i]);
        }
    }

}
addHumanCard = (parent, human) => {

    let listElement = document.createElement('li');
    if (human == null) {
        listElement.textContent = 'No Human in the area';
    }
    else {
        
        listElement.textContent = human.name;
    }
    listElement.classList.add('infoBox');
    parent.appendChild(listElement);
}


this.peopleButton.onclick = () => {
    // change category to active
    this.peopleButton.classList.toggle('active');
    this.peopleList.classList.toggle('visible');
    
}

this.placesButton.onclick = () => {
    // change category to active
    this.placesButton.classList.toggle('active');
    this.placesList.classList.toggle('visible');
}