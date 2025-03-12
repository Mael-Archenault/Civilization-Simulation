let close_button = document.getElementById("btn-close-characteristics");
let open_button = document.querySelector(".addHumanButton");
let humanCharacteristicsPanel = document.querySelector(".human-characteristics-panel");


open_button.addEventListener('click', () => {
    humanCharacteristicsPanel.classList.add("active");
});
close_button.addEventListener('click', () => {
    humanCharacteristicsPanel.classList.remove("active");
});



let advancedCharacteristicsPanel = document.querySelector(".advanced-characteristics");

let skillList = document.createElement("ul");
let stateList = document.createElement("ul");
for (let i = 0; i < skills.length; i ++ ) {
    let skillElement = document.createElement('li');
    skillElement.classList.add('skill');
    let name = document.createElement('p');
    name.textContent = skills[i];
    let value = document.createElement('input');
    value.type = "number";
    value.min = 0;
    value.max = 100;
    value.value = 0;
    skillElement.appendChild(name);
    skillElement.appendChild(value);
    skillList.appendChild(skillElement);
    advancedCharacteristicsPanel.appendChild(skillList);
}