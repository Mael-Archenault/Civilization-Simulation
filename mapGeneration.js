
//----------------------------------------------------------------
// Initializations main variables
//----------------------------------------------------------------

const seed = 46874565;
var thresholds = [{value:0, color:"rgba(0,0,0,0)"},{value:10, color:"rgb(208,220,81)"},{value:30, color: "rgb(136,93,81)"},{value:50, color: "rgb(54,136,41)"},{value:200, color: "rgba(77,79,75)"},{value:240, color: "rgba(255,255,255)"},{value:250, color: "rgba(255,255,255)"}]
var sizeInput = 50;
var areaInput = 50*25;

// limits for the sliders
const maxSize = 200;
const minSize = 20;
const maxArea = 60; 
const minArea = 10;

//----------------------------------------------------------------
// Elements variables
//----------------------------------------------------------------
const areaSlider = document.querySelector(".areaSlider");
const sizeSlider = document.querySelector(".sizeSlider");
const seedTextbox = document.querySelector(".seedTextbox");
const generateButton = document.querySelector(".generateButton");
const generateRandomButton = document.querySelector(".generateRandomButton");

//----------------------------------------------------------------
// Elements functions
//----------------------------------------------------------------
generateButton.onclick = setMap;
generateRandomButton.onclick = setRandomMap;

//----------------------------------------------------------------
// Map setup functions
//----------------------------------------------------------------

function setMap (){
    let sizePercent = sizeSlider.value;
    let areaPercent = areaSlider.value;


    let size = Math.round(minSize + sizePercent *(maxSize-minSize)/100);
    let area = Math.round((size*size)*(minArea + areaPercent *(maxArea-minArea)/100)/100);
    rdn = new SeededRandom(seedTextbox.value);
    mapObject = new Map(size, area);
    
    displayAll();
}

function setRandomMap (){
    areaSlider.value = Math.random()*100;
    sizeSlider.value = Math.random()*100;
    seedTextbox.value = 10000+Math.floor(Math.random()*10000000);
    setMap();
}

//----------------------------------------------------------------
// Random Generator
//----------------------------------------------------------------

class SeededRandom {
    constructor(seed) {
        this.seed = seed;
        
    }
    next = ()=>{
        this.seed = (1664525 * this.seed + 1013904223) % 4294967296;
        return this.seed / 4294967296;
    }

    // Function to generate a random integer between min and max (inclusive)
    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    // Function to generate a random float between min and max
    nextFloat(min, max) {
        return this.next() * (max - min) + min;
    }
}


let rdn = new SeededRandom(seed);



//----------------------------------------------------------------
// Perlin Noise Generator
//----------------------------------------------------------------


function lerp(a, b, t) {
    return a + (b - a) * t;
}

function randomGradient(ix, iy) {
    const random = rdn.nextFloat(0,6) ;
    return {x: Math.cos(random), y: Math.sin(random)};
}
function dotGridGradient(ix, iy, x, y, vectors) {
    let gradient = vectors[iy][ix];
    let dx = x - ix;
    let dy = y - iy;
    return (dx*gradient.x + dy*gradient.y);
}

function perlin(x, y, vectors) {
    let x0 = Math.floor(x);
    let x1 = x0 + 1;
    let y0 = Math.floor(y);
    let y1 = y0 + 1;


    let sx = x - x0;
    let sy = y - y0;

    let n0, n1, ix0, ix1, value;
    
    n0 = dotGridGradient(x0, y0, x, y, vectors);
    n1 = dotGridGradient(x1, y0, x, y, vectors);
    
    ix0 = lerp(n0, n1, sx);

    n0 = dotGridGradient(x0, y1, x, y, vectors);
    n1 = dotGridGradient(x1, y1, x, y, vectors);
    
    ix1 = lerp(n0, n1, sx);

    value = lerp(ix0, ix1, sy)*255;
    return value;
}

function generatePerlinNoise(width, height, scale = 1) {
    let noise = new Array(height);
    let vectors = [];
    let endI =  Math.floor(height/scale)+2;
    let endJ = Math.floor(width/scale)+2;

    for (let i = 0; i < endI; i++) {
        line = [];
        for (let j = 0; j < endJ; j++) {
                line.push(randomGradient(j,i));
            }
        vectors.push(line);
    }

    for (let y = 0; y < height; y++) {
        noise[y] = new Array(width);
        for (let x = 0; x < width; x++) {
            noise[y][x] = -1*perlin(x / scale, y / scale, vectors);
        }
    }

    return noise;
}

function generateOctavePerlinNoise(width, height, scale, octaves, persistence) {
    let totalNoise = new Array(height);
    for (let y = 0; y < height; y++) {
        totalNoise[y] = new Array(width).fill(0);
    }

    let amplitude = 1;
    let frequency = 1;
    let maxValue = 0; // Used for normalization

    for (let o = 0; o < octaves; o++) {
        let octaveNoise = generatePerlinNoise(width, height, scale * frequency);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                totalNoise[y][x] += octaveNoise[y][x] * amplitude;
            }
        }

        maxValue += amplitude;

        amplitude *= persistence;
        frequency *= 4;
    }

    // Normalize the noise
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            totalNoise[y][x] /= maxValue;
            // Scale to 0-255 if needed
            totalNoise[y][x] = Math.round(totalNoise[y][x]);
        }
    }

    return totalNoise;
}

//----------------------------------------------------------------
// Array manipulation functions
//----------------------------------------------------------------

function normalizeArray(array) {
    let min = array[0][0];
    let max = array[0][0];

    // Find the minimum and maximum values in the array
    for (let i = 1; i < array.length; i++) {
        for (let j = 1; j < array[i].length; j++) {
            if (array[i][j] < min) {
                min = array[i][j];
            }
            if (array[i][j] > max) {
                max = array[i][j];
                
            }
        }
    }

    // Calculate the range (max - min)
    let range = max - min;

    

    // If the range is 0, all elements are the same and can be set to 1 or any value between 0 and 1
    if (range === 0) {
        return array.map(() => 1); // or 0.5 or any constant value
    }

    // Normalize the array

    let normalizedArray = array;
    for (let i = 0; i < array.length; i++) {
        normalizedArray[i] = normalizedArray[i].map(value => (value - min) *255/ range);
    }
    
    return normalizedArray;
}


function smoothing2D(map) {
    let smoothedMap = new Array(map.length);
    for (let y = 0; y < map.length; y++) {
        smoothedMap[y] = new Array(map[y].length);
        for (let x = 0; x < map[y].length; x++) {
            smoothedMap[y][x] = averageOfNeighbors(map, x, y);
        }
    }
    return smoothedMap;
}

function averageOfNeighbors(map, x, y) {
    let sum = 0;
    let count = 0;
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
            let newX = x + offsetX;
            let newY = y + offsetY;
            if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length) {
                sum += map[newY][newX];
                count++;
            }
        }
    }
    return sum / count;
}

function cropCorners(map){
    a = map.length/2;
    b = map[0].length/2;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (((x-map[0].length/2)/a)**2 + ((y-map.length/2)/b)**2 > 1) {
                if (rdn.next()>0.4){
                    map[y][x] = 0;
                }
            }
        }
    }
    return map;
}

//----------------------------------------------------------------
// Final Map Generator
//----------------------------------------------------------------
function generateMap(width, height, area) {
    let scale = width/2; // Experiment with this value
    let octaves = 3; // Number of layers
    let persistence = 1; // Contribution of each octave


    let complexMap = new Array(height);
    for (let y = 0; y < height; y++) {
        complexMap[y] = new Array(width);
        for (let x = 0; x < width; x++) {
            complexMap[y][x] = 0;
        }
    }

    // Superposition of different maps at different scales

    let innerMap = generateOctavePerlinNoise(Math.round(6*width/8), Math.round(6*height/8), Math.round(width/8), octaves, persistence);
    
    innerMap = normalizeArray(innerMap);
    innerMap = cropCorners(innerMap);

    for (let y = 0; y < innerMap.length ; y++) {
        for (let x = 0; x < innerMap[y].length; x++) {
            complexMap[y+Math.round(height/8)][x+Math.round(width/8)] = innerMap[y][x];
        }
    }
    
    for (let y = 0; y < 4; y++) {
        complexMap = normalizeArray(complexMap);
        complexMap = smoothing2D(complexMap);
    
    }
    
    complexMap = adjustArea(complexMap, area, thresholds[1].value);
    
    complexMap = normalizeArray(complexMap);
    
    return complexMap;
}


//----------------------------------------------------------------
// Area adjustment functions
//----------------------------------------------------------------
function mesureArea(map, treshold){
    let mesuredArea = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] > treshold) {
                mesuredArea++;
            }
        }
    }
    return mesuredArea;

}

function adjustArea(map, area, treshold) {
    let mesuredArea = mesureArea(map, treshold);
    
    if (mesuredArea > area) {
        while (mesuredArea > area) {
           
            map = translateZ(map, 1);
            mesuredArea = mesureArea(map, treshold);
        }
        return map
    }
    else if (mesuredArea < area) {
        while (mesuredArea < area) {
          
            map = translateZ(map, -1);
            mesuredArea = mesureArea(map, treshold);
        }
        return map
    }
}


function translateZ(map, step){
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x]-step < 0) {
                map[y][x] = 0;
            }
            else if (map[y][x]-step > 255) {
                map[y][x] = 255;
            }
            else {
                map[y][x] -= step;
            }
            
        }
    }
    return map
    
}


//----------------------------------------------------------------
// Add color to the map
//----------------------------------------------------------------


colorMap = (map, thresholds) => {
    
    let res  = new Array(map.length);
    for (let y = 0; y < map.length; y++) {
        res[y] = new Array(map[y].length);
    }
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            res[y][x] = findColor(map[y][x], thresholds);
        }
    }
    return res;
}

function findColor(level, thresholds){
    // tresholds is a list of sorted objects with atributes : color, treshold
    let value;
    
    for(let i=0;i<thresholds.length-1;i++){
        if ((level < thresholds[i+1].value) && level >= thresholds[i].value){
            
            value = thresholds[i].color;
            
            
        }
    }
    return value;
}

