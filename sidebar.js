
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

