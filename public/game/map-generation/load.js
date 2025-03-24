//----------------------------------------------------------------

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keys = { id: 62, userid: 2, size: 32, area: 15, forest: 43, seed: 2671363, name: "Untitled" }//JSON.parse(decodeURIComponent(urlParams.get('data')));



function loadMap (){
    let sizePercent = keys.size;
    let areaPercent = keys.area;
    let forestPercent = keys.forest;


    let size = Math.round(minSize + sizePercent *(maxSize-minSize)/100);
    let area = Math.round((size*size)*(minArea + areaPercent *(maxArea-minArea)/100)/100);
    randomizerManager.mapRandomizer = new SeededRandom(keys.seed)
    let res = new Map(size, area, forestPercent, randomizerManager.mapRandomizer);
    return res;
}

