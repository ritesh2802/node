
// The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched. The first element will be execPath. See process.argv0 if access to the original value of argv[0] is needed. The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command-line arguments.

// let inputArr = process.argv;

// let inputArr = process.argv();
// argv is a property not a function
// TypeError: process.argv is not a function

/* [
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Surendra Singh\\Desktop\\FJP5\\node\\wcat\\myWcat.js'
]
*/

const fs = require("fs");
let inputArr= process.argv.slice(2);
console.log(inputArr);


let filesArr = [];
let optionsArr =[]; 
// let createArr=[];
// optionsArr isliye bana taki -s,-n,-n store kr ske inka kaam padega aage
for(let i=0;i<inputArr.length;i++){
    let firstChar = inputArr[i].charAt(0);
    if(firstChar=="-"){
        optionsArr.push(inputArr[i]);
    }
    // else if(firstChar==">"){
    //     createArr.push(inputArr[i]);
    // }
    else{
    filesArr.push(inputArr[i]);
    }
}
console.log(optionsArr);
console.log(filesArr);
// console.log(createArr)

// check if all files exist

for(let i=0;i<filesArr.length;i++){
    let doesExist = fs.existsSync(filesArr[i]);
    if(!doesExist){
    console.log("not found");
    // return; dekhna padega kyun kaam ni kar rha
    process.exit();

    }
}

let content="";
for(let i=0;i<filesArr.length;i++){
    let fileContent  = fs.readFileSync(filesArr[i].trim());
    content+=(fileContent+"\n");
}
// console.table(content);


// -------> ye galti se hua but pooochna h baht time gya isme
// let contentArr = [];
// contentArr.push(content.split("\r\n"));
// console.log(contentArr);
// ----->   doubt 2???


let contentArr= content.split("\r\n");

// console.table("after split ");
//  console.log(contentArr);   

// Array.includes => Determines whether an array includes a certain element, returning true or false as appropriate.
let isSpresent = optionsArr.includes("-s");
if(isSpresent){
    
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            // " " aur "" alag hai...
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]= null;
        }

        // ye contentArr[i]=="\n" && contentArr[i-1]=="" wala mujhe hi krna pad rha h as mere system me ye dikha rh ah pata ni kyun khair dekh lena isse?
        else if(contentArr[i]=="\n" && contentArr[i-1]==""){
            contentArr[i]= null;
        }

    }
}

// console.log("null wala kaam krne ke baaad ");
// console.table(contentArr);

let tempArr=[];
for(let i=0;i<contentArr.length;i++){
    if(contentArr[i]!=null){
        tempArr.push(contentArr[i]);
    }
}

contentArr= tempArr;
console.table(contentArr);





// console.log(-n nd -b ek baaat jo dhyan dene wli h  ye h ki -n aur -b mutually exclusiv h

let ion = optionsArr.indexOf("-n");
let iob = optionsArr.indexOf("-b");
let finalOption="";

        if(ion!=-1 && iob!=-1){
            if(ion<iob){
            finalOption ="-n";
        }
        else{
            finalOption="-b";
        }
        
    }
        
        else{
            if(ion!=-1){
                finalOption="-n";
            }else if(iob!=-1){
                finalOption="-b";
            }
            
        }


if(finalOption=="-n"){
    modifyContentByN();
}
else if(finalOption=="-b"){
    modifyContentByB();
}

function modifyContentByN(){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=(i+1)+")"+contentArr[i];
    }
    // console.table(contentArr);
    console.log(contentArr);
}


function modifyContentByB(){
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        
        if(contentArr[i]!=""){
        contentArr[i]=count+")"+contentArr[i];
        count++;
        }
    }
    // console.table(contentArr);
    console.log(contentArr);
}