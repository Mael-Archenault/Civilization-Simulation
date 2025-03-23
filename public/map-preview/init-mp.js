





let offscreenCanvas = document.createElement("canvas");
let tileCanvas = document.querySelector(".tileCanvas");
let gridCanvas = document.querySelector(".gridCanvas");
let infoCanvas = document.querySelector(".infoCanvas");


offscreenCanvas.setAttribute("width", window.innerWidth); offscreenCanvas.setAttribute("height", window.innerHeight);
tileCanvas.setAttribute("width", window.innerWidth); tileCanvas.setAttribute("height", window.innerHeight);
gridCanvas.setAttribute("width", window.innerWidth); gridCanvas.setAttribute("height", window.innerHeight);
infoCanvas.setAttribute("width", window.innerWidth); infoCanvas.setAttribute("height", window.innerHeight);

let tileCtx = tileCanvas.getContext('2d');
let offscreenCtx = offscreenCanvas.getContext('2d');
let gridCtx = gridCanvas.getContext('2d');
let infoCtx = infoCanvas.getContext('2d');



let mapData = new Map(110, 110*110*0.45, 50, randomizerManager.mapRandomizer);
let mapDisplayManager = new MapDisplayManager;
updateDisplay(mapData);
setMap();













