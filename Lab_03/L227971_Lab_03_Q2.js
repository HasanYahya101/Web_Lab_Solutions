let a = 5;
let b = 10;

// arithmetic operations
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);

// comparison operations
console.log(a == b);
console.log(a === b);
console.log(a != b);
console.log(a > b);
console.log(a < b);
console.log(a >= b);
console.log(a <= b);

// other operations
console.log(a > 0 && b > 0);
console.log(a > 0 || b > 0);
console.log(!(a > 0));

// ternary operation
let isMultiple = a % b == 0 ? true : false;
console.log(isMultiple);

// ternary operation with string
let result = a > b ? "a is greater than b" : a < b ? "a is less than b" : "a is equal to b";
console.log(result);