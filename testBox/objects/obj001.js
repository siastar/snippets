var bookTitle = prompt("", "Book title please");
var bookAuthor = prompt("", "Book author please");
var bookPages = prompt("", "Book pages please");


var book = {
				title: bookTitle,
				author: bookAuthor,
				pages: 231,
				
				infoBook: function() {
											 return 
											 this.title - 
											 this.author -											
											 this.pages;  
											}				
/*				console.log(this.title);
				console.log(this.author);
				console.log(this.pages);			
				}
*/