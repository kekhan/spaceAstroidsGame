var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;
var BulletAmounts = 10;
var starInitial = 5;
window.addEventListener('keydown',function(){
	canvas.key=event.keyCode;
	if(canvas.key === 32){
		canvas.key=event.keyCode;
	}
})

if(canvas.key  !== 32){
	window.addEventListener('keyup',function(){
		canvas.key= false;

    })
}


function Component(width,height,color,x,y,isCircle,isBullet,isShip,isCommet,isAstro,dx,dy){
	this.x=x;
	this.y=y;
	this.color=color;
	this.width=width;
	this.height=height;
	this.dx=dx;
	this.radius=20;
	this.dy=dy;

	this.draw=function(){
		if(isCircle){ 
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
			ctx.fillStyle = this.color;
			ctx.fill();

		}
		else{
			ctx.fillStyle = this.color;

			ctx.fillRect(this.x,this.y,this.width,this.height);
		}
	}
	this.update = function () {
		if(isBullet){
			
			//starts out with 10 bullets
			if(canvas.key && canvas.key === 32)
			{


				bullet.y=ship.y-bullet.height;
				bullet.x=ship.x+9;
				
				
			}
			this.draw();
		}

		else if(isAstro)
		{
			this.x+=3;
			this.draw();

		}
		else if(isShip){
			if(this.x >= innerWidth-this.width -5 || this.x <= 0){
				this.x = -this.x
			}
			if(this.y >= innerHeight-this.height- 5|| this.y <= 0){
				this.y = -this.y;

			}

			if(canvas.key && canvas.key == 37){
				this.x -= 5;
			}
			else if (canvas.key && canvas.key ==39){
				this.x+=5;
			}
			else if(canvas.key && canvas.key== 38){
				this.y-=5;
			}
			else if(canvas.key && canvas.key == 40){
				this.y+=5;
			}
			this.draw(); 

		}
		else if(isCommet){
			// gets points or bullets with collision of bullet
			if((this.x + this.radius > innerWidth )|| (this.x - this.radius) < 0 ){
				this.dx = -this.dx;

			}
			else if((this.y + this.radius > innerHeight) || (this.y - this.radius) < 0){
				this.dy = -this.dy;

			}
			this.x += this.dx;
			this.y += this.dy;
			this.draw();
		}
	}

}

//
function updatePosition(){
	bullet.y-=20;
}

var ship=new Component(30,100,'red',200,300,false,false,true,false,false);
var bullet = new Component(10,10,'blue',ship.x,ship.y,false,true,false,false,false);
//var asto= new Component(10,10,'grey',200,50,true,false,false,false,true);


var starArrays= [];
var bulletArray=[];


for(var i=0;i<BulletAmounts;i++){
	
	bulletArray.push(bullet);
}


for (var i = 0; i<starInitial; i++){
	var dx = Math.random()*2;
	var dy = Math.random()*2;

	var star_x = Math.random()*innerWidth;
	var star_y = Math.random() * innerHeight;
	starArrays.push(new Component(10,10,'yellow',star_x,star_y,true,false,false,true,false,dx,dy));
}


function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for( var i=0; i<starArrays.length; i++){
		starArrays[i].update();
	}
	bullet.update();
	updatePosition();
	ship.update();
	 
	//asto.update();
}
animate();

