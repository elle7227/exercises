"use strict";

window.addEventListener("DOMContentLoaded", start);
let filter="all";
let allAnimals = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start( ) {
    console.log("ready");
    // TODO: Add event-listeners to filter and sort buttons
    registerButtons();
    loadJSON();
}

function registerButtons(){
     document.querySelectorAll(`[data-action="filter"]`).forEach(button=> button.addEventListener("click", selectFilter));
}

async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( preapareObject );
    // TODO: This might not be the function we want to call first

    displayList(allAnimals);

}


function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;
    return animal;
}


function selectFilter(event){
const filter = event.target.dataset.filter;
console.log(`user selected ${filter}`);
filterlist(filter);

}
function filterlist(animalType){
    let filteredList = allAnimals;
    if(animalType === "cat"){
        filteredList = allAnimals.filter(isCat);
    } else if(animalType ===  "dog"){
        filteredList = allAnimals.filter(isDog);
   }
    displayList(filteredList);
}



function isCat (animal){
    if(animal.type === "cat"){
        return true; 
    }else{
        return false; 
    }
}

function isDog (animal){
    if(animal.type == "dog"){
        return true; }
        else{
            return false; 
        }
}      

function compareName(a,b){
    if(a.name< b.name){
        return-1;
    }else{
        return 1;
    }
}


function displayList(animals) {
    animals.sort(compareName);
    //filter = this.dataset.type;
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";
    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);
    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;
    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}


        

