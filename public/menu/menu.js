let helpBtn = document.querySelector(".help-icon");
let helpContent = document.querySelector(".help-content");

helpBtn.addEventListener("click", () => {
    helpContent.classList.toggle("visible");
});



let mapGeneratorBtn1 = document.querySelector(".map-generator-button1");
let mapGeneratorContent = document.querySelector(".map-generator");

mapGeneratorBtn1.addEventListener("click", () => {
    mapGeneratorContent.classList.toggle("visible");
});


let saveButton = mapGeneratorContent.querySelector(".save");

saveButton.addEventListener("click", () => {
    mapGeneratorContent.classList.toggle("visible");
});
