"use strict";

window.addEventListener("DOMContentLoaded", start);
let filterBy="all";
let allAnimals = [];

const settings = {
    filter:"all",
    sortBy: "name",
    sortDir: "asc"

}

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
     document.querySelectorAll(`[data-action="filter"]`).forEach
     (button=> button.addEventListener("click", selectFilter));

     document.querySelectorAll(`[data-action="sort"]`).forEach
     (button=> button.addEventListener("click", selectSort));
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
setFilter(filter);
}

function setFilter(filter){
    settings.filterBy = filter;
    buildList();
}

function filterlist(filteredList){
    //let filteredList = allAnimals;
    if(settings.filterBy === "cat"){
        filteredList = allAnimals.filter(isCat);
    } else if(settings.filterBy   ===  "dog"){
        filteredList = allAnimals.filter(isDog);
   }
    return (filteredList);
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

function selectSort(event){
     const sortBy = event.target.dataset.sort;
    const sortDir = event.target.dataset.sortDirection;

    if(sortDir==="asc"){
        event.target.dataset.sortDirection = "desc";
    }
    else{
        event.target.dataset.sortDirection = "asc";  
    }

    //console.log(`user selected ${sortBy} - ${sortDir}`);
    setSort(sortBy, sortDir);
}

function setSort(sortBy, sortDir){
settings.sortBy= sortBy; 
settings.sortDir = sortDir;
buildList();
}


function sortList(sortedList){
    //let sortedList = allAnimals;
    let direction = 1;

    if (settings.sortDir === "desc"){
        direction=-1;
    }else {
        direction=1;
    }
    sortedList = sortedList.sort(sortByProperty);
  

    function sortByProperty(a,b){
       
        if(a[settings.sortBy]< b[settings.sortBy]){
            return -1*direction;
        }else{
            return 1*direction;
        }
    }

    return sortedList;
}


function buildList(){
    const currentList = filterlist(allAnimals);
    const sortedList = sortList(currentList);

    displayList(sortedList);
}



function sortByType(a,b){
    if(a.type< b.type){
        return-1;
    }else{
        return 1;
    }
}


function displayList(animals) {
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


        

