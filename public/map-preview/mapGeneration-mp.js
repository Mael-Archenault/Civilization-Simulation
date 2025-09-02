
//----------------------------------------------------------------
// Initializations main variables
//----------------------------------------------------------------

var thresholds = [{value:0, color:"rgba(0,0,0,0)", name:"Water"},{value:10, color:"rgb(208,220,81)", name:"Sand"},{value:30, color: "rgb(136,93,81)", name:"Ground"},{value:50, color: "rgb(54,136,41)", name:"Grassland"},{value:200, color: "rgb(77,79,75)", name:"Mountain"},{value:240, color: "rgb(255,255,255)", name:"Peak"},{value:260, color: "rgb(255,255,255)", name:"Sky"}]



//----------------------------------------------------------------
// Perlin Noise Generator
//----------------------------------------------------------------


function lerp(a, b, t) {
    return a + (b - a) * t;
}

function randomGradient(ix, iy, randomizer) {
    const random = randomizer.nextFloat(0,6) ;
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

function generatePerlinNoise(width, height, scale = 1, randomizer) {
    let noise = new Array(height);
    let vectors = [];
    let endI =  Math.floor(height/scale)+2;
    let endJ = Math.floor(width/scale)+2;

    for (let i = 0; i < endI; i++) {
        line = [];
        for (let j = 0; j < endJ; j++) {
                line.push(randomGradient(j,i, randomizer));
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

function generateOctavePerlinNoise(width, height, scale, octaves, persistence, randomizer) {
    let totalNoise = new Array(height);
    for (let y = 0; y < height; y++) {
        totalNoise[y] = new Array(width).fill(0);
    }

    let amplitude = 1;
    let frequency = 1;
    let maxValue = 0; // Used for normalization

    for (let o = 0; o < octaves; o++) {
        let octaveNoise = generatePerlinNoise(width, height, scale * frequency, randomizer);

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
        return array.mapData(() => 1); // or 0.5 or any constant value
    }

    // Normalize the array

    let normalizedArray = array;
    for (let i = 0; i < array.length; i++) {
        normalizedArray[i] = normalizedArray[i].map(value => (value - min) *255/ range);
    }
    
    return normalizedArray;
}


function smoothing2D(mapData) {
    let smoothedMap = new Array(mapData.length);
    for (let y = 0; y < mapData.length; y++) {
        smoothedMap[y] = new Array(mapData[y].length);
        for (let x = 0; x < mapData[y].length; x++) {
            smoothedMap[y][x] = averageOfNeighbors(mapData, x, y);
        }
    }
    return smoothedMap;
}

function averageOfNeighbors(mapData, x, y) {
    let sum = 0;
    let count = 0;
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
            let newX = x + offsetX;
            let newY = y + offsetY;
            if (newX >= 0 && newX < mapData[0].length && newY >= 0 && newY < mapData.length) {
                sum += mapData[newY][newX];
                count++;
            }
        }
    }
    return sum / count;
}

function cropCorners(mapData, randomizer){
    a = mapData.length/2;
    b = mapData[0].length/2;
    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
            if (((x-mapData[0].length/2)/a)**2 + ((y-mapData.length/2)/b)**2 > 1) {
                if (randomizer.next()>0.4){
                    mapData[y][x] = 0;
                }
            }
        }
    }
    return mapData;
}

//----------------------------------------------------------------
// Final mapData Generator
//----------------------------------------------------------------
function generateMap(width, height, area, randomizer) {
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


    let innerMap = generateOctavePerlinNoise(Math.round(6*width/8), Math.round(6*height/8), Math.round(width/8), octaves, persistence, randomizer);

    
    
    innerMap = normalizeArray(innerMap);
    innerMap = cropCorners(innerMap, randomizer);

    

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

generateForestMap = (width, height, area, randomizer)=> {
    let scale = width/4; // Experiment with this value
    let octaves = 2; // Number of layers
    let persistence = 1; // Contribution of each octave
    let res = generateOctavePerlinNoise(width, height, Math.round(width/8), octaves, persistence, randomizer);
    return normalizeArray(res);
}

//----------------------------------------------------------------
// Area adjustment functions
//----------------------------------------------------------------
function mesureArea(mapData, treshold){
    let mesuredArea = 0;
    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
            if (mapData[y][x] > treshold) {
                mesuredArea++;
            }
        }
    }
    return mesuredArea;

}

function adjustArea(mapData, area, treshold) {
    let mesuredArea = mesureArea(mapData, treshold);
    
    if (mesuredArea > area) {
        while (mesuredArea > area) {
           
            mapData = translateZ(mapData, 1);
            mesuredArea = mesureArea(mapData, treshold);
        }
        return mapData
    }
    else if (mesuredArea < area) {
        while (mesuredArea < area) {
          
            mapData = translateZ(mapData, -1);
            mesuredArea = mesureArea(mapData, treshold);
        }
        return mapData
    }
}


function translateZ(mapData, step){
    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
            if (mapData[y][x]-step < 0) {
                mapData[y][x] = 0;
            }
            else if (mapData[y][x]-step > 255) {
                mapData[y][x] = 255;
            }
            else {
                mapData[y][x] -= step;
            }
            
        }
    }
    return mapData
    
}


//----------------------------------------------------------------
// Add color to the mapData
//----------------------------------------------------------------


colorMap = (labelledMap, forestMap, forest_threshold, thresholds) => {
    
    let res  = new Array(labelledMap.length);
    for (let y = 0; y < labelledMap.length; y++) {
        res[y] = new Array(labelledMap[y].length);
    }

    for (let y = 0; y < labelledMap.length; y++) {
        for (let x = 0; x < labelledMap[y].length; x++) {
            if (labelledMap[y][x]==3 && forestMap[y][x] > forest_threshold) {
                res[y][x] = "rgb(24,65,17)";
            }
            else{
                res[y][x] = thresholds[labelledMap[y][x]].color;
            }
        }
    }
    return res;
}


// the labels are defined as follow :

// | Label          | Value |
// |----------------|-------|
// | Water          | 0     |
// | Sand           | 1     |
// | Ground         | 2     |
// | Grass          | 3     |
// | Mountain bottom| 4     |
// | Peak           | 5     |
// | Forest         | 6     |

labelMap = (mapData, thresholds) => {
    let res  = new Array(mapData.length);
    for (let y = 0; y < mapData.length; y++) {
        res[y] = new Array(mapData[y].length);
    }
    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
            res[y][x] = findLabel(mapData[y][x], thresholds);
        }
    }
    return res;
}
function findLabel(level, thresholds){
    // tresholds is a list of sorted objects with attributes : color, treshold
    
    for(let i=0;i<thresholds.length-1;i++){
        if ((level < thresholds[i+1].value) && level >= thresholds[i].value){
            
            return i;
            
        }
    }
    
}

function findType(color, thresholds) {
    for (let i = 0; i < thresholds.length; i++) {
        if (color == thresholds[i].color) {
            return thresholds[i].name;
        }
    }
    return "Forest";
}

