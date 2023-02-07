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





