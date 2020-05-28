var input = [1, 2, 3, 5, 43, 61];

var duplicates = input.reduce(function(acc, el, i, arr) {
  if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
}, []);


console.log(duplicates);