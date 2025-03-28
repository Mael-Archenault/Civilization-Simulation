
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




function addRandomHuman(pixelX, pixelY){
    target = simulation.display.target
    map = simulation.display.map
    console.log(target.pixelX,target.pixelY)   
    human = new Human(randomizerManager.humanRandomizer)
    human.setMap(map);
    human.setPosition(pixelX,pixelY);

         
    map.peopleMap[human.y][human.x].push(human);
    setPeopleList(map, human.x, human.y);
    simulation.display.updateDisplay();
}

function removeHuman(human){
    human.delete()
}

function addHuman(human){
    map = simulation.display.map
    target = simulation.display.target

    human.setMap(map);

    map.peopleMap[human.y][human.x].push(human);
    setPeopleList(map, human.x, human.y);
    simulation.display.updateDisplay();
}

createHumanFromCharacteristics = (characteristics)=>{
    human = new Human(randomizerManager.humanRandomizer)
    const keys = Object.keys(characteristics);
    for (i = 0; i<keys.length; i++) {
        human[keys[i]] = characteristics[keys[i]];
    }
    human.setAnimationSprites();
    console.log(human);

    return human
}

