
//----------------------------------------------------------------
// Icons and content switching management
//----------------------------------------------------------------

let homeBtn = document.getElementById("btn-home");
let homeContent = document.querySelector(".home-content");

let mapGenerationBtn = document.getElementById("btn-map");
let mapGenerationContent = document.querySelector(".map-generation-content");

let humanGenerationBtn = document.getElementById("btn-human");
let humanGenerationContent = document.querySelector(".human-generation-content");



let simulationBtn = document.getElementById("btn-simulation");
let simulationContent = document.querySelector(".simulation-content");



homeBtn.onclick = function () {
    homeContent.classList.toggle("active");
    mapGenerationContent.classList.remove("active");
    humanGenerationContent.classList.remove("active");
    simulationContent.classList.remove("active");
}

mapGenerationBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanGenerationContent.classList.remove("active");
    simulationContent.classList.remove("active");
    mapGenerationContent.classList.toggle("active");
}

humanGenerationBtn.onclick = function () {
    homeContent.classList.remove("active");
    mapGenerationContent.classList.remove("active");
    simulationContent.classList.remove("active");
    humanGenerationContent.classList.toggle("active");
}

simulationBtn.onclick = function () {
    homeContent.classList.remove("active");
    mapGenerationContent.classList.remove("active");
    humanGenerationContent.classList.remove("active");
    simulationContent.classList.toggle("active");
}

//----------------------------------------------------------------
// Map Generation Content Management
//----------------------------------------------------------------

// limits for the sliders
const maxSize = 200;
const minSize = 5;
const maxArea = 60; 
const minArea = 10;

const MGCareaSlider = document.querySelector(".areaSlider");
const MGCsizeSlider = document.querySelector(".sizeSlider");
const MGCforestSlider = document.querySelector(".forestSlider");
const MGCseedTextbox = document.querySelector(".seedTextbox");
const MGCgenerateButton = document.querySelector(".generateButton");
const MGCgenerateRandomButton = document.querySelector(".generateRandomButton");


function setMap (){
    let sizePercent = MGCsizeSlider.value;
    let areaPercent = MGCareaSlider.value;
    let forestPercent = MGCforestSlider.value;


    let size = Math.round(minSize + sizePercent *(maxSize-minSize)/100);
    let area = Math.round((size*size)*(minArea + areaPercent *(maxArea-minArea)/100)/100);
    mapRandomizer = new SeededRandom(MGCseedTextbox.value);
    mapData = new Map(size, area, forestPercent);
    updateDisplay(mapData);
    
}


function setRandomMap (){
    MGCareaSlider.value = Math.random()*100;
    MGCsizeSlider.value = Math.random()*100;
    MGCseedTextbox.value = 10000+Math.floor(Math.random()*10000000);
    setMap();
}

MGCgenerateButton.onclick = setMap;
MGCgenerateRandomButton.onclick = setRandomMap;

//----------------------------------------------------------------
// Human Generation Content Management
//----------------------------------------------------------------

let HGCAddBtn = humanGenerationContent.querySelector(".addButton");
let HGCRemoveBtn = humanGenerationContent.querySelector(".removeButton");



function addHuman(){

    mapData.peopleMap[selectedYIndex][selectedXIndex].push(new Human(humanRandomizer));
    setPeopleList(peopleList, mapData, selectedXIndex, selectedYIndex);
    updateDisplay(mapData);
}

function removeHuman(){
    mapData.peopleMap[selectedYIndex][selectedXIndex].pop();
    setPeopleList(peopleList, mapData, selectedXIndex, selectedYIndex);
    updateDisplay(mapData);
}

HGCAddBtn.onclick = addHuman;
HGCRemoveBtn.onclick = removeHuman;