


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
            this.human.sleep = 0;
            this.human.time = 10;
            this.human.setPosition(20,20)
            this.human.setMap(this.map);


            addHuman(this.human);

            console.log(this.human.sleep, this.human.time)
            if (this.actions[0].isPossible(this.human)){
                console.log("Action is possible")
                this.actions[0].execute(this.human);
            }
            else {
                console.log("Action is not possible")
            }
            console.log(this.human.sleep, this.human.time)
            
        }, 2000);
        
    }


    localSave = ()=>{
        // Save map and simulation state
        localStorage.setItem("map", JSON.stringify(this.map));
    }
}



let simulation = new Simulation();