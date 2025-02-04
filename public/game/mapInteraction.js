

let peopleNumber = 3;

window.addEventListener("resize", ()=>{
    updateDisplay(mapData);
});

peopleButton.onclick = () => {
    // change category to active
    peopleButton.classList.toggle('active');
    peopleList.classList.toggle('visible');

    // add the elements of the category according to the maps data
   
}

placesButton.onclick = () => {
    // change category to active
    placesButton.classList.toggle('active');
    placesList.classList.toggle('visible');
    // add the elements of the category according to the maps data
    //
}

function setPeopleList(parent, mapData, selectedXIndex, selectedYIndex){
    parent.innerHTML = "";  
    let people = mapData.peopleMap[selectedYIndex][selectedXIndex];
    console.log(people, selectedXIndex, selectedYIndex);
    if (people.length == 0) {
            addHuman(parent, null);
    }
    else {
        for (let i = 0; i < people.length; i++){
            addHuman(parent, people[i]);
        }
    }

}
addHuman = (parent, human) => {

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





