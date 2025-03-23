class Display {
    constructor() {
        this.tileOffscreenCanvas = document.createElement("canvas");
        this.peopleOffscreenCanvas = document.createElement("canvas");
        this.tileCanvas = document.querySelector(".tileCanvas");
        this.gridCanvas = document.querySelector(".gridCanvas");
        this.peopleCanvas = document.querySelector(".peopleCanvas");

        this.tileCursor = document.querySelector(".tileCursor");

        this.tileOffscreenCanvas.setAttribute("width", window.innerWidth);
        this.tileOffscreenCanvas.setAttribute("height", window.innerHeight);
        this.peopleOffscreenCanvas.setAttribute("width", window.innerWidth);
        this.peopleOffscreenCanvas.setAttribute("height", window.innerHeight);
        this.tileCanvas.setAttribute("width", window.innerWidth);
        this.tileCanvas.setAttribute("height", window.innerHeight);
        this.gridCanvas.setAttribute("width", window.innerWidth);
        this.gridCanvas.setAttribute("height", window.innerHeight);
        this.peopleCanvas.setAttribute("width", window.innerWidth);
        this.peopleCanvas.setAttribute("height", window.innerHeight);

        this.tileCtx = this.tileCanvas.getContext('2d');
        this.tileOffscreenCtx = this.tileOffscreenCanvas.getContext('2d');
        this.peopleOffscreenCtx = this.peopleOffscreenCanvas.getContext('2d');
        
        this.gridCtx = this.gridCanvas.getContext('2d');
        this.peopleCtx = this.peopleCanvas.getContext('2d');

        this.lighterTileX = 0;
        this.lighterTileY = 0;

        this.previousTileColor = "rgb(0,0,0)";
        this.currentLighterTileColor = "rgb(0,0,0)";

        this.selectedXIndex = 0;
        this.selectedYIndex = 0;

        this.mapData = new Map(40, 40*40 * 0.45, 50, randomizerManager.mapRandomizer);
        this.mapOrigin = new MapOrigin;

        this.target = new SelectedTileBox(this.mapOrigin);
        this.target.setPosition(this.mapData, 0,0)
        this.mapOrigin.setTargetReference(this.target);

        this.centerMap(this.mapData)

        this.mainloop = setInterval(()=>{
            this.updateDisplay(this.mapData)
        }, 200)

    }

    updateDisplay = (map)=>{
    
        requestAnimationFrame(()=>{

            

            // deleting previous display
            this.tileCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            
            this.peopleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // filling the background with the blue color
            this.tileCtx.fillStyle = "rgb(16,143,198)";
            this.tileCtx.fillRect(0,0,window.innerWidth, window.innerHeight);


            // displaying the map tiles
            this.displayMap(map,this.mapOrigin, this.tileCtx); // display tiles of the mapData
            this.displayGrid(this.mapOrigin,this.gridCtx);
            this.displayLighterTile();
            if (this.target.visible == true){
                this.target.displaySelected(false); // display
            }
            
        })
        
    }
    
    displayLighterTile = ()=>{
        let newX = Math.floor((this.mapOrigin.mouseX - this.mapOrigin.x)/this.mapOrigin.scaledGridStep);
        let newY = Math.floor((this.mapOrigin.mouseY - this.mapOrigin.y)/this.mapOrigin.scaledGridStep);
        
        this.lighterTileX = newX;
        this.lighterTileY = newY;
    
        this.tileCursor.style.left = this.mapOrigin.x +this.lighterTileX*this.mapOrigin.scaledGridStep + 'px';
        this.tileCursor.style.top = this.mapOrigin.y + this.lighterTileY*this.mapOrigin.scaledGridStep + 'px';
    
        this.tileCursor.style.width = this.mapOrigin.scaledGridStep +'px';
        this.tileCursor.style.height = this.mapOrigin.scaledGridStep + 'px';
    }
    
    lighterTile = (initialColor)=>{
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
    extractRGBValues=(colorString)=>{
        // Remove the 'rgb(' and ')' parts, then split by comma
        let values = colorString.replace('rgb(', '').replace(')', '').split(',');
        // Convert each string in the array to a number
        let rgbValues = values.map(value => parseInt(value.trim(), 10));
        return rgbValues;
    }


    displayMap = (map,mapOrigin, context)=> {

        let x0 = mapOrigin.x
        let y0 = mapOrigin.y
        let gridStep = mapOrigin.scaledGridStep
        this.tileOffscreenCtx.clearRect(0, 0, this.tileOffscreenCanvas.width, this.tileOffscreenCanvas.height);
        for (let y=0;y<map.height;y++){
            for(let x=0; x<map.width;x++){


                // Drawing the tile color
                this.tileOffscreenCtx.fillStyle = map.coloredMap[y][x]; 
                this.tileOffscreenCtx.fillRect(x0 + x*gridStep , y0 + y*gridStep, gridStep+1, gridStep+1);



                if (map.peopleMap[y][x].length > 0){
                    let l = map.peopleMap[y][x].length
                    for (let k=0; k<Math.min(l, 6); k++){
                        human = map.peopleMap[y][x][k]
                        
                    
                        let x_pos = x0 + x*gridStep + (k%3-Math.min(l-1,2)/2)*gridStep/Math.min(l,3);  // x-position of the human
                        let y_pos = y0 + y*gridStep + (Math.floor(k/3)%2)*gridStep/Math.min(l+2,4);
                        
                        
                        this.peopleCtx.drawImage(human.image, 48*human.animationFrame,0, 48,48, x_pos, y_pos, gridStep, gridStep);
                        

                    }
                    
                    
                }
            }
        }
        context.drawImage(this.tileOffscreenCanvas, 0, 0);
        //context.drawImage(this.peopleOffscreenCanvas, 0, 0);
        
    }


    displayGrid(mapOrigin, context){
        
        context.clearRect(0,0, window.innerWidth, window.innerHeight);
        context.globalAlpha = (mapOrigin.scaleFactor - 0.1) / 9.9;
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        for (let i = mapOrigin.x % mapOrigin.scaledGridStep; i < window.innerWidth; i += mapOrigin.scaledGridStep) {

            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, window.innerHeight);

            // Draw the line
            context.stroke();
        }
        for (let i = mapOrigin.y % mapOrigin.scaledGridStep; i < window.innerHeight; i += mapOrigin.scaledGridStep) {

            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(window.innerWidth, i);

            // Draw the line
            context.stroke();
        }
        context.globalAlpha = 1;
        }

    handleZoom = (event) => {
        this.mapOrigin.handleZoom(event);
        this.updateDisplay(this.mapData);
    }

    updateMapPosition = (move) => {
        this.mapOrigin.updatePosition(move);
        this.target.updateTargetPosition(move);
        this.updateDisplay(this.mapData);

        
    }

    centerMap = (map) => {
        this.mapOrigin.centerMap(map);
        this.updateDisplay(this.mapData);
    }
    
    
    
    
}

// Other classes and functions remain the same, just replace "let" with "this."
//----------------------------------------------------------------
// Map Object (map data storage)
//----------------------------------------------------------------


//----------------------------------------------------------------
// Map Display Manager (zoom handling, map drawing, etc)
//----------------------------------------------------------------

class MapOrigin {
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
        

        this.target = null;
    }
    setTargetReference(target){
        this.target = target;
    }
    updatePosition(move) { // Update the position of the origin according to the mouse movement
        this.x += move[0];
        this.y += move[1];
        this.initialX = (this.x -this.centerX)/this.scaleFactor + this.centerX;
        this.initialY = (this.y - this.centerY)/this.scaleFactor + this.centerY;

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

            //updating the scaled version tile linked with infobox

            this.target.targetX = (this.target.initialX -this.centerX)*this.scaleFactor + this.centerX;
            this.target.targetY = (this.target.initialY - this.centerY)*this.scaleFactor + this.centerY;



            
        }

        // updateDisplay(mapData); // updating the canvas
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


        // this.target.targetX = -100;
        // this.target.targetY = -100;
        
        // this.target.targetType = "No Tile Selected";
        // this.target.color = "rgb(70,70,70)";

        // this.target.selectionBox.style.opacity = "0";
        // this.target.visible = false;
        
        
    }


    
    
}





