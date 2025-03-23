
randomIMC = (randomizer)=>{
    let value = randomizer.nextInt(0,100);
    if (value<10){
        return randomizer.nextInt(15,19);
    }
    else if (value<60){
        return randomizer.nextInt(19,25);
    }
    else if (value< 90){
        return randomizer.nextInt(25,30);
    }
    else if (value< 96){
        return randomizer.nextInt(30,35);
    }
    else if (value< 99){
        return randomizer.nextInt(35,40);
    }
    else {
        return randomizer.nextInt(40,60);
    }
}
randomHeight = (sex)=>{
    const [z0, _] = boxMullerTransform();

    // Convertir en distribution normale avec moyenne mu et écart-type sigma
    const mu = (sex=="male")?170:162;  // Moyenne en cm
    const sigma = 7; // Écart-type en cm
    const randomHeight = mu + z0 * sigma;

    return randomHeight;
}



function boxMullerTransform() {
    // Générer deux nombres aléatoires uniformes dans l'intervalle (0, 1)
    const u1 = Math.random();
    const u2 = Math.random();

    // Appliquer la transformation de Box-Muller
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

    // z0 et z1 suivent une distribution normale standard (moyenne 0, écart-type 1)
    return [z0, z1];
}


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




function addRandomHuman(display){
    target = display.target
    map = display.mapData

    human = new Human(randomizerManager.humanRandomizer)
    human.setMap(map);
    human.setPosition(target.pixelX,target.pixelY);

    map.peopleMap[human.y][human.x].push(human);
    setPeopleList(map, target.pixelX, target.pixelY);
    display.updateDisplay(map);
}

function removeHuman(human){
    human.delete()
}

function addHuman(display, human){
    map = display.mapData
    target = display.target

    human.setMap(map);
    human.setPosition(target.pixelX,target.pixelY);

    map.peopleMap[human.y][human.x].push(human);
    setPeopleList(map, human.x, human.y);
    display.updateDisplay(map);
}

createHumanFromCharacteristics = (characteristics)=>{
    human = new Human(randomizerManager.humanRandomizer)
    const keys = Object.keys(characteristics);
    for (i = 0; i<keys.length; i++) {
        human[keys[i]] = characteristics[keys[i]];
    }
    return human
}

