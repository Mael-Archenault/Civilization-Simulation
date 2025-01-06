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
        this.peopleMap[0][0].push({"name": "John"})
        
    }

    displayMap = (x0,y0, gridStep)=> {
        offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        for (let y=0;y<this.height;y++){
            for(let x=0; x<this.width;x++){

                offscreenCtx.fillStyle = this.coloredMap[y][x];
                offscreenCtx.fillRect(x0 + x*gridStep , y0 + y*gridStep, gridStep+1, gridStep+1);
            }
        }
        tileCtx.drawImage(offscreenCanvas, 0, 0);
        
    }
}

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

        this.infoBox = null;
    }
    setInfoBoxReference(infoBox){
        this.infoBox = infoBox;
    }
    updatePosition(move) { // Update the position of the origin according to the mouse movement
        this.x += move[0];
        this.y += move[1];
        this.initialX = (this.x -this.centerX)/this.scaleFactor + this.centerX;
        this.initialY = (this.y - this.centerY)/this.scaleFactor + this.centerY;
        this.infoBox.updateTargetPosition(move);
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

            this.infoBox.targetX = (infoBox.initialX -this.centerX)*this.scaleFactor + this.centerX;
            this.infoBox.targetY = (infoBox.initialY - this.centerY)*this.scaleFactor + this.centerY;



            
        }

        displayAll(); // updating the canvas
    }
    displayGrid(){

        tileCtx.fillStyle = 'red';
        tileCtx.fillRect(this.x, this.y, mapDisplayManager.scaledGridStep, mapDisplayManager.scaledGridStep);
        
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


class InfoBox{
    constructor(mapDisplayManager){
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

        this.mapDisplayManager = mapDisplayManager

    }
    updateTargetPosition = (move)=>{
        this.targetX += move[0];
        this.targetY += move[1];

        this.updateNonZoomedPosition();

    }
    
    toggle = (x,y)=>{

        if (this.visible == false){

            this.targetX = this.mapDisplayManager.x + Math.floor((x-this.mapDisplayManager.x)/this.mapDisplayManager.scaledGridStep)*this.mapDisplayManager.scaledGridStep + this.mapDisplayManager.scaledGridStep/2;
            this.targetY = this.mapDisplayManager.y + Math.floor((y-this.mapDisplayManager.y)/this.mapDisplayManager.scaledGridStep)*this.mapDisplayManager.scaledGridStep + this.mapDisplayManager.scaledGridStep/2;

            this.updateNonZoomedPosition();
            

            let pixelX =Math.floor((this.targetX - this.mapDisplayManager.x)/this.mapDisplayManager.scaledGridStep);
            let pixelY = Math.floor((this.targetY - this.mapDisplayManager.y)/this.mapDisplayManager.scaledGridStep);

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
        this.initialX = (this.targetX - this.mapDisplayManager.centerX)/this.mapDisplayManager.scaleFactor + this.mapDisplayManager.centerX;
        this.initialY = (this.targetY - this.mapDisplayManager.centerY)/this.mapDisplayManager.scaleFactor + this.mapDisplayManager.centerY;
    }

    displaySelected = ()=>{
        if (this.visible == true){
            
            this.selectionBox.style.width = this.mapDisplayManager.scaledGridStep+'px';
            this.selectionBox.style.height = this.mapDisplayManager.scaledGridStep+'px';
            

            this.selectionBox.style.top = (this.targetY-this.mapDisplayManager.scaledGridStep/2)+'px';
            this.selectionBox.style.left = (this.targetX-this.mapDisplayManager.scaledGridStep/2)+'px';

            this.selectionBox.style.borderWidth = this.mapDisplayManager.scaledGridStep/10 + 'px';
            this.selectionBox.style.opacity = 1;
        }

        else {
            this.selectionBox.style.opacity = 0;
        }
    }
}
