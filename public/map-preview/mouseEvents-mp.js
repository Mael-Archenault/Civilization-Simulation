//----------------------------------------------------------------
// Initializations of Event Listeners
//----------------------------------------------------------------

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener("wheel", handleZoom);




//----------------------------------------------------------------
// Variables to track mouse state
//----------------------------------------------------------------
let isMouseDown = false;

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
}

function handleMouseMove(event) {

    // managing to lighten the tile where the mouse is pointing to

    mapDisplayManager.mouseX = event.clientX;
    mapDisplayManager.mouseY = event.clientY;


    // transmit the mouse movement to the mapDisplayManager object
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
        mapDisplayManager.updatePosition([deltaX, deltaY]);
        
    }
    updateDisplay(mapData);
    
}


function handleMouseUp() {
    if (isMouseDown == true){

        hasMoved = false;
        isMouseDown = false;
    }
}


function handleZoom(event) {
    mapDisplayManager.handleZoom(event);
}
