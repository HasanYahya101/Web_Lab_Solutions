let one = "one";
var two = "two";
const three = "three";

console.log(one);
console.log(two);
console.log(three);

// changing the let var value
one = "four";
console.log(one);

// changing the const value
// three = "five"; // error because const can't be changed

// Student class
let student = {
    name: "Hasan",
    age: 21,
    isEnrolled: true
}

console.log(student.name);
console.log(student.age);
console.log(student.isEnrolled);

// array of 5 nums
let arr = [1, 2, 3, 4, 5];
console.log("array length: " + arr.length);
console.log(arr[0]);
console.log(arr[4]);

// swap first and last
let temp = arr[0];
arr[0] = arr[4];
arr[4] = temp;

console.log(arr[0]);
console.log(arr[4]);