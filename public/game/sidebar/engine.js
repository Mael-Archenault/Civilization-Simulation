//----------------------------------------------------------------

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keys = JSON.parse(decodeURIComponent(urlParams.get('data')));


function setMap (randomizer){
    let sizePercent = keys.size;
    let areaPercent = keys.area;
    let forestPercent = keys.forest;


    let size = Math.round(minSize + sizePercent *(maxSize-minSize)/100);
    let area = Math.round((size*size)*(minArea + areaPercent *(maxArea-minArea)/100)/100);
    mapData = new Map(size, area, forestPercent, randomizer);
    updateDisplay(mapData);
    
}
