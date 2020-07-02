"use strict";

// var list = [
//     {
//         "price": 100,
//         "qt": 1   
//     } ,
//     {
//         "price": 200,
//         "qt": 2
//     },
//         {
//         "price": 300,
//         "qt": 3
//     }
// ];

// const x = list.length; 
// var val = list.reduce(function(preVal, curVal) {
//     console.log('list before reduce: ', list);
//     return {
//         tot: (preVal.price*preVal.qt + curVal.price*curVal.qt),
//     }
// });

// console.log('list after reduce', list);
// console.log('total :', val);




let initialValue = 0;
let objectsList = [
    {
        x: 1,
        y: 1
    },
    {
        x: 2,
        y: 2
    },
    {
        x: 3,
        y: 3
    },
    {
        x: 4,
        y: 4
    },
    {
        x: 5,
        y: 5
    },
]
let sum = objectsList.reduce(function (total, currentValue) {
    return total + currentValue.x*currentValue.y;
}, initialValue);

console.log(sum);
