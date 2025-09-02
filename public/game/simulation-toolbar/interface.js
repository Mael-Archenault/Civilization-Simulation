stepForwardButton = document.querySelector(".step-forward")
stepBackwardButton = document.querySelector(".step-backward")

stepForwardButton.onclick = ()=>{
    simulation.stepForward();
}

stepBackwardButton.onclick = ()=>{
    simulation.stepBackward();
}