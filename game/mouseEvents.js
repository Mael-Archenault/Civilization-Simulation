//----------------------------------------------------------------
// Initializations of Event Listeners
//----------------------------------------------------------------

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener("wheel", handleZoom);
document.addEventListener("mouseover", handleMouseOver);



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

    tileCursor.style.transition = "none"; 
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
        if (onCanvas == true) {
            mapDisplayManager.updatePosition([deltaX, deltaY]);
        }
        
    }
    updateDisplay(mapData);
    
}


function handleMouseUp() {
    if (isMouseDown == true){
        if (hasMoved == false && onCanvas == true){
            
            infoBox.toggle(startX, startY);
            setPeopleList(peopleList, mapData, selectedXIndex, selectedYIndex);
            
        }

        hasMoved = false;
        isMouseDown = false;
    }
    tileCursor.style.transition = "all 0.01s ease-in";
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
        mapDisplayManager.handleZoom(event);
    }
}
