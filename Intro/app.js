// console.log("Hi");

// let x=10.7777;
// // x="sdfsdf";
// console.log(typeof x);

// var y=2;
// var z=5;
// console.log(x+y);

// {
//     var x=3;
// }
// console.log(x);

// myname= "abc";
// var myname;

// console.log(myname);

// const x="abc";
// x="def";

// let x=5;
// let y="5";
// let z=10;
// console.log(x===z);

// let x=12+5+"india";
// let y="india"+12+5;

// console.log(x);
// console.log(y);

// let z=BigInt("738642738929378598473594835876975");
// console.log(z);

// const fruits = ["Apple","Banana"];
// // fruits=["Mango"]
// fruits.push("Guava");
// console.log(typeof fruits);

// const person={
//     firstName:"abc",
//     lastName:"def",
//     age:50,

//     fullname : function(){
//         return this.firstName+" "+this.lastName;
//     }

// }

// person.gender="male";

// console.log(person.fullname());

// function addition(a,b){
//      let c=a+b;
//      console.log("Inside addition");
// }

// // let result = addition();

// addition(4);

// let mybutton = document.getElementById("btn");
// console.log(mybutton);

// mybutton.addEventListener("mouseover",function(){
//     alert("Button has been hovered")
// })

// let x="abc";
// let y=new String("abc");

// console.log(x===y);

// let text = "Apple, Banana, Kiwi";
// let part = text.replace("Apple","Guava");

// console.log(part);
// let a="qwe";
// let b="asd";
// console.log(a+" "+b);

// let text="      jaydip  ";
// console.log(text);

// let myname="Amit Kumar Roy";

// let arr = myname.split(" ");
// let ans="";
// for(let i=0;i<arr.length;i++){
//     ans += arr[i];
// }

// console.log(ans);

// let x=5;
// let y=10;

// console.log(`The addition is ${x+y}`)

// let cars=["a","b","c"];
// cars[0]="d";
// let ans = cars.join(" ");
// console.log(ans);
// let p = document.getElementById("demo");
// let mydiv = document.createElement("div");
// mydiv.style.height = "200px";
// mydiv.style.width = "200px";
// p.appendChild(mydiv);


// const cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];

// let text = "";

// for (let i = 0; i < cars.length; i++) {
//   text += cars[i]+"<br>";
// }

// document.getElementById("demo").innerHTML = text;

// const person = { fname: "John", lname: "Doe", age: 25 };

// let txt = "";
// for (let x in person) {
//   txt += person[x] + " ";
// }

// const cars = ["BMW", "Volvo", "Mini"];

// let text = "";
// for (let x in cars) {
//   text += cars[x]+" ";
// }

// console.log(text);

// const fruits = new Map();


// fruits.set("apples", 500);
// fruits.set("bananas", 300);
// fruits.set("oranges", 200);

// console.log(fruits.get("apples"));

// let s="abcd";
// console.log(typeof s)
// console.log(parseInt(s))


// const person = {
//   fullName: function () {
//     return this.firstName;
//   },
// };
// const person1 = {
//   firstName: "John",
//   lastName: "Doe",
// };
// const person2 = {
//   firstName: "Mary",
//   lastName: "Doe",
// };


// console.log(person.fullName.call(person1));


// const person = {
//   fullName: function (city, country) {
//     return this.firstName + " " + this.lastName + "," + city + "," + country;
//   },
// };

// const person1 = {
//   firstName: "John",
//   lastName: "Doe",
// };

// console.log(person.fullName.call(person1, "Oslo", "Norway"));

// const person = {
//   fullName: function (city, country) {
//     return this.firstName + " " + this.lastName + "," + city + "," + country;
//   },
// };

// const person1 = {
//   firstName: "John",
//   lastName: "Doe",
// };

// console.log(person.fullName.apply(person1, ["Oslo", "Norway"]));

// const person = {
//   firstName: "John",
//   lastName: "Doe",
//   fullName: function () {
//     return this.firstName + " " + this.lastName;
//   },
// };

// const person1 = {
//   firstName: "Hege",
//   lastName: "Nilsen",
// };

// console.log(person.fullName.apply(person1));
// console.log(person.firstName)
// document.querySelector(".demo").innerHTML="ghi";
// document.querySelector("[jaydip]").innerHTML = "<h1>asdasd</h1>";


// const person = {
//   fullName: function () {
//     return this.firstName+" "+this.lastName;
//   },
// };
// const person1 = {
//   firstName: "John",
//   lastName: "Doe",
// };
// const person2 = {
//   firstName: "Mary",
//   lastName: "Doe",
// };
// // console.log(person.fullName.bind(person1));
// let fn = person.fullName.bind(person1);
// console.log(fn());


// let animals = ["tiger","lion","dog"];

// animals.forEach((animal)=>{
//   console.log(animal)
// })