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
    age: 0,
    star: false,
    winner: false
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

    // calling this function so we filter and sort on the first load
    buildList();
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


    const oldElement = document.querySelector(`[data-sort="${settings.sortBy}"]`);

    oldElement.classList.remove("sortby");
    event.target.classList.add("sortby");

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

    if(animal.star===true){
        clone.querySelector("[data-field=star]").textContent = "⭐";
    }else{
        clone.querySelector("[data-field=star]").textContent = "☆";
    }

    clone.querySelector("[data-field=star]").addEventListener("click", clickStar);

    function clickStar(){
        if(animal.star===true){
            animal.star =false;
        }else{
            animal.star=true;
        }
        buildList();
    }

    clone.querySelector("[data-field=winner]").dataset.winner = animal.winner;
    clone.querySelector("[data-field=winner]").addEventListener("click", clickWinner);

    function clickWinner(){
        if(animal.winner===true){
            animal.winner =false;
        }else{
            tryToMakeAWinner(animal);
        }
        buildList();
    }
        // append clone to list
        document.querySelector("#list tbody").appendChild( clone );
    
}

function tryToMakeAWinner(selectedAnimal){
 
    const winners = allAnimals.filter(animal => animal.winner);
    console.log(winners);

    const numberOfWinners = winners.length;
    const other = winners.filter(animal=> animal.type ===selectedAnimal.type).shift();

    //if there is another of the same type
    if(other !==undefined){
        removeOther(other);
    }else if(numberOfWinners >= 2){
        removeAorB(winners[0], winners[1]);
    }else{
        makeWinner(selectedAnimal);
    }

    function removeOther(other){
        //ask user to ignore og remove other
        document.querySelector("#remove_other").classList.remove("hide");
        document.querySelector("#remove_other .closebutton").addEventListener("click", closeDialog);
        document.querySelector("#remove_other #remove_other_button").addEventListener("click", clickRemoveOther);

        document.querySelector("#remove_other [data-field=otherwinner]").textContent=other.name;
  
        //if ignore do nothing 
        function closeDialog(){
            document.querySelector("#remove_other").classList.add("hide");
            document.querySelector("#remove_other .closebutton").removeEventListener("click", closeDialog);
        document.querySelector("#remove_other #remove_other_button").removeEventListener("click", clickRemoveOther);
        }

        //if remove other:
        function clickRemoveOther(){
            removeWinner(other);
            makeWinner(selectedAnimal);
            buildList();
            closeDialog();
        }
      
    }

    function removeAorB(winnerA, winnerB){
        //ask user to ignore og remove a or b

        document.querySelector("#remove_aorb").classList.remove("hide");
        document.querySelector("#remove_aorb .closebutton").addEventListener("click", closeDialog);
        document.querySelector("#remove_aorb #remove_a").addEventListener("click", clickRemoveA);
        document.querySelector("#remove_aorb #remove_b").addEventListener("click", clickRemoveB);

        //show names on buttons
        document.querySelector("#remove_aorb [data-field=winnerA]").textContent=winnerA.name;
        document.querySelector("#remove_aorb [data-field=winnerB]").textContent=winnerB.name;
       

        //if ignore do nothing 
        function closeDialog(){
            document.querySelector("#remove_aorb").classList.add("hide");
            document.querySelector("#remove_aorb .closebutton").removeEventListener("click", closeDialog);
            document.querySelector("#remove_aorb #remove_a").removeEventListener("click", clickRemoveA);
            document.querySelector("#remove_aorb #remove_b").removeEventListener("click", clickRemoveB);
        }

         //if remove a 
        function clickRemoveA(){
            removeWinner(winnerA);
            makeWinner(selectedAnimal);
            buildList();
            closeDialog();
        }
   

        //if remove b
        function clickRemoveB(){
            removeWinner(winnerB);
            makeWinner(selectedAnimal);  
            buildList();
            closeDialog();
        }
         
    }

    function removeWinner(winnerAnimal){
        winnerAnimal.winner = false;
    }

    function makeWinner(animal){
        animal.winner=true; 
    }
}
  