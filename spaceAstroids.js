var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;
var BulletAmounts = 10;

function Component(width,height,color,x,y,isCircle,isBullet,isShip,isCommet,isAstro){
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
	this.update = function () {
		if(isBullet){
			//starts out with 10 bullets
			this.color='red';
		}
		else if(isAstro){
			this.x+=3;
			asto.draw()

		}
		else if(isShip){

		}
		else if(isCommet){
			// gets points or bullets with collision of bullet
		}
	}

}
var bullet = new Component(10,5,'blue',209,190,false,true,false,false,false);
var asto= new Component(10,10,'grey',200,50,true,false,false,false,true);
var stars= new Component(10,10,'yellow',100,100,true,false,false,true,false);
var ship=new Component(30,100,'red',200,190,false,false,true,false,false);
var bulletArray=[];
for(var i=0;i<BulletAmounts;i++){
	bulletArray.push(bullet);
}
console.log(bulletArray);

/*	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(var i=0;i<bulletArray.length;i++){
		bulletArray[i].update();
		console.log(bulletArray[i]);
	}
	asto.update();
}
animate();*/

