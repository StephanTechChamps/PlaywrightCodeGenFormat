const fibonacci = (fibonacciNumbers, length) => {
    fibonacciNumbers.push(fibonacciNumbers[fibonacciNumbers.length - 1] + fibonacciNumbers[fibonacciNumbers.length - 2])

    if (fibonacciNumbers.length === length) {
        return fibonacciNumbers;
    } else {
        return fibonacci(fibonacciNumbers, length);
    }
}

const fibonacci2 = (fibonacciNumbers, length) => {
    for (let i = fibonacciNumbers.length; i < length; i ++) {
        fibonacciNumbers[i] = fibonacciNumbers[i - 1] + fibonacciNumbers[i - 2];
    }

    return fibonacciNumbers;
}

// const numbers = fibonacci([0, 1], 99999999);
// console.log(numbers);

const numbers2 = fibonacci2([0, 1], 99999999);
console.log(numbers2);
