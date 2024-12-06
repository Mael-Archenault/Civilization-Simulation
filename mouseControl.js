//----------------------------------------------------------------
// Initializations of Event Listeners
//----------------------------------------------------------------

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener("wheel", originCursor.handleZoom);




//----------------------------------------------------------------
// Variables to track mouse state
//----------------------------------------------------------------
let isMouseDown = false;
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
    if (!isMouseDown) return; // Exit early if mouse is not down

    // Calculate distance moved
    let flag = false;
    // Check if the mouse is on the sidebar (we do not want to)
    if (sidebar.classList[1]=="active"){
        
        if (event.clientX > sidebar.clientWidth){
            flag = true;
            
        }
    }
    else {
        if (event.clientX > sidebar.clientWidth && event.clientY > sidebar.clientHeight){
            flag = true;
            
        }
    }

    // transmit the mouse movement to the originCursor object
    if (flag == true) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        // Do something with the mouse slide (e.g., draw on canvas)
        originCursor.updatePosition([deltaX, deltaY]);


        // Update start position
        startX = event.clientX;
        startY = event.clientY;
    }
}

function handleMouseUp() {
    isMouseDown = false;
}





