var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove',
	function(event){
		mouse.x=event.x;
		mouse.y=event.y;
	}
)

var minRadius = 10;
var maxRadius = 40;
var density = 100;

var colorArray = [
	'#131B26',
	'#112026',
	'#F2E8DC',
	'#BFB1A4',
	'#8C837B',
];

function Circle (x,y,dx,dy,radius){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.color=colorArray[ Math.floor( Math.random() * colorArray.length)];
	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
	this.update = function(){
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		if (mouse.x-this.x <50 && mouse.x-this.x > -50
			&& mouse.y-this.y <50 && mouse.y-this.y> -50){
			if (this.radius<maxRadius){
				this.radius++;
			}
		}else{
			if (this.radius>minRadius){
				this.radius--;
			}
		}

		this.draw();
	}
}

var circleArray = [];

for (var i = 300; i >= 0; i--) {
	var x = Math.random()* (innerWidth-radius*2) + radius;
	var y = Math.random()* (innerHeight-radius*2) + radius;
	var dx = (Math.random() - 0.5 );
	var dy = (Math.random() - 0.5 );
	var radius = 10 ;
	circleArray.push(new Circle(x,y,dx,dy,radius));
}
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight); 
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

animate();