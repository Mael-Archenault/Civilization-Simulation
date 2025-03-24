


class Simulation {
    constructor(){
        // Simulation objects
        this.map = loadMap();


        // Tools
        this.display = new Display(this.map);
    }


    localSave = ()=>{
        // Save map and simulation state
        localStorage.setItem("mapData", JSON.stringify(this.map.data));
    }
}



let simulation = new Simulation();