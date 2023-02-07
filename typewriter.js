"use strict";

const string = document.querySelector("#typewriter").textContent;
document.querySelector("#typewriter").textContent="";
console.log(string);

console.log("third letter", string[2]);



let iterator=0;
let maxNumberIterations;
let delay; 
    initloop();

    function initloop(){
        console.log("initLoop");
        maxNumberIterations = string.length;
        delay=200;
        loop();
    }
    
    function loop(){
        console.log("loop",string [iterator]);
        iterator ++;
        document.querySelector("#typewriter").textContent += string[iterator];
    
        if(iterator< maxNumberIterations){
            setTimeout(loop,delay);
        }  

    }
