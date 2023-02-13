"use strict";
const soundOne=document.querySelector("#typekey1");
const soundTwo=document.querySelector("#typekey2");
const soundThree=document.querySelector("#typekey3");

const string = document.querySelector("#typewriter").textContent;
document.querySelector("#typewriter").textContent="";
console.log(string);

console.log("third letter", string[2]);



let iterator=0;
let maxNumberIterations;
let delay; 
let playing = true; 


    
document.querySelector("#sound_click").addEventListener("click", initloop);


    function initloop(){
        console.log("initLoop");
        maxNumberIterations = string.length;
        delay=200;
        document.querySelector("#sound_click").addEventListener("click", finishloop);
        loop();

    }
    
    function loop(){
        console.log("loop",string [iterator]);
        iterator ++;
        document.querySelector("#typewriter").textContent += string[iterator];
       soundOne.play();

        if(iterator< maxNumberIterations && playing===true){
            setTimeout(loop,delay);
        }  

    }

    function finishloop (){
        if(playing){
            playing=false
            document.querySelector("#sound_click").textContent="start";
        }else {
            playing=true
            loop();
            document.querySelector("#sound_click").textContent="stop";
        } 
    }
