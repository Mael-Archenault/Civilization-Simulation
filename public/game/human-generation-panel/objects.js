class Human {


    static instances = [];

    constructor(randomizer) {
        // long-time changing characteristics
        this.randomizer = randomizer;

        this.age = this.randomizer.nextInt(0,50);
        this.sex = genderPossibility[this.randomizer.nextInt(0,1)];
        this.name = names[this.sex][this.randomizer.nextInt(0, names[this.sex].length-1)];
        this.IMC = randomIMC(this.randomizer);
        this.height = Math.round(randomHeight(this.sex),2);
        this.weight = Math.round(this.IMC*(this.height/100)**2, 2);

        this.image;
        
        

        // position on the map (pixels)
        this.x = 0;
        this.y = 0;

        // short-time changing characteristics
        for (let i = 0; i < states.length; i++) {
            this[states[i]] = 100;
        }


        // skills

        for (let i=0; i< skills.length; i++) {
            this[skills[i]] = this.randomizer.nextInt(0,50);
        }

        // goods

        for (let i=0; i<goods.length; i++) {
            this[goods[i]] = 100;
        }


        this.map;

        this.animationFrame = 0;
        this.setAnimationSprites();

        this.animationLoop = setInterval(()=>{
            this.animationFrame += 1;
            if (this.animationFrame == 4){
                this.animationFrame = 0;
            }
        }, 200);


        Human.instances.push(this);
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

        Human.instances = Human.instances.filter(instance => instance != this);
    }

    setAnimationSprites = ()=>{
        this.image = new Image()
        this.image.src = "./human-animation/" + this.sex + "/" + this.randomizer.nextInt(0,1) + ".png";
    }

    consumeResources = (resources)=>{
        console.log(resources);
        for (let resourcename in resources){
            this[resourcename] -= resources[resourcename];
            if (this[resourcename] <= 0){
                this[resourcename] = 0;
            }
        }
    }

    addProducts = (products)=>{
        for (let productname in products){
            console.log("Adding " + products[productname]+ " to " + productname);
            this[productname] += products[productname];
        }
    }

    
}


