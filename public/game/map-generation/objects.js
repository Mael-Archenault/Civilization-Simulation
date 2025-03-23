class Map {
    constructor(size = 110, area = 110*110*0.45, forestPercent = 50, randomizer){
        randomizer.restart();
        this.heightLevelMap = generateMap(size, size, area, randomizer);
        this.labelledMap = labelMap(this.heightLevelMap, thresholds)
        this.forestMap = generateForestMap(size, size, thresholds, randomizer);

        this.coloredMap = colorMap(this.labelledMap, this.forestMap, (1-forestPercent/100)*255, thresholds); // convert heights of the mapData to colors

        this.width = this.heightLevelMap[0].length;
        this.height = this.heightLevelMap.length;

        // map that contains all of the people

        this.peopleMap = new Array(this.height);
        for (var i = 0; i < this.height; i++){
            this.peopleMap[i] = new Array(this.width);
            for (var j = 0; j < this.width; j++){
                this.peopleMap[i][j] = new Array();
            }
        }
        
        // map that contains all the buildings

        this.buildingMap = new Array(this.height);
        for (var i = 0; i < this.height; i++){
            this.buildingMap[i] = new Array(this.width);
            for (var j = 0; j < this.width; j++){
                this.buildingMap[i][j] = new Array();
            }
        }
        
    }
}