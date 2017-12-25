var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

function Component(width,height,color,x,y,isCircle){
	this.x=x;
	this.y=y;
	this.color=color;
	this.width=width;
	this.height=height;

	this.draw=function(){
		if(isCircle){
			console.log('circle');
			ctx.beginPath();
			ctx.arc(this.x,this.y,10,0,2*Math.PI);
			ctx.fillStyle = this.color;
			ctx.fill();

		}
		else{
			ctx.fillStyle= this.color;

			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}

}
var bullet = new Component(10,5,'blue',209,190);
bullet.draw();
var asto= new Component(10,10,'grey',200,50,true);
asto.draw();
var stars= new Component(10,10,'yellow',100,100,true);
stars.draw();
var ship=new Component(30,100,'red',200,200);
ship.draw();
