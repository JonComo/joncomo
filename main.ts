// Will be included in page
var Hammer: any;

var x = 0;
var y = 0;

window.onload = function(event) {
    
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    // Set width and height
    function update_canvas_size(event) {
        var canvas = <HTMLCanvasElement>document.getElementById("canvas")
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }

    // Events
    document.ontouchmove = function(e) { e.preventDefault(); };
    window.onresize = update_canvas_size;

    // draw
    function draw() {
        ctx.fillStyle = "#EEEEEE";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 4.0;

        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x,y,50,0,2*Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(10, 10, canvas.width-20, canvas.height-20);
        ctx.stroke();
    }
    
    // Setup touches
    var hammertime = new Hammer(canvas, null);
    hammertime.add(new Hammer.Pan({threshold: 0}));
    hammertime.on('pan', function(ev) {
        console.log(ev);
        x = ev.center.x;
        y = ev.center.y;
        draw();
    });
    
    update_canvas_size(null);
    
    draw();
    console.log("loaded");
}