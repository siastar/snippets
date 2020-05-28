/*https:diveintohtml5.info/canvas.html            
//https://www.w3schools.com/tags/ref_canvas.asp   
                                                */



var area1_canvas = document.getElementById("area1");

function drawRectangle(xPos,yPos,xDim,yDim) {
  var rectangleCanvas = document.getElementById("area2");
  var rectangleContext = rectangleCanvas.getContext("2d"); //context definition is mandatory
  
  rectangleContext.fillStyle = "green"; //black until changed 
  rectangleContext.fillRect(xPos,yPos,xDim,yDim); //fillRect https://www.w3schools.com/tags/canvas_fillrect.asp
  
};

drawRectangle(10,10,150,150);

/*                                                                                    */

  
var area3Canvas = document.getElementById("area3"); 
var area3Context = area3Canvas.getContext("2d");

//defines length and position vertical lines but does not draw them
for (var x = 0.5; x < 300.5; x += 30) {
  area3Context.moveTo(x, 0); //moves the "pencil" on x axis 
  area3Context.lineTo(x, 420);//set the length of the vertica lines
};

//defines length and position of horizontal lines but does not draw them
for (var y = 0.5; y < 420.5; y += 30) {
 area3Context.moveTo(0, y); //moves the "pencil"on y axis
  area3Context.lineTo(300, y);//set the length of horizontal lines
};

//defines the style and actually draws above defined lines
area3Context.strokeStyle = "black";
area3Context.stroke();
