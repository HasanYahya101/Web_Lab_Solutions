function counter() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    };
}

const myCounter = counter();

myCounter();
myCounter();
myCounter();
myCounter();
myCounter();

// Output: 1 2 3 4 5
// This is because the outer function is not run multiple times.
// Rather it saves it's state and returns the inner function which is run multiple times.