let string = "Hello, I'm a current student of BSE at FAST NUCES Lahore.";
console.log(string);

// first and last 5 chars
let first_5_chars = string.substring(0, 5);
console.log(first_5_chars);
let last_5_chars = string.substring(string.length - 5);
console.log(last_5_chars);

// replace the a with the (third word)
let words = string.split(" ");
let third_word = "the";
words[2] = third_word;
string = words.join(" ");
console.log(string);

// upper and lower case
let upper = string.toUpperCase();
console.log(upper);
let lower = string.toLowerCase();
console.log(lower);

// reverse the string
let reversed = "";
for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
}
console.log(reversed);

// count of a
let chars = string.split("");
let count = 0;
for (let i = 0; i < chars.length; i++) {
    if (chars[i] == "a" || chars[i] == "A") {
        count++;
    }
}
console.log("count of a: " + count);

// second word without using split
let index = 0;
for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) === ' ') {
        index = i;
        break;
    }
}
let second_word = [];
for (let j = index + 1; j < string.length; j++) {
    if (string.charAt(j) !== ' ') {
        second_word.push(string.charAt(j));
    }
    else {
        break;
    }
}
second_word = second_word.join("");
console.log("Second word: " + second_word);