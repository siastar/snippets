


const sum = [1, 2, 3].reduce(add,0); // with initial value to avoid when the array is empty

function add(accumulator, a) {
    return accumulator + a;
};

console.log(sum); // 6