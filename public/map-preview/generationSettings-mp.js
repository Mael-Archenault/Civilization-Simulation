const maxSize = 100;
const minSize = 5;
const maxArea = 60; 
const minArea = 10;


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keys = JSON.parse(decodeURIComponent(urlParams.get('data')));


function setMap (){

    let sizePercent = keys.size;
    let areaPercent = keys.area;
    let forestPercent = keys.forest;

    let size = Math.round(minSize + sizePercent *(maxSize-minSize)/100);
    let area = Math.round((size*size)*(minArea + areaPercent *(maxArea-minArea)/100)/100)
    randomizerManager.mapRandomizer = new SeededRandom(keys.seed)
    mapData = new Map(size, area, forestPercent, randomizerManager.mapRandomizer);
    mapDisplayManager.centerMap(mapData);
    updateDisplay(mapData);
    
}



