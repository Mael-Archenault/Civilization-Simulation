//----------------------------------------------------------------
// Random Generator
//----------------------------------------------------------------

class SeededRandom {
    constructor(seed) {
        this.base_seed = seed;
        this.seed = seed;
        this.seeds = [this.seed];

        // Set up parameters
        this.a = 1664525;
        this.c = 1013904223;
        this.m = 2 ** 32;
        
    }
    

    // Forward
    next = ()=>{
    this.seeds.push((this.a * this.seeds[this.seeds.length -1] + this.c) % this.m);

    return this.seeds[this.seeds.length - 1] / this.m;
    }

    // Backward
    previous =()=> {
        this.seeds.pop()
    }
    // Function to generate a random integer between min and max (inclusive)
    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    // Function to generate a random float between min and max
    nextFloat(min, max) {
        return this.next() * (max - min) + min;
    }

    restart = ()=>{
        this.seed = this.base_seed;
    }
}



  
  

class RandomizerManager {
    constructor(seed) {
        this.seed = seed;
        this.mapRandomizer = new SeededRandom(this.seed);
        this.humanRandomizer = new SeededRandom(this.seed*4);
        this.actionRandomizer = new SeededRandom(this.seed*5);
    }

    restart = ()=> {
        this.mapRandomizer.restart();
        this.humanRandomizer.restart();
        this.actionRandomizer.restart();
    }
}

let randomizerManager = new RandomizerManager(468745654);





