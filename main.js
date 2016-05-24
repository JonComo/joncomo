var canvas;
var ctx;
var x = 75;
var y = 50;
var WIDTH = 800;
var HEIGHT = 600;
var dragok = false;
var Atom = (function () {
    function Atom(x, y) {
        this.x = x;
        this.y = y;
    }
    Atom.prototype.render = function (ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 10);
        ctx.closePath();
        ctx.fill();
    };
    return Atom;
}());
var Point = (function () {
    function Point(x, y, start) {
        this.x = x;
        this.y = y;
        this.start = start;
    }
    return Point;
}());
function renderPoints(ctx, points) {
    ctx.beginPath();
    var lastx = 0;
    var lasty = 0;
    points.forEach(function (p) {
        if (p.start) {
            ctx.moveTo(p.x, p.y);
        }
        else {
            ctx.lineTo(lastx, lasty, p.x, p.y);
        }
        lastx = p.x;
        lasty = p.y;
    });
    ctx.stroke();
}
var atoms = [];
//var a = new Atom(20, 20);
//atoms.push(a);
var points = [];
function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}
function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
function draw() {
    clear();
    ctx.fillStyle = "#FAF7F8";
    rect(0, 0, WIDTH, HEIGHT);
    atoms.forEach(function (a) {
        console.log("test");
        a.render(ctx);
    });
    renderPoints(ctx, points);
}
function mouseMoved(e) {
    if (dragok) {
        x = e.pageX - canvas.offsetLeft;
        y = e.pageY - canvas.offsetTop;
        var p = new Point(x, y, 0);
        points.push(p);
    }
    draw();
}
function mouseDown(e) {
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;
    dragok = true;
    canvas.onmousemove = mouseMoved;
    points.push(new Point(x, y, 1));
}
function mouseUp() {
    dragok = false;
    canvas.onmousemove = null;
}
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
draw();
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
