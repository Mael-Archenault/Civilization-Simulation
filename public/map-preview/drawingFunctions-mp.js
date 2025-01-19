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
        
    })
    
}

function fillCanvas(color){
    tileCtx.fillStyle = color;
    tileCtx.fillRect(0,0,window.innerWidth, window.innerHeight);
}




