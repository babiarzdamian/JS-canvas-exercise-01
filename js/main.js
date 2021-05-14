var canvas = document.getElementById('canvas');

// setting fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};

// Event Listeners
addEventListener('click', function (event) {
    mouse.x = Math.floor(event.clientX);
    mouse.y = Math.floor(event.clientY);
});

// Functions
function getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.round(Math.sqrt(xDistance * xDistance + yDistance * yDistance));
}
function getXDistance(x1, x2) {
    var xDistance = x2 - x1;
    return xDistance;
}
function getYDistance(y1, y2) {
    var yDistance = y2 - y1;
    return yDistance;
}

// triangle vars
var x = Math.floor(canvas.width / 2);
var y = Math.floor(canvas.height / 2);

// triangle vars

// frame counting
var triangleDX = 1;
var triangleDY = 1;

// colors
var colorFill = 'rgba(0,0,0,.5)';

class Triangle {
    constructor(x, y, dx, dy, rotation) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.rotation = rotation;
    }
    drawTriangle() {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + 20, this.y + 50);
        c.arc(this.x, this.y + 50, 20, 0, Math.PI);
        // c.lineTo(this.x, this.y); // is this needed?

        c.rotate(this.rotation);
        c.fillStyle = colorFill;
        c.fill();

        // this.x = mouse.x;
        // 	this.y = mouse.y;
    }
    moveTriangle() {
        if (this.x > canvas.width || this.x < 0) {
            this.dx = -this.dx;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.drawTriangle();
    }
    clickTriangle() {
        // this.x = mouse.x;
        // this.y = mouse.y;

        var newX = Math.floor(mouse.x);
        var newY = Math.floor(mouse.y);

        var distance = getDistance(this.x, this.y, newX, newY);
        var xDistance = getXDistance(this.x, newX);
        var yDistance = getYDistance(this.y, newY);

        if (newX > this.x) {
            this.x += this.dx * Math.abs(xDistance * 0.1);
        } else if (newX < this.x) {
            this.x -= this.dx * Math.abs(xDistance * 0.1);
        }
        if (newY > this.y) {
            this.y += this.dy * Math.abs(yDistance * 0.1);
        } else if (newY < this.y) {
            this.y -= this.dy * Math.abs(yDistance * 0.1);
        }

        console.log(
            'pos: ' +
                this.x +
                '/' +
                this.y +
                ' | new_pos: ' +
                newX +
                '/' +
                newY +
                ' | distance: ' +
                distance
        );
        this.drawTriangle();
    }
}

var oneTriangle = new Triangle(x, y, triangleDX, triangleDY, 0);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    oneTriangle.clickTriangle();
}

animate();
console.log(mouse.x);
console.log(mouse.y);
