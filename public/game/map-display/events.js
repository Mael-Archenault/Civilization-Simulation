//----------------------------------------------------------------
// Initializations of Event Listeners
//----------------------------------------------------------------

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener("wheel", handleZoom);
document.addEventListener("mouseover", handleMouseOver);


window.addEventListener("resize", ()=>{
    simulation.display.resize();
});









//----------------------------------------------------------------
// Variables to track mouse state
//----------------------------------------------------------------
let isMouseDown = false;

let onCanvas = false;

let clickedOn;
let hasMoved = false;
let startX, startY;


//----------------------------------------------------------------
// Handle Mouse Events
//----------------------------------------------------------------
function handleMouseDown(event) {
    isMouseDown = true;
    startX = event.clientX;
    startY = event.clientY;

    simulation.display.tileCursor.style.transition = "none"; 
}

function handleMouseMove(event) {

    // managing to lighten the tile where the mouse is pointing to

    simulation.display.mapOrigin.mouseX = event.clientX;
    simulation.display.mapOrigin.mouseY = event.clientY;


    // transmit the mouse movement to the mapOrigin object
    if (isMouseDown == true) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        // Update start position
        startX = event.clientX;
        startY = event.clientY;

        if (deltaX != 0 && deltaY != 0) {
            hasMoved = true;
        }
        // Do something with the mouse slide 
        if (onCanvas == true) {
            simulation.display.updateMapPosition([deltaX, deltaY]);
        }
        simulation.display.updateDisplay();
    }
   
    
}


function handleMouseUp() {
    if (isMouseDown == true){
        if (hasMoved == false && onCanvas == true){
            
            simulation.display.target.setNewTarget(startX, startY);
            setPeopleList(simulation.display.map, simulation.display.target.pixelX, simulation.display.target.pixelY);
            
        }

        hasMoved = false;
        isMouseDown = false;
    }
}

function handleMouseOver(event) {
    let object = event.target.id;
    if (object == "canvas"|object == "selectionBox"){
        onCanvas = true;
    }
    else {
        onCanvas = false;
    }
    
}

function handleZoom(event) {
    if (onCanvas == true){
        
        simulation.display.handleZoom(event);
    }
}
