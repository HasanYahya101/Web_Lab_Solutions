let array = ["Hello", "I'm", "a", "current", "student", "of", "BSE", "at", "FAST", "NUCES", "Lahore."];

// slice 2 to 6
let sliced = array.slice(2, 7);
console.log(sliced);

// splice
let removed = array.splice(2, 2, "third", "fourth", "elements");
console.log(array);
console.log(removed);

// compare with original
console.log("Array = Sliced" + array === sliced);
console.log("Array = Spliced" + array === removed);
console.log("Sliced = Spliced" + sliced === removed);
console.log("Array = Array" + array === array);

// Remove the last two elements
array.splice(array.length - 2);
console.log(array);

// Insert a new element at the second position
array.splice(1, 0, "new");
console.log(array);

// Reverse the array
let reversed = [];
for (let i = array.length - 1; i >= 0; i--) {
    reversed.push(array[i]);
}
console.log(reversed);

// Extract middle element
let middle = [];
let start = Math.floor(array.length / 2) - 1;
let end = Math.ceil(array.length / 2);
if (array.length % 2 === 0) {
    middle.push(array[start]);
    middle.push(array[end]);
}
else {
    middle.push(array[start]);
}
console.log(middle);