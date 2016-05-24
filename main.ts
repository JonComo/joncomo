var canvas;
var ctx;

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

var x = 0;
var y = 0;
var lastx = 0;
var lasty = 0;

var WIDTH = 800;
var HEIGHT = 600;

var dragging = false;

var pages = [];
var currentPage;

var textArea;
textArea = document.getElementById("pageDescription");


class Point {
    constructor(public x, public y) {

    }
}

class Line {
    constructor(public p1: Point, public p2: Point) {
        
    }
}

class Page {
    constructor(public lines) {
        
    }
}

function renderLines(ctx, lines) {
    ctx.beginPath();
    lines.forEach(function(l) {
        ctx.moveTo(l.p1.x, l.p1.y);
        ctx.lineTo(l.p2.x, l.p2.y);
    });
    ctx.stroke();
}

function renderPoints(ctx, points) {
    ctx.beginPath();
    var lastx = 0;
    var lasty = 0;
    points.forEach(function(p) {
        if (p.start) {
            ctx.moveTo(p.x, p.y);
        } else {
            ctx.lineTo(lastx, lasty, p.x + Math.random()*4.0-2.0, p.y + Math.random()*4.0-2.0);
        }
        lastx = p.x;
        lasty = p.y;
    });
    ctx.stroke();
}

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function clearAll() {
    currentPage.lines = [];
    draw();
}

function draw() {
    clear();
    ctx.fillStyle = "#FAF7F8";
    rect(0, 0, WIDTH, HEIGHT);
    renderLines(ctx, currentPage.lines);
}

function mouseMoved(e) {
    if (dragging){
        x = e.pageX - canvas.offsetLeft;
        y = e.pageY - canvas.offsetTop;
        
        //var p = new Point(x, y, 0);
        //points.push(p);
        
        var l = new Line(new Point(lastx, lasty), new Point(x, y));
        currentPage.lines.push(l);
        
        lastx = x;
        lasty = y;
    }
    
    draw();
}

function mouseDown(e) {
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;
    lastx = x;
    lasty = y;
    
    dragging = true;
    canvas.onmousemove = mouseMoved;
}

function mouseUp() {
    dragging = false;
    canvas.onmousemove = null;
}

function addPage() {
    var l = [];
    var p = new Page(l);
    pages.push(p);
    updatePageElements();
    return p;
}

function loadPage(event) {
    var text = event.srcElement.innerText;
    console.log(text);
    
    clear();
    var index = Number(text.substring(1)) - 1;
    console.log(index);
    currentPage = pages[index];
    draw();
}

function updatePageElements() {
    document.getElementById("pages").innerHTML = "";
    var i = 1;
    pages.forEach(function(p) {
        createButton("pages", "p" + i, loadPage);
        i += 1;
    });
}

function createButton(parentElement, text, callback) {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode(text);
    btn.appendChild(t);
    btn.onclick = callback;
    document.getElementById(parentElement).appendChild(btn);
}

function loadPages(desc) {
    pages = JSON.parse(desc);
    updatePageElements();
    
    if (pages.length != 0) {
        currentPage = pages[0];
    }
    
    draw();
}

function loadPagesFromTextArea() {
    loadPages(textArea.value);
}

if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    var ls = localStorage;
    createButton("controls", "save", function(event) {
        var encodedPages = JSON.stringify(pages);
        ls.setItem("pages", encodedPages);
        textArea.value = encodedPages;
    });

    loadPages(ls.getItem("pages"));
} else {
    // Sorry! No Web Storage support..
}

if (!pages) {
    pages = [];
}

if (pages.length == 0) {
    currentPage = addPage();
} else {
    currentPage = pages[0];
}

draw();

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;

document.getElementById("buttonClear").onclick = clearAll;
document.getElementById("buttonAddPage").onclick = addPage;
document.getElementById("buttonLoad").onclick = loadPagesFromTextArea;
