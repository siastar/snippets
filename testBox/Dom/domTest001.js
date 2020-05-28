"use strict";

//html file is domTest00x.html

let rows =8;
let cols=12;
let table = document.getElementById('board');
for (let r = 0 ; r < rows ; r++){
  let row = table.insertRow(-1);
  for (let c = 0 ; c < cols ; c++){
    let cell = row.insertCell(-1);
    cell.setAttribute('id', 'abcdefgh'.charAt(c) + (rows-r));
    cell.setAttribute('class', 'cell ' + ((c+r) % 2 ? 'odd' : 'even'));
  };
};

/* a list of common attributes                                                             
https://www.w3schools.com/html/html_attributes.asp                                         
https://www.w3schools.com/tags/ref_attributes.asp                                          
                                                                                           
alt 			Specifies an alternative text for an image, when the image cannot be displayed 
disabled 	Specifies that an input element should be disabled                             
href 			Specifies the URL (web address) for a link                                     
id 			Specifies a unique id for an element                                           
src 			Specifies the URL (web address) for an image                                   
style 		Specifies an inline CSS style for an element                                   
title 		Specifies extra information about an element (displayed as a tool tip)         
                                                                                         */

let val1 = "testing getElementById"; 
let val2 = "innerHTML, what else ???";

document.getElementById("testDom1").innerHTML = val1;
document.getElementById("testDom2").innerHTML = val2;

let accessVar = document.getElementById("testDom2");
console.log(accessVar);



let test1 = document.getElementById("testAccess");

console.log(test1.id);
console.log(test1.href);
console.log(test1.title);
