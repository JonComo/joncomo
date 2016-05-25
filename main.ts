// Disable scrolling
document.ontouchmove = function(e) { e.preventDefault() };

var canvas = <HTMLCanvasElement>document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set width and height
function update_canvas_size(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}

update_canvas_size(null);
window.onresize = update_canvas_size;

// draw
function draw() {
    ctx.fillStyle = "#DDDDDD";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4.0;

    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(100,100,50,0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(10, 10, canvas.width-20, canvas.height-20);
    ctx.stroke();
}

draw();