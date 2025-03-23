//----------------------------------------------------------------
// Random Generator
//----------------------------------------------------------------

class SeededRandom {
    constructor(seed) {
        this.base_seed = seed;
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

    restart = ()=>{
        this.seed = this.base_seed;
    }
}


class RandomizerManager {
    constructor(seed) {
        this.seed = seed;
        this.mapRandomizer = new SeededRandom(this.seed);
        this.humanRandomizer = new SeededRandom(this.seed*4);
    }

    restart = ()=> {
        this.mapRandomizer.restart();
        this.humanRandomizer.restart();
    }
}

let randomizerManager = new RandomizerManager(468745654);





