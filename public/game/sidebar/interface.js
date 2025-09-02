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

let humanBtn = document.getElementById("btn-human");
let humanContent = document.querySelector(".human-content");

let buildingBtn = document.getElementById("btn-building");
let buildingContent = document.querySelector(".building-content");

let actionBtn = document.getElementById("btn-action");
let actionContent = document.querySelector(".action-content");

let historyBtn = document.getElementById("btn-log");
let historyContent = document.querySelector(".history-content");



homeBtn.onclick = function () {
    homeContent.classList.toggle("active");
    humanContent.classList.remove("active");
    buildingContent.classList.remove("active");
    actionContent.classList.remove("active");
    historyContent.classList.remove("active");
}

humanGenerationBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanContent.classList.toggle("active");
    buildingContent.classList.remove("active");
    actionContent.classList.remove("active");
    historyContent.classList.remove("active");
}

buildingBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanContent.classList.remove("active");
    buildingContent.classList.toggle("active");
    actionContent.classList.remove("active");
    historyContent.classList.remove("active");
}

actionBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanContent.classList.remove("active");
    buildingContent.classList.remove("active");
    actionContent.classList.toggle("active");
    historyContent.classList.remove("active");
}

historyBtn.onclick = function () {
    homeContent.classList.remove("active");
    humanContent.classList.remove("active");
    buildingContent.classList.remove("active");
    actionContent.classList.remove("active");
    historyContent.classList.toggle("active");
}





