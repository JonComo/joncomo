var canvas = document.getElementById("canvas");

// Set width and height
canvas.width = Math.min(4000, window.innerWidth);
canvas.height = Math.min(4000, window.innerHeight);

var ctx = canvas.getContext("2d");

// Disable scrolling
document.ontouchmove = function(e) { e.preventDefault() };

// draw a circle

ctx.fillStyle = "#DDDDDD";
ctx.strokeStyle = "#000000";
ctx.lineWidth = 4.0;

ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fill();

ctx.beginPath();
ctx.arc(100,75,50,0,2*Math.PI);
ctx.stroke();