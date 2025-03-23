const humanCharacteristicsPanel = document.querySelector(".human-characteristics-panel");
const advancedCharacteristicsPanel = document.querySelector(".advanced-characteristics");



const close_button = document.getElementById("btn-close-characteristics");
const open_button = document.querySelector(".addHumanButton");
const apply_button = document.querySelector(".applyButton");

const humanGenerationBtn = document.getElementById("btn-human");
const humanGenerationContent = document.querySelector(".human-generation-content");

const HGCAddBtn = humanGenerationContent.querySelector(".addRandomHumanButton");




open_button.addEventListener('click', () => {
    humanCharacteristicsPanel.classList.add("active");
});
close_button.addEventListener('click', () => {
    humanCharacteristicsPanel.classList.remove("active");
});

apply_button.addEventListener('click', () => {
    addHuman(display, createHumanFromCharacteristics(getCharacteristics()));
    humanCharacteristicsPanel.classList.remove("active");
});


setAdvancedCharacteristicsList = (skillsPossibilities, statesPossibilities)=>{
    const skillList = document.createElement("ul");
    const stateList = document.createElement("ul");

    // Titles

    const skillsTitle = document.createElement('h2');
    skillsTitle.textContent = "Skills";
    skillsTitle.classList.add('advanced-characteristics-title');
    skillList.appendChild(skillsTitle);

    const statesTitle = document.createElement('h2');
    statesTitle.textContent = "States";
    statesTitle.classList.add('advanced-characteristics-title');
    stateList.appendChild(statesTitle);

    // Skills and States

    for (let i = 0; i < skillsPossibilities.length; i ++ ) {
        const skillElement = document.createElement('li');
        skillElement.classList.add('skill');
        const name = document.createElement('p');
        name.textContent = skillsPossibilities[i];
        const value = document.createElement('input');
        value.type = "number";
        value.min = 0;
        value.max = 100;
        value.value = 0;
        skillElement.appendChild(name);
        skillElement.appendChild(value);
        skillList.appendChild(skillElement);
        advancedCharacteristicsPanel.appendChild(skillList);
    }



    for (let i = 0; i < statesPossibilities.length; i ++ ) {
        const stateElement = document.createElement('li');
        stateElement.classList.add('state');
        const name = document.createElement('p');
        name.textContent = statesPossibilities[i];
        const value = document.createElement('input');
        value.type = "number";
        value.min = 0;
        value.max = 100;
        value.value = 100;
        stateElement.appendChild(name);
        stateElement.appendChild(value);
        stateList.appendChild(stateElement);
        advancedCharacteristicsPanel.appendChild(stateList);
    }   
}

getCharacteristics = ()=>{
    res = {}
    res["name"] = document.getElementById("name").value;
    res["gender"] = document.getElementById("gender").value;
    res["age"] = parseInt(document.getElementById("age").value);
    res["weight"] = document.getElementById("weight").value;
    res["height"] = document.getElementById("height").value;


    let skillList = document.querySelectorAll(".skill")
    for (let i = 0; i < skillList.length; i++) {
        skill = skillList[i];
        res[skill.querySelector("p").textContent] = parseInt(skill.querySelector("input").value);
    }

    let stateList = document.querySelectorAll(".state")
    for (let i = 0; i < stateList.length; i++) {
        state = stateList[i];
        res[state.querySelector("p").textContent] = parseInt(state.querySelector("input").value);
    }
    return res;
}

setAdvancedCharacteristicsList(skills, states);




HGCAddBtn.onclick = ()=>{addRandomHuman(display)};