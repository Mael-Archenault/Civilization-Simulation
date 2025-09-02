


class Simulation {
    constructor(){
        // Simulation objects
        this.map = loadMap();



        // Tools
        this.display = new Display(this.map);


        // Testing part
        this.actions = [];
        for (let i = 0; i < defaultActions.length; i++){
            let action = new Action();
            action.loadActionFromJSON(defaultActions[i]);
            this.actions.push(action);
        }

        setUsedActionList(this.actions);



        setTimeout(()=>{
            this.human = new Human(randomizerManager.humanRandomizer);
            this.human.setPosition(10,20)
            addHuman(this.human);
            
        }, 100);
    }


    localSave = ()=>{
        // Save map and simulation state
        localStorage.setItem("map", JSON.stringify(this.map));
    }

    stepForward = ()=>{
        this.map.stepForward();
    }

    stepBackward = ()=>{
        this.map.stepBackward();
    }
}



let simulation = new Simulation();