//----------------------------------------------------------------
// Initializations of Event Listeners
//----------------------------------------------------------------

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener("wheel", handleZoom);
document.addEventListener("mouseover", handleMouseOver);


window.addEventListener("resize", ()=>{
    display.updateDisplay(display.mapData);
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

    display.tileCursor.style.transition = "none"; 
}

function handleMouseMove(event) {

    // managing to lighten the tile where the mouse is pointing to

    display.mapOrigin.mouseX = event.clientX;
    display.mapOrigin.mouseY = event.clientY;


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
            display.updateMapPosition([deltaX, deltaY]);
        }
        
    }
    display.updateDisplay(display.mapData);
    
}


function handleMouseUp() {
    if (isMouseDown == true){
        if (hasMoved == false && onCanvas == true){
            
            display.target.setPosition(startX, startY, display.mapData);
            setPeopleList(display.mapData, display.target.pixelX, display.target.pixelY);
            
        }

        hasMoved = false;
        isMouseDown = false;
    }
    display.tileCursor.style.transition = "all 0.01s ease-in";
}

function handleMouseOver(event) {
    let object = event.target.classList[0];
    if (object == "infoCanvas"|object == "selectionBox"){
        onCanvas = true;
    }
    else {
        onCanvas = false;
    }
    
}

function handleZoom(event) {
    if (onCanvas == true){
        display.handleZoom(event);
    }
}
