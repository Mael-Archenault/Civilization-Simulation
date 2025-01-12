
// limits for the sliders
const maxSize = 200;
const minSize = 5;
const maxArea = 60; 
const minArea = 10;

const MGCareaSlider = document.querySelector(".area-slider");
const MGCsizeSlider = document.querySelector(".size-slider");
const MGCforestSlider = document.querySelector(".forest-slider");


const MGCareaValue = document.querySelector(".area-value");
const MGCsizeValue = document.querySelector(".size-value");
const MGCforestValue = document.querySelector(".forest-value");
const MGCseedTextbox = document.querySelector(".seedTextbox");

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

MGCgenerateRandomButton.onclick = setRandomMap;


MGCareaSlider.addEventListener('input', (event) => {
    MGCareaValue.value = event.target.value;
    setMap();
});

MGCsizeSlider.addEventListener('input', (event) => {
    MGCsizeValue.value = event.target.value;
    setMap();
});

MGCforestSlider.addEventListener('input', (event) => {
    MGCforestValue.value = event.target.value;
    setMap();
});

MGCareaValue.addEventListener('change', (event) => {
    MGCareaSlider.value = event.target.value;
    setMap();
});

MGCsizeValue.addEventListener('change', (event) => {
    MGCsizeSlider.value = event.target.value;
    setMap();
});

MGCforestValue.addEventListener('change', (event) => {
    MGCforestSlider.value = event.target.value;
    setMap();
});