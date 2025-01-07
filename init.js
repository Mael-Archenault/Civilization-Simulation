

// limits for the sliders
const maxSize = 200;
const minSize = 5;
const maxArea = 60; 
const minArea = 10;



let offscreenCanvas = document.createElement("canvas");
let tileCanvas = document.querySelector(".tileCanvas");
let gridCanvas = document.querySelector(".gridCanvas");
let infoCanvas = document.querySelector(".infoCanvas");

let tileCursor = document.querySelector(".tileCursor");

offscreenCanvas.setAttribute("width", window.innerWidth); offscreenCanvas.setAttribute("height", window.innerHeight);
tileCanvas.setAttribute("width", window.innerWidth); tileCanvas.setAttribute("height", window.innerHeight);
gridCanvas.setAttribute("width", window.innerWidth); gridCanvas.setAttribute("height", window.innerHeight);
infoCanvas.setAttribute("width", window.innerWidth); infoCanvas.setAttribute("height", window.innerHeight);

let tileCtx = tileCanvas.getContext('2d');
let offscreenCtx = offscreenCanvas.getContext('2d');
let gridCtx = gridCanvas.getContext('2d');
let infoCtx = infoCanvas.getContext('2d');

let peopleButton = document.querySelector('.peopleButton');
let placesButton = document.querySelector('.placesButton');
let peopleList = document.querySelector('.peopleList');
let placesList = document.querySelector('.placesList');



let lighterTileX = 0;
let lighterTileY = 0;

let previousTileColor = "rgb(0,0,0)";
let currentLighterTileColor = "rgb(0,0,0)";

let selectedXIndex = 0;
let selectedYIndex = 0;



let mapData = new Map();
let mapDisplayManager = new MapDisplayManager;
let infoBox = new InfoBox(mapDisplayManager);
mapDisplayManager.setInfoBoxReference(infoBox);


setRandomMap();
updateDisplay(mapData);






