let users = [
    {id: 1, name: "John", age:22},
  {id: 2, name: "Pete", age:33},
  {id: 3, name: "Mary", age:44}
];

let user = users.find(item => item.id == 2);

console.log(user); // John
