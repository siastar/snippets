let target = {};

let test0 = { a: 1, b: 2 };
let test1 = { c: 3, d: 4 };
let test2 = { e: 5, f: 6 };

console.log("target", target);

// Object.assign(target, test0);
// console.log("target", target);

// Object.assign(target, test1);
// console.log("target", target);

// Object.assign(target, test2);
// console.log("target", target);

for (let i = 0; i < 3; i++) {
    let name = 'test'+i
    Object.assign(target, name)
    console.log('target:',target)
}
