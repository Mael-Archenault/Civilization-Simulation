// Code by Keway

//----------------------------------------------------------------
// Initializations of elements variables
//----------------------------------------------------------------
let canvas = document.getElementById("canvas");
let offscreenCanvas = document.createElement("canvas");
canvas.setAttribute("width", window.innerWidth); canvas.setAttribute("height", window.innerHeight);
offscreenCanvas.setAttribute("width", window.innerWidth); offscreenCanvas.setAttribute("height", window.innerHeight);
let ctx = canvas.getContext('2d');
let offscreenCtx = offscreenCanvas.getContext('2d');


//----------------------------------------------------------------
// Class variables
//----------------------------------------------------------------
class OriginCursor {
    constructor(){
        this.initialX = 500;
        this.initialY = 100;
        
        this.scaleFactor = 1; // represents the zoom
        this.centerX = Math.round(window.innerWidth/2);
        this.centerY = Math.round(window.innerHeight/2);

        this.x = (this.initialX -this.centerX)*this.scaleFactor + this.centerX; // scaled version of initialX
        this.y = (this.initialY - this.centerY)*this.scaleFactor + this.centerY;// scaled version of initialY

        this.initialGridStep = 5; // the number of pixels between grid lines
        this.scaledGridStep = this.initialGridStep; // scaled version of initialGridStep
    }
    updatePosition(move) { // Update the position of the origin according to the mouse movement
        this.x += move[0];
        this.y += move[1];
        this.initialX = (this.x -this.centerX)/this.scaleFactor + this.centerX;
        this.initialY = (this.y - this.centerY)/this.scaleFactor + this.centerY;
        displayAll(); 
    }
    handleZoom = (event)=>{    
        
        if (!isNaN(event.wheelDeltaY)) {

            var delta = event.deltaY;
            // change the zoom according to the mouse wheel
            if (delta < 0){
                if(this.scaleFactor >0.1){
                    this.scaleFactor -= 0.03*this.scaleFactor;
                }
                else {
                    this.scaleFactor = 0.1;
                }
            }
            else if (delta > 0){
                if(this.scaleFactor <10){
                    this.scaleFactor += 0.03*this.scaleFactor;
                }
                else {
                    this.scaleFactor = 10;
                }
            }

            // updating every "scaled version" variables
            this.scaledGridStep = this.initialGridStep*this.scaleFactor;
            this.x = (this.initialX -this.centerX)*this.scaleFactor + this.centerX;
            this.y = (this.initialY - this.centerY)*this.scaleFactor + this.centerY;


            
        }

        displayAll(); // updating the canvas
    }
    displayGrid(){

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 0.2;
            for(let i=this.x % this.scaledGridStep ; i<window.innerWidth; i+= this.scaledGridStep){
                
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, window.innerHeight);

                // Draw the line
                ctx.stroke();
            }
            for(let i=this.y % this.scaledGridStep; i<window.innerHeight; i+= this.scaledGridStep){
                
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(window.innerWidth, i);

                // Draw the line
                ctx.stroke();
            }
        }
    
}


class Map {
    constructor(size = 110, area = 110*110*0.45){

        this.map = generateMap(size, size, area);
        this.coloredMap = colorMap(this.map, thresholds); // convert heights of the map to colors
        this.width = this.map[0].length;
        this.heigth = this.map.length;
    }

    displayMap = (x0,y0)=> {
        offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        for (let y=0;y<this.heigth;y++){
            for(let x=0; x<this.width;x++){

                offscreenCtx.fillStyle = this.coloredMap[y][x];
                offscreenCtx.fillRect(x0 + x*originCursor.scaledGridStep , y0 + y*originCursor.scaledGridStep, originCursor.scaledGridStep, originCursor.scaledGridStep);
                
            }
        }
        ctx.drawImage(offscreenCanvas, 0, 0);
    }
}


//----------------------------------------------------------------
// Display functions
//----------------------------------------------------------------
function displayAll(){
    requestAnimationFrame(()=>{
        fillCanvas("rgb(16,143,198)"); // background color
        mapObject.displayMap(originCursor.x, originCursor.y); // display tiles of the map
        originCursor.displayGrid(); // display the tiles size
    })
    
}
function fillCanvas(color){
    ctx.fillStyle = color;
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

//----------------------------------------------------------------
// Window changes handler
//----------------------------------------------------------------
window.onresize = ()=>{
    displayAll();
}



//----------------------------------------------------------------
// Main obects
//----------------------------------------------------------------

const originCursor = new OriginCursor;
var mapObject = new Map();

//----------------------------------------------------------------
// First display
//----------------------------------------------------------------

setRandomMap();
displayAll();






