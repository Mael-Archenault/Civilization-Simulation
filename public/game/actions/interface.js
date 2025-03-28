
const usedActionList = document.querySelector(".used-action-list")
const actionPage = document.querySelector(".action-page");


setUsedActionList = (actions)=>{
    usedActionList.innerHTML = "";  
    for (let i=0; i<actions.length; i++){
        addActionCard(actions[i]);
    }

}

addActionCard =  (action)=>{
    let listElement = document.createElement('li');
    let name = document.createElement('p');
    let deleteButton  = document.createElement("i");
    
        
    // name
    name.textContent = action.name;
    listElement.appendChild(name);

    // delete button
    deleteButton.classList.add('bx', 'bx-x', 'btn-delete-action');
    listElement.appendChild(deleteButton);

    deleteButton.onclick = () => {
        simulation.actions = simulation.actions.filter(usedAction => usedAction!=action)
        setUsedActionList(simulation.actions);
    }

    name.onclick = () => {
        
        setCharacteristicsOnActionPage(action)
        actionPage.classList.add('active');
    }


    
    
    usedActionList.appendChild(listElement);
}

const disposableRequirementsList = actionPage.querySelector(".disposable-requirements-list");
const permanentRequirementsList = actionPage.querySelector(".permanent-requirements-list");
const productsList = actionPage.querySelector(".products-list");
setCharacteristicsOnActionPage = (action)=>{

    disposableRequirementsList.innerHTML = ""
    permanentRequirementsList.innerHTML = ""
    productsList.innerHTML = ""

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    actionPage.querySelector(".name").textContent = capitalizeFirstLetter(action.name);
    console.log(action.disposableRequirements.length)
    for (requirement in action.disposableRequirements) {
        let requirementElement = document.createElement("li");
        requirementElement.textContent = capitalizeFirstLetter(requirement) + " : " + action.disposableRequirements[requirement];
        disposableRequirementsList.appendChild(requirementElement);
    }

    for (requirement in action.permanentRequirements) {
        let requirementElement = document.createElement("li");
        requirementElement.textContent = capitalizeFirstLetter(requirement) + " : " + action.permanentRequirements[requirement];
        permanentRequirementsList.appendChild(requirementElement);
    }

    for (product in action.products) {
        let productElement = document.createElement("li");
        productElement.textContent = capitalizeFirstLetter(product) + " : " + action.products[product];
        productsList.appendChild(productElement);
    }

}

const actionPageCloseBtn = document.getElementById("btn-close-action-page");

actionPageCloseBtn.onclick = () => {
    actionPage.classList.remove('active');
}