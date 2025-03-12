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
    mapRandomizer = new SeededRandom(keys.seed);
    mapData = new Map(size, area, forestPercent, randomizer);
    updateDisplay(mapData);
    
}


///----------------------------------------------------------------
// Human Generation Content Management
//----------------------------------------------------------------

let HGCAddBtn = humanGenerationContent.querySelector(".addRandomHumanButton");
let HGCRemoveBtn = humanGenerationContent.querySelector(".removeButton");



function addRandomHuman(){

    mapData.peopleMap[selectedYIndex][selectedXIndex].push(new Human(humanRandomizer));
    setPeopleList(peopleList, mapData, selectedXIndex, selectedYIndex);
    updateDisplay(mapData);
}

function removeHuman(){
    mapData.peopleMap[selectedYIndex][selectedXIndex].pop();
    setPeopleList(peopleList, mapData, selectedXIndex, selectedYIndex);
    updateDisplay(mapData);
}

HGCAddBtn.onclick = addRandomHuman;
HGCRemoveBtn.onclick = removeHuman;