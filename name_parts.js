const fullName = "Ellen Hein Soerensen";
/*her splitter vi ved mellemrum, og vælger index 0 for at vise først ord
(ordet inden første mellemrum)*/
const firstNameVesrsion1 = fullName.split(" ")[0];

const firstName = fullName.substring(0,6);
const secondName = fullName.substring(6,11);
const thirdName = fullName.split(" ")[2];


/*viser navnene i inspekt*/
console.log(firstName);
console.log(secondName);
console.log(thirdName);


//showing each substring (word) from the parameter you put in the function (str)
function consoleCap(str){
    console.log(str.split(" "));
}
//putting the parameter in the function so this shwos in console.
consoleCap("ellen hein bent sørensen");


function showFullName(firstname,secondname,thirdname){
    console.log(`${firstname} ${secondname} ${thirdname}`);
    }
    showFullName("ellen", "hein", "Sørensen");

    //insted aof typing the "" aorund the names, you could also be done with const defining the names
    // const fristname= blavla; 
    // const secondname= blavla; 
    


