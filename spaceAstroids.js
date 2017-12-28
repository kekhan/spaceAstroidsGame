var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;
var BulletAmounts = 10;
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


function Component(width,height,color,x,y,isCircle,isBullet,isShip,isCommet,isAstro){
	this.x=x;
	this.y=y;
	this.color=color;
	this.width=width;
	this.height=height;

	this.draw=function(){
		if(isCircle){ 
			ctx.beginPath();
			ctx.arc(this.x,this.y,10,0,2*Math.PI);
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

			if(canvas.key && canvas.key==37){
				this.x-=5;
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
		}
	}

}

//
function updatePosition(){
	bullet.y-=20;
}

var ship=new Component(30,100,'red',200,300,false,false,true,false,false);
var bullet = new Component(10,10,'blue',ship.x,ship.y,false,true,false,false,false);
var asto= new Component(10,10,'grey',200,50,true,false,false,false,true);
var stars= new Component(10,10,'yellow',100,100,true,false,false,true,false);



var bulletArray=[];
for(var i=0;i<BulletAmounts;i++){
	bulletArray.push(bullet);
}
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	bullet.update();
	updatePosition();
	ship.update();
	 
	asto.update();
}
animate();

