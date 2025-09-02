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


        Human.map = this;
        
    }

    stepForward = ()=>{
        let modifiedHumans = new WeakSet();
        for (let i = 0; i<this.peopleMap.length; i++){
            for (let j = 0; j<this.peopleMap[i].length; j++){
                for (let people of this.peopleMap[i][j]){
                    if (!modifiedHumans.has(people)){
                        people.time = 40;
                        
                        let action = people.chooseAction()
                            while (action!= null){
                                console.log("Forward:", action.name);
                                action.execute(people)
                                action = people.chooseAction()
                            }
                            
                        
                        modifiedHumans.add(people)
                    }
                    
                }
            }
        }
        
    }

    stepBackward = ()=>{
        let modifiedHumans = new WeakSet();
        for (let i = 0; i<this.peopleMap.length; i++){
            for (let j = 0; j<this.peopleMap[i].length; j++){
                for (let people of this.peopleMap[i][j]){
                    if (!modifiedHumans.has(people)){
                        people.time = 0;
                        let action = people.getLastAction()
                            while (action != null && people.time < 40){
                                console.log("Backward :", action.name);
                                action.reverse(people)
                                action = people.getLastAction()
                            }
                            
                        
                        modifiedHumans.add(people)
                    }
                    
                }
            }
        }
    }
}