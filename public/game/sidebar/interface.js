// limits for the sliders
const maxSize = 100;
const minSize = 5;
const maxArea = 60; 
const minArea = 10;


//----------------------------------------------------------------
// Icons and content switching management
//----------------------------------------------------------------

let homeBtn = document.getElementById("btn-home");
let homeContent = document.querySelector(".home-content");

let buildingBtn = document.getElementById("btn-building");
let buildingContent = document.querySelector(".building-content");

let simulationBtn = document.getElementById("btn-simulation");
let simulationContent = document.querySelector(".simulation-content");

let actionBtn = document.getElementById("btn-action");
let actionContent = document.querySelector(".action-content");

let historyBtn = document.getElementById("btn-log");
let historyContent = document.querySelector(".history-content");



homeBtn.onclick = function () {
    homeContent.classList.toggle("active");
    humanGenerationContent.classList.remove("active");
    buildingContent.classList.remove("active");
    simulationContent.classList.remove("active");
    actionContent.classList.remove("active");
    historyContent.classList.remove("active");
}

humanGenerationBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanGenerationContent.classList.toggle("active");
    buildingContent.classList.remove("active");
    simulationContent.classList.remove("active");
    actionContent.classList.remove("active");
    historyContent.classList.remove("active");
}

buildingBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanGenerationContent.classList.remove("active");
    buildingContent.classList.toggle("active");
    simulationContent.classList.remove("active");
    actionContent.classList.remove("active");
    historyContent.classList.remove("active");
}

simulationBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanGenerationContent.classList.remove("active");
    buildingContent.classList.remove("active");
    simulationContent.classList.toggle("active");
    actionContent.classList.remove("active");
    historyContent.classList.remove("active");
}

actionBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanGenerationContent.classList.remove("active");
    buildingContent.classList.remove("active");
    simulationContent.classList.remove("active");
    actionContent.classList.toggle("active");
    historyContent.classList.remove("active");
}

historyBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanGenerationContent.classList.remove("active");
    buildingContent.classList.remove("active");
    simulationContent.classList.remove("active");
    actionContent.classList.remove("active");
    historyContent.classList.toggle("active");
}





