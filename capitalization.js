
//capitalize first letter in the string

const fullName = "ellen hein soerensen";
const secondLetter  = fullName.charAt(0).toUpperCase() + fullName.slice(1);
console.log(secondLetter);


//capitalize first letter in the parameter (str)
function consoleCap(str ){
console.log(str.charAt(4).toUpperCase()+ str.slice(1));
}

//setting parameter to ellen, so we console log Ellen 
consoleCap(`ellen`);
