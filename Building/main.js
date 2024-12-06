// Code by Keway

//----------------------------------------------------------------
// Initializations of elements variables
//----------------------------------------------------------------
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





//----------------------------------------------------------------
// Class variables
//----------------------------------------------------------------
class OriginCursor {
    constructor(){
        this.initialX = 500;
        this.initialY = 100;
        
        this.scaleFactor = 4; // represents the zoom

        this.MAX_SCALE_FACTOR = 100;
        this.MIN_SCALE_FACTOR = 0.1;
        this.centerX = Math.round(window.innerWidth/2);
        this.centerY = Math.round(window.innerHeight/2);

        this.x = (this.initialX -this.centerX)*this.scaleFactor + this.centerX; // scaled version of initialX
        this.y = (this.initialY - this.centerY)*this.scaleFactor + this.centerY;// scaled version of initialY

        this.initialGridStep = 5; // the number of pixels between grid lines
        this.scaledGridStep = this.initialGridStep; // scaled version of initialGridStep

        this.mouseX = 0;
        this.mouseY = 0;
    }
    updatePosition(move) { // Update the position of the origin according to the mouse movement
        this.x += move[0];
        this.y += move[1];
        this.initialX = (this.x -this.centerX)/this.scaleFactor + this.centerX;
        this.initialY = (this.y - this.centerY)/this.scaleFactor + this.centerY;
        infoBox.updateTargetPosition(move);
        displayAll(); 
    }
    handleZoom = (event)=>{    
        
        if (!isNaN(event.wheelDeltaY)&& onCanvas) {
            var delta = event.deltaY;
            // change the zoom according to the mouse wheel
            if (delta < 0){
                if(this.scaleFactor >this.MIN_SCALE_FACTOR){
                    this.scaleFactor -= 0.03*this.scaleFactor;
                }
                else {
                    this.scaleFactor =this.MIN_SCALE_FACTOR;
                }
            }
            else if (delta > 0){
                if(this.scaleFactor <this.MAX_SCALE_FACTOR){
                    this.scaleFactor += 0.03*this.scaleFactor;
                }
                else {
                    this.scaleFactor = this.MAX_SCALE_FACTOR;
                }
            }

            // updating every "scaled version" variables
            this.scaledGridStep = this.initialGridStep*this.scaleFactor;
            this.x = (this.initialX -this.centerX)*this.scaleFactor + this.centerX;
            this.y = (this.initialY - this.centerY)*this.scaleFactor + this.centerY;

            //updating the scaled version tile linked with infobox

            infoBox.targetX = (infoBox.initialX -this.centerX)*this.scaleFactor + this.centerX;
            infoBox.targetY = (infoBox.initialY - this.centerY)*this.scaleFactor + this.centerY;



            
        }

        displayAll(); // updating the canvas
    }
    displayGrid(){

        tileCtx.fillStyle = 'red';
        tileCtx.fillRect(this.x, this.y, originCursor.scaledGridStep, originCursor.scaledGridStep);
            
        // gridCtx.globalAlpha = (this.scaleFactor - 0.1) / 9.9;
        // gridCtx.strokeStyle = 'black';
        // gridCtx.lineWidth = 2;
        // for (let i = this.x % this.scaledGridStep; i < window.innerWidth; i += this.scaledGridStep) {

        //     gridCtx.beginPath();
        //     gridCtx.moveTo(i, 0);
        //     gridCtx.lineTo(i, window.innerHeight);

        //     // Draw the line
        //     gridCtx.stroke();
        // }
        // for (let i = this.y % this.scaledGridStep; i < window.innerHeight; i += this.scaledGridStep) {

        //     gridCtx.beginPath();
        //     gridCtx.moveTo(0, i);
        //     gridCtx.lineTo(window.innerWidth, i);

        //     // Draw the line
        //     gridCtx.stroke();
        // }
        // gridCtx.globalAlpha = 1;
        }
    
}


class InfoBox{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.targetType = "";
        this.box = document.querySelector(".infoBox");
        this.selectionBox = document.querySelector(".selectionBox");

        this.landType = this.box.querySelector(".landType");
        this.box.style.opacity = 0;
        this.visible = false;
        this.color = "rgb(0,0,0)";

        this.radius = 60;

    }
    updateTargetPosition = (move)=>{
        this.targetX += move[0];
        this.targetY += move[1];

        this.updateNonZoomedPosition();

    }
    
    toggle = (x,y)=>{

        if (this.visible == false){

            this.targetX = originCursor.x + Math.floor((x-originCursor.x)/originCursor.scaledGridStep)*originCursor.scaledGridStep + originCursor.scaledGridStep/2;
            this.targetY = originCursor.y + Math.floor((y-originCursor.y)/originCursor.scaledGridStep)*originCursor.scaledGridStep + originCursor.scaledGridStep/2;

            this.updateNonZoomedPosition();
            

            let pixelX =Math.floor((this.targetX - originCursor.x)/originCursor.scaledGridStep);
            let pixelY = Math.floor((this.targetY - originCursor.y)/originCursor.scaledGridStep);

            selectedXIndex = pixelX;
            selectedYIndex = pixelY;



            

            if (pixelX >= 0 &&pixelX < mapData.coloredMap[0].length && pixelY>= 0 && pixelY < mapData.coloredMap.length){   
                this.color = mapData.coloredMap[pixelY][pixelX]
                this.targetType = findType(this.color, thresholds);
            }
            else {
                this.color = "rgb(16,143,198)";
                this.targetType = "Water";
            }
            if (this.color == "rgba(0,0,0,0)"){
                this.color = "rgb(16,143,198)";
            }
            this.box.style.background = "linear-gradient(45deg,"+this.color+","+lighterTile(this.color)+")";
            
            // if (this.targetType == "Sand"||this.targetType == "Peak"){
            //     this.box.style.color = "rgb(50,50,50)";
            // }
            // else {
            //     this.box.style.color = "white";
            // }
            this.landType.textContent = this.targetType; 
            this.box.style.opacity = 1;
            peopleButton.classList.remove("active");
            placesButton.classList.remove("active");
            this.visible = true;

            
            
        }
        else {
            this.box.style.opacity = 0;
            this.visible = false;
            
        }

        this.displaySelected();
        
        
    
    }

    updateNonZoomedPosition(){
        this.initialX = (this.targetX - originCursor.centerX)/originCursor.scaleFactor + originCursor.centerX;
        this.initialY = (this.targetY - originCursor.centerY)/originCursor.scaleFactor + originCursor.centerY;
    }

    displaySelected = ()=>{
        if (this.visible == true){

            this.selectionBox.style.width = originCursor.scaledGridStep;
            this.selectionBox.style.height = originCursor.scaledGridStep;

            this.selectionBox.style.top = (this.targetY-originCursor.scaledGridStep/2)+'px';
            this.selectionBox.style.left = (this.targetX-originCursor.scaledGridStep/2)+'px';

            this.selectionBox.style.borderWidth = originCursor.scaledGridStep/10 + 'px';
            this.selectionBox.style.opacity = 1;
        }

        else {
            this.selectionBox.style.opacity = 0;
        }
    }
}


class Map {
    constructor(size = 110, area = 110*110*0.45, forestPercent = 50){

        this.heightLevelMap = generateMap(size, size, area);
        this.labelledMap = labelMap(this.heightLevelMap, thresholds)
        this.forestMap = generateForestMap(size, size, thresholds);

        this.coloredMap = colorMap(this.labelledMap, this.forestMap, (1-forestPercent/100)*255, thresholds); // convert heights of the mapData to colors

        this.width = this.heightLevelMap[0].length;
        this.height = this.heightLevelMap.length;

        this.peopleMap = new Array(this.height);
        for (var i = 0; i < this.height; i++){
            this.peopleMap[i] = new Array(this.width);
            for (var j = 0; j < this.width; j++){
                this.peopleMap[i][j] = new Array();
            }
        }
        
    }

    displayMap = (x0,y0)=> {
        offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        for (let y=0;y<this.height;y++){
            for(let x=0; x<this.width;x++){

                offscreenCtx.fillStyle = this.coloredMap[y][x];
                offscreenCtx.fillRect(x0 + x*originCursor.scaledGridStep , y0 + y*originCursor.scaledGridStep, originCursor.scaledGridStep+1, originCursor.scaledGridStep+1);
            }
        }
        tileCtx.drawImage(offscreenCanvas, 0, 0);
    }
}


//----------------------------------------------------------------
// Display functions
//----------------------------------------------------------------
function displayAll(){
    requestAnimationFrame(()=>{

        // tileCanvas drawing
        tileCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
        
        fillCanvas("rgb(16,143,198)"); // background color
        mapData.displayMap(originCursor.x, originCursor.y); // display tiles of the mapData
        originCursor.displayGrid();
        displayLighterTile();
        if (infoBox.visible == true){
            infoBox.displaySelected(); // display
        }
        
    })
    
}

function displayLighterTile(){
    let newX = Math.floor((originCursor.mouseX - originCursor.x)/originCursor.scaledGridStep);
    let newY = Math.floor((originCursor.mouseY - originCursor.y)/originCursor.scaledGridStep);
    

    

        lighterTileX = newX;
        lighterTileY = newY;

        tileCursor.style.left = originCursor.x +lighterTileX*originCursor.scaledGridStep;
        tileCursor.style.top = originCursor.y + lighterTileY*originCursor.scaledGridStep;

        //originCursor.displayGrid();
    
    tileCursor.style.width = originCursor.scaledGridStep;
    tileCursor.style.height = originCursor.scaledGridStep;
}
function fillCanvas(color){
    tileCtx.fillStyle = color;
    tileCtx.fillRect(0,0,tileCanvas.width, tileCanvas.height);
}

function lighterTile (initialColor){
    if (initialColor == "rgba(0,0,0,0)"){
        return initialColor;
    }
    if (initialColor == "rgb(255,255,255)"){
        return "rgb(150,150,150)";
    }
    let color = extractRGBValues(initialColor);
    for (let i=0; i<3; i++){
        color[i] = Math.min(255, color[i] + 60);
    }
    return `rgb(${color[0]},${color[1]},${color[2]})`;

}
function extractRGBValues(colorString) {
    // Remove the 'rgb(' and ')' parts, then split by comma
    let values = colorString.replace('rgb(', '').replace(')', '').split(',');
    // Convert each string in the array to a number
    let rgbValues = values.map(value => parseInt(value.trim(), 10));
    return rgbValues;
}

function drawEmptySquare(x, y, size, color, lineWidth = 1) {
    infoCtx.strokeStyle = color; // Set the color of the square's outline
    infoCtx.lineWidth = lineWidth; // Set the line width of the square's outline
    infoCtx.strokeRect(x, y, size, size); // Draw the empty square
}

drawLineWithOpacity = (startX, startY, endX, endY, opacity)=>{
    infoCtx.beginPath();
    infoCtx.moveTo(startX, startY);
    infoCtx.lineTo(endX, endY);
    infoCtx.lineWidth = 8;
    infoCtx.strokeStyle = `rgba(255,255,255, ${opacity})`; // Adjust color as needed
    infoCtx.stroke();
}
fadeLine = (startX, startY, endX, endY, duration=10, type = "in")=>{
    let startTime = null;
    

    animate =  (time)=>{
        
        if (!startTime) startTime = time;
        const timeElapsed = time - startTime;
        let opacity = 0;
        if (type == "in"){
            opacity = Math.min(timeElapsed / duration, 1)*MAX_LINK_ALPHA; // Ensure opacity is between 0 and 1
            }   
        else{
            
            opacity = (1 - Math.min(timeElapsed / duration, 1))*MAX_LINK_ALPHA; // Ensure opacity is between 0 and 1
            
        }

        // Clear the canvas
        infoCtx.clearRect(0, 0, infoCanvas.width, infoCanvas.height);

        // Redraw the line with the new opacity
        drawLineWithOpacity(startX, startY, endX, endY, opacity);

        if (timeElapsed < duration) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(this.animate);
    infoBox.visible = false;
}


//----------------------------------------------------------------
// Window changes handler
//----------------------------------------------------------------
window.addEventListener("resize", ()=>{
    displayAll();
});



//----------------------------------------------------------------
// Main obects
//----------------------------------------------------------------

let originCursor = new OriginCursor;
var mapData = new Map;
var infoBox = new InfoBox;

let lighterTileX = 0;
let lighterTileY = 0;

let previousTileColor = "rgb(0,0,0)";
let currentLighterTileColor = "rgb(0,0,0)";

let selectedXIndex = 0;
let selectedYIndex = 0;

//----------------------------------------------------------------
// First display
//----------------------------------------------------------------

setRandomMap();
displayAll();






