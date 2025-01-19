
//----------------------------------------------------------------
// Map Object (map data storage)
//----------------------------------------------------------------





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

    displayMap = (x0,y0, gridStep)=> {
        offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        for (let y=0;y<this.height;y++){
            for(let x=0; x<this.width;x++){

                offscreenCtx.fillStyle = this.coloredMap[y][x];
                offscreenCtx.fillRect(x0 + x*gridStep , y0 + y*gridStep, gridStep+1, gridStep+1);
                if (this.peopleMap[y][x].length > 0){
                    offscreenCtx.fillStyle = "rgb(255,255,255)";
                    offscreenCtx.beginPath();    
                    offscreenCtx.arc(x0 + x*gridStep +gridStep/2, y0 + y*gridStep + gridStep/2, gridStep/4,  Math.PI * 2, false);
                    offscreenCtx.fillStyle = "red";
                    offscreenCtx.fill();
                    offscreenCtx.stroke();
                }
            }
        }
        tileCtx.drawImage(offscreenCanvas, 0, 0);
        
    }
}

//----------------------------------------------------------------
// Map Display Manager (zoom handling, map drawing, etc)
//----------------------------------------------------------------

class MapDisplayManager {
    constructor(){
        this.initialX = 500;
        this.initialY = 100;
        
        this.scaleFactor = 1; // represents the zoom

        this.MAX_SCALE_FACTOR = 100;
        this.MIN_SCALE_FACTOR = 0.1;
        this.centerX = Math.round(window.innerWidth/2);
        this.centerY = Math.round(window.innerHeight/2);

        this.x = (this.initialX -this.centerX)*this.scaleFactor + this.centerX; // scaled version of initialX
        this.y = (this.initialY - this.centerY)*this.scaleFactor + this.centerY;// scaled version of initialY

        this.initialGridStep = 20; // the number of pixels between grid lines
        this.scaledGridStep = this.initialGridStep*this.scaleFactor; // scaled version of initialGridStep

        this.mouseX = 0;
        this.mouseY = 0;

    }


    updatePosition(move) { // Update the position of the origin according to the mouse movement
        this.x += move[0];
        this.y += move[1];
        this.initialX = (this.x -this.centerX)/this.scaleFactor + this.centerX;
        this.initialY = (this.y - this.centerY)/this.scaleFactor + this.centerY;
        updateDisplay(mapData); 
    }

    centerMap = (map)=>{
        this.scaleFactor = window.innerWidth*0.6/(map.width*this.initialGridStep);

        this.initialX = this.centerX - map.width*this.initialGridStep/2
        this.initialY = this.centerY - map.height*this.initialGridStep/2
        

        // updating every "scaled version" variables
        this.scaledGridStep = this.initialGridStep*this.scaleFactor;
        this.x = (this.initialX -this.centerX)*this.scaleFactor + this.centerX;
        this.y = (this.initialY - this.centerY)*this.scaleFactor + this.centerY;

        //updating the scaled version tile linked with target

        
        updateDisplay(mapData); // updating the canvas
        
    }


    handleZoom = (event)=>{    
        
        if (!isNaN(event.wheelDeltaY)) {
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

        }

        updateDisplay(mapData); // updating the canvas
    }
    displayGrid(){

        // tileCtx.fillStyle = 'red';
        // tileCtx.fillRect(this.x, this.y, mapDisplayManager.scaledGridStep, mapDisplayManager.scaledGridStep);
        
        gridCtx.clearRect(0,0, window.innerWidth, window.innerHeight);
        gridCtx.globalAlpha = (this.scaleFactor - 0.1) / 9.9;
        gridCtx.strokeStyle = 'black';
        gridCtx.lineWidth = 2;
        for (let i = this.x % this.scaledGridStep; i < window.innerWidth; i += this.scaledGridStep) {

            gridCtx.beginPath();
            gridCtx.moveTo(i, 0);
            gridCtx.lineTo(i, window.innerHeight);

            // Draw the line
            gridCtx.stroke();
        }
        for (let i = this.y % this.scaledGridStep; i < window.innerHeight; i += this.scaledGridStep) {

            gridCtx.beginPath();
            gridCtx.moveTo(0, i);
            gridCtx.lineTo(window.innerWidth, i);

            // Draw the line
            gridCtx.stroke();
        }
        gridCtx.globalAlpha = 1;
        }
    
}

