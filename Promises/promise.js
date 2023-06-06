// console.log("First");
// console.log("Second");
const fs = require("fs");

let pendingPromise = fs.promises.readFile("f1.txt","utf-8");

// pendingPromise.then(function(data){
//     console.log(data);
//     let f2promise = fs.promises.readFile("f2.txt", "utf-8");
//     f2promise.then(function(data){
//         console.log(data);
//     })

// })
// pendingPromise.catch(function(err){
//     console.log(err);
// })

async function abc(){
    let data2 = await fs.promises.readFile("f2.txt", "utf-8");
    console.log(data2);
    let data = await fs.promises.readFile("f1.txt", "utf-8");
    console.log(data);
}

abc();

// console.log("Hello");
// console.log("HII")
