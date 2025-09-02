class Action{
    constructor(){
        this.name;
        this.disposableRequirements;
        this.permanentRequirements;
        this.products;
    }

    setRequirements=(requirements)=>{
        this.requirements = requirements;
    }

    setProducts = (products)=>{
        this.products = products;
    }

    isPossible= (actor)=>{

        for (let requirement in this.disposableRequirements){
            if (actor[requirement]< this.disposableRequirements[requirement]){
                return false;
            }
        }

        for (let requirement in this.permanentRequirements){
            if (actor[requirement]< this.permanentRequirements[requirement]){
                return false;
            }
        }
        return true;
    }
    execute=(actor)=>{

        actor.consumeResources(this.disposableRequirements);
        actor.addProducts(this.products);
        actor.addToHistory(this);
        
        
    }

    reverse = (actor)=>{

        actor.removeFromHistory();
        actor.removeProducts(this.products);
        actor.addResources(this.disposableRequirements);
    }

    loadActionFromJSON = (action)=>{
        this.name = action["name"];
        this.disposableRequirements = action["disposableRequirements"];
        this.permanentRequirements = action["permanentRequirements"];
        this.products = action["products"];
    }

}