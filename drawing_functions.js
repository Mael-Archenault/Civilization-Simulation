// Code by Keway

//----------------------------------------------------------------
// Display functions
//----------------------------------------------------------------
function updateDisplay(map){
    
    requestAnimationFrame(()=>{

        tileCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        fillCanvas("rgb(16,143,198)"); // background color
        map.displayMap(mapDisplayManager.x, mapDisplayManager.y, mapDisplayManager.scaledGridStep); // display tiles of the mapData
        mapDisplayManager.displayGrid();
        displayLighterTile();
        if (infoBox.visible == true){
            infoBox.displaySelected(); // display
        }
        
    })
    
}

function displayLighterTile(){
    let newX = Math.floor((mapDisplayManager.mouseX - mapDisplayManager.x)/mapDisplayManager.scaledGridStep);
    let newY = Math.floor((mapDisplayManager.mouseY - mapDisplayManager.y)/mapDisplayManager.scaledGridStep);
    
    lighterTileX = newX;
    lighterTileY = newY;

    tileCursor.style.left = mapDisplayManager.x +lighterTileX*mapDisplayManager.scaledGridStep + 'px';
    tileCursor.style.top = mapDisplayManager.y + lighterTileY*mapDisplayManager.scaledGridStep + 'px';

    tileCursor.style.width = mapDisplayManager.scaledGridStep +'px';
    tileCursor.style.height = mapDisplayManager.scaledGridStep + 'px';
}
function fillCanvas(color){
    tileCtx.fillStyle = color;
    tileCtx.fillRect(0,0,window.innerWidth, window.innerHeight);
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




//----------------------------------------------------------------
// First display
//----------------------------------------------------------------







