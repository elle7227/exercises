"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];

const Animal = {
    name:"default-name",
    description: "no-desc",
    age: 0
};

function start( ) {
    console.log("ready");

    loadJSON();
}


function loadJSON() {
    fetch("animals.json")
    .then( response => response.json() )
    .then( jsonData => {
        // when loaded, prepare objects
        prepareObjects( jsonData );
    });
}



function prepareObjects( jsonData ) {
    jsonData.forEach( jsonObject => {
        // TODO: Create new object with cleaned data - and store that in the allAnimals array

        const animal= Object.create(Animal);


        const fullName= jsonObject.fullname;
        const firstSpace = fullName.indexOf(" ");
        const secondSpace = fullName.indexOf(" ", firstSpace+1);
        const lastSpace = fullName.lastIndexOf(" ");

        const name = fullName.substring(0, firstSpace);
        const description = fullName.substring(secondSpace +1, lastSpace);
        const type = fullName.substring(lastSpace);

console.log(`${name} ${description}`);
        
animal.name=name;
animal.description=description;
animal.type=type;
animal.age=jsonObject.age;

        // TODO: MISSING CODE HERE !!!
        allAnimals.push(animal);
    });
  

    displayList();
}

function displayList() {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    allAnimals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.description;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}


