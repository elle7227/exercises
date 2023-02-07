
/*wrote to get all errors - eks. now shows undeclared variables shows as error */
 "use strict";

window.addEventListener("load", sidenVises);

function sidenVises(){
console.log("siden er loaded");
}

const value=2;
if(value){
    console.log("value is true");
}
    else {
        console.log("value is false");

}