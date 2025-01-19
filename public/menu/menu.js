let helpBtn = document.querySelector(".help-icon");
let helpContent = document.querySelector(".help-content");



helpBtn.addEventListener("click", () => {
    helpContent.classList.toggle("visible");
});



let mapGeneratorBtn1 = document.querySelector(".map-generator-button1");
let mapGeneratorBtn2 = document.querySelector(".map-generator-button2");
let mapGeneratorBtn3 = document.querySelector(".map-generator-button3");

let mapGeneratorContent = document.querySelector(".map-generator");

if (mapGeneratorBtn1!=null){
  mapGeneratorBtn1.addEventListener("click", () => {
    mapGeneratorContent.classList.toggle("visible");
});
}

if (mapGeneratorBtn2!=null){
  mapGeneratorBtn2.addEventListener("click", () => {
    mapGeneratorContent.classList.toggle("visible");
});
}

if (mapGeneratorBtn3!=null){
  mapGeneratorBtn3.addEventListener("click", () => {
    mapGeneratorContent.classList.toggle("visible");
});
}


////////////////////////////////////////////////


let cancelButton = mapGeneratorContent.querySelector(".cancel");
let saveButton = mapGeneratorContent.querySelector(".save");

cancelButton.addEventListener("click", () => {
    mapGeneratorContent.classList.toggle("visible");
});

saveButton.addEventListener("click", () => {
    
    mapGeneratorContent.classList.toggle("visible");
    keys = mapGeneratorFrame.getKeys();

    fetch("/map/save", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({keys: keys})
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.redirected) {
            window.location.href = response.url; // Navigate to the redirected URL
          }
        return response; // Parse JSON response
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

});

let mapGeneratorFrame = document.querySelector(".inner-page").contentWindow;


////////////////////////////////////////////////

let deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach(button => {
  button.addEventListener("click", () => {
    mapId = button.getAttribute("data-id");
    fetch("/map/delete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mapId: mapId})
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.redirected) {
            window.location.href = response.url; // Navigate to the redirected URL
          }
        return response; // Parse JSON response
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  })
})