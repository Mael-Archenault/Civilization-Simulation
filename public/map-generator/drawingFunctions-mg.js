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
        target.displaySelected(moveEase=false);
        displayLighterTile();
        
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




