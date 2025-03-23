
// limits for the sliders
const maxSize = 100;
const minSize = 5;
const maxArea = 60; 
const minArea = 10;

const MGCareaSlider = document.querySelector(".area-slider");
const MGCsizeSlider = document.querySelector(".size-slider");
const MGCforestSlider = document.querySelector(".forest-slider");


const MGCareaValue = document.querySelector(".area-value");
const MGCsizeValue = document.querySelector(".size-value");
const MGCforestValue = document.querySelector(".forest-value");


const MGCnameTextbox = document.querySelector(".nameTextbox");
const MGCseedTextbox = document.querySelector(".seedTextbox");

const MGCgenerateRandomButton = document.querySelector(".generateRandomButton");


MGCareaSlider.value = 22;
MGCsizeSlider.value = 36;
MGCforestSlider.value = 43;

MGCareaValue.value = 22;
MGCsizeValue.value = 36;
MGCforestValue.value = 43;

MGCseedTextbox.value = 15;


function getKeys (){
    return {
        name : MGCnameTextbox.value,
        area: MGCareaSlider.value,
        size: MGCsizeSlider.value,
        forest: MGCforestSlider.value,
        seed: MGCseedTextbox.value
    }
}


function setMap (){
    let sizePercent = MGCsizeSlider.value;
    let areaPercent = MGCareaSlider.value;
    let forestPercent = MGCforestSlider.value;

    let size = Math.round(minSize + sizePercent *(maxSize-minSize)/100);
    let area = Math.round((size*size)*(minArea + areaPercent *(maxArea-minArea)/100)/100);
    randomizerManager.mapRandomizer = new SeededRandom(MGCseedTextbox.value)
    mapData = new Map(size, area, forestPercent, randomizerManager.mapRandomizer);
    mapDisplayManager.centerMap(mapData);
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

MGCseedTextbox.addEventListener('change', (event) => {
    setMap();
});