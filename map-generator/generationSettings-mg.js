
// limits for the sliders
const maxSize = 200;
const minSize = 5;
const maxArea = 60; 
const minArea = 10;

const MGCareaSlider = document.querySelector(".areaSlider");
const MGCsizeSlider = document.querySelector(".sizeSlider");
const MGCforestSlider = document.querySelector(".forestSlider");
const MGCseedTextbox = document.querySelector(".seedTextbox");
const MGCgenerateButton = document.querySelector(".generateButton");
const MGCgenerateRandomButton = document.querySelector(".generateRandomButton");


function setMap (){
    let sizePercent = MGCsizeSlider.value;
    let areaPercent = MGCareaSlider.value;
    let forestPercent = MGCforestSlider.value;

    console.log("Test");
    let size = Math.round(minSize + sizePercent *(maxSize-minSize)/100);
    let area = Math.round((size*size)*(minArea + areaPercent *(maxArea-minArea)/100)/100);
    mapRandomizer = new SeededRandom(MGCseedTextbox.value);
    mapData = new Map(size, area, forestPercent);
    updateDisplay(mapData);
    
}


function setRandomMap (){
    MGCareaSlider.value = Math.random()*100;
    MGCsizeSlider.value = Math.random()*100;
    MGCseedTextbox.value = 10000+Math.floor(Math.random()*10000000);
    setMap();
}

MGCgenerateButton.onclick = setMap;
MGCgenerateRandomButton.onclick = setRandomMap;
