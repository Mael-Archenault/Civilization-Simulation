const peopleButton = document.querySelector('.peopleButton');
const placesButton = document.querySelector('.placesButton');
const peopleList = document.querySelector('.peopleList');
const placesList = document.querySelector('.placesList');



setPeopleList = (mapData, selectedXIndex, selectedYIndex)=>{
    peopleList.innerHTML = "";  
    let people = mapData.peopleMap[selectedYIndex][selectedXIndex];
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
    let name = document.createElement('p');
    let deleteButton  = document.createElement("i")
    listElement.classList.add('infoBox');

    if (human == null) {

        // Displaying the lack of a human
        name.textContent = 'No Human in the area';
        listElement.appendChild(name);
    }
    else {
        
        // name
        name.textContent = human.name;
        listElement.appendChild(name);

        // delete button
        deleteButton.classList.add('bx', 'bx-x', 'btn-delete-human');
        listElement.appendChild(deleteButton);

        deleteButton.onclick = () => {
            human.delete();
            setPeopleList(simulation.display.map, simulation.display.target.pixelX, simulation.display.target.pixelY);
            simulation.display.updateDisplay()
        }

        name.onclick = () => {
            setCharacteristicsOnHumanPage(human)
            humanPage.classList.add('active');
        }


    }
    
    parent.appendChild(listElement);
}


peopleButton.onclick = () => {
    // change category to active
    peopleButton.classList.toggle('active');
    peopleList.classList.toggle('visible');
    
}

placesButton.onclick = () => {
    // change category to active
    placesButton.classList.toggle('active');
    placesList.classList.toggle('visible');
}

const humanPage = document.querySelector(".human-page");

const skillList = humanPage.querySelector(".skill-list");
const stateList = humanPage.querySelector(".state-list");
const goodList = humanPage.querySelector(".good-list");

const humanPageCloseBtn = document.getElementById("btn-close-human-page")

humanPageCloseBtn.onclick = () => {
    humanPage.classList.remove('active');
}


setCharacteristicsOnHumanPage = (human)=>{

    skillList.innerHTML = "";
    stateList.innerHTML = "";
    goodList.innerHTML = "";

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    humanPage.querySelector(".name").textContent = capitalizeFirstLetter(human.name);
    humanPage.querySelector(".age").textContent = human.age + " years old";
    humanPage.querySelector(".sex").textContent = capitalizeFirstLetter(human.sex);
    humanPage.querySelector(".height").textContent = human.height + " cm";
    humanPage.querySelector(".weight").textContent = human.weight + " kg";
    for (i =0; i<skills.length; i++){
        let skillElement = document.createElement("li");
        skillElement.textContent = capitalizeFirstLetter(skills[i]) + ": " + human[skills[i]];
        let progressBar = document.createElement("div");
        progressBar.style.width = human[skills[i]] + "%";
        progressBar.classList.add("progress-bar");
        skillElement.appendChild(progressBar);
        skillList.appendChild(skillElement);
    }

    for (i =0; i<states.length; i++){
        let stateElement = document.createElement("li");
        stateElement.textContent = capitalizeFirstLetter(states[i]) + ": " + human[states[i]];
        let progressBar = document.createElement("div");
        progressBar.style.width = human[states[i]] + "%";
        progressBar.classList.add("progress-bar");
        stateElement.appendChild(progressBar);
        stateList.appendChild(stateElement);
    }

    for (i =0; i<goods.length; i++){
        let goodElement = document.createElement("li");
        goodElement.textContent = capitalizeFirstLetter(goods[i]) + ": " + human[goods[i]];
        let progressBar = document.createElement("div");
        progressBar.style.width = human[goods[i]] + "%";
        progressBar.classList.add("progress-bar");
        goodElement.appendChild(progressBar);
        goodList.appendChild(goodElement);
    }

}

