class Human {
    constructor(randomizer) {
        // long-time changing characteristics
        this.age = randomizer.nextInt(0,50);
        this.sex = genderPossibility[randomizer.nextInt(0,1)];
        this.name = names[this.sex][randomizer.nextInt(0, names[this.sex].length-1)];
        this.IMC = randomIMC(randomizer);
        this.height = Math.round(randomHeight(this.sex),2);
        this.weight = Math.round(this.IMC*(this.height/100)**2, 2); //

        this.image = new Image()
        this.image.src = "./human-animation/" + this.sex + "/" + randomizer.nextInt(0,1) + ".png";
        console.log(this.image.src)
        

        // position on the map (pixels)
        this.x = 0;
        this.y = 0;

        // short-time changing characteristics
        for (let i = 0; i < states.length; i++) {
            this[states[i]] = 100;
        }


        // skills

        for (let i=0; i< skills.length; i++) {
            this[skills[i]] = randomizer.nextInt(0,50);
        }


        this.map;

        this.animationFrame = 0;

        this.animationLoop = setInterval(()=>{
            this.animationFrame += 1;
            if (this.animationFrame == 4){
                this.animationFrame = 0;
            }
        }, 200);
    }
    toString = ()=>{
        return "Name: " + this.name + "\n" + "Age: " + this.age + "\n"
    }

    setCharacteristics = (object)=>{
        for (let characteristic in object){
            this[characteristic] = object[characteristic];
        }
    }

    setMap = (map)=>{
        this.map = map;
    }

    setPosition = (x, y)=>{
        this.x = x;
        this.y = y;
    }


    delete = ()=>{
        this.map.peopleMap[this.y][this.x] = this.map.peopleMap[this.y][this.x].filter(human => human !== this)

    }
    
}


