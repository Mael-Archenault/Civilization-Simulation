//----------------------------------------------------------------
// Initializations of Event Listeners
//----------------------------------------------------------------

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener("wheel", mapDisplayManager.handleZoom);
document.addEventListener("mouseover", handleMouseOver);



//----------------------------------------------------------------
// Variables to track mouse state
//----------------------------------------------------------------
let isMouseDown = false;
let onCanvas = true;
let onInfoBox = false;
let onSidebar = false;

let clickedOn;
let hasMoved = false;
let startX, startY;


//----------------------------------------------------------------
// Handle Mouse Events
//----------------------------------------------------------------
function handleMouseDown(event) {
    if (onSidebar){
        clickedOn = "sidebar;"
    }
    else {
        clickedOn = "canvas";
    }
    isMouseDown = true;
    startX = event.clientX;
    startY = event.clientY;

    tileCursor.style.transition = "none";
    
    
}

function handleMouseMove(event) {

    // managing to lighten the tile where the mouse is pointing to

    mapDisplayManager.mouseX = event.clientX;
    mapDisplayManager.mouseY = event.clientY;

        

    onSidebar = false;
    // Check if the mouse is on the sidebar (we do not want to)
    if (sidebar.classList[1]=="active"){
        
        if (event.clientX < sidebar.clientWidth){
            onSidebar = true; 
            onCanvas = false;
        }
    }
    else {
        if (event.clientX < sidebar.clientWidth && event.clientY < sidebar.clientHeight){
            onSidebar = true;   
            onCanvas = false;
        }
    }
    // transmit the mouse movement to the mapDisplayManager object
    if (clickedOn=="canvas" && isMouseDown == true) {
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
        if(onCanvas == true){
            if (hasMoved == false){
                infoBox.toggle(startX, startY);
            }
            hasMoved = false;
            
        }
        if (clickedOn == "infoBox"){
            infoBox.box.classList.toggle("grabbed")
        }   
        isMouseDown = false;
    }
    tileCursor.style.transition = "all 0.01s ease-in";
}

function handleMouseOver(event) {
    let object = event.target.classList[0];
    
    
    
    if ((object=="infoBox")&& infoBox.visible){
        onInfoBox = true;
        onCanvas = false;
        onSidebar = false;        
       
    }
    
    else {
        onInfoBox = false;
        onCanvas = true;
    }
    
}

