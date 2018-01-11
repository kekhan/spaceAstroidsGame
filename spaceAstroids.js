
var spaceShip = new Image();
var laser = new Image();
var rock = new Image();

function init(){
	spaceShip.src = 'http://www.pngmart.com/files/3/Spaceship-PNG-File.png';
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width= window.innerWidth;
canvas.height= window.innerHeight;
var BulletAmounts = 10;
var starInitial = 5;
var count=0;
window.addEventListener('keydown',function(){
	canvas.key=event.keyCode;
	if(canvas.key === 32){
		canvas.key=event.keyCode;
	}
})


window.addEventListener('keyup',function(){
	canvas.key= false;

   })

function sound(src){
	/* plays music or sound*/
	this.sound= document.getElementById('music');
	this.sound.src=src;
	this.sound.setAttribute('preload','auto');
	this.sound.style.display="none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop=function(){
		this.sound.pause();
	}
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
	/*this.collisionStarStar = function(){
		var dx = this.x-this.x;
		var dy this.y-this.y;
		var distance = Math.sqrt

	}*/


	this.collisionShipStars = function()
	{
		if((this.x ) < (ship.x + ship.width) && (this.x) > ship.x &&
               (this.y) < (ship.y + ship.height) && (this.y) > (ship.y))
		{
			if(this.color === 'red'){
				console.log('not over red');
			}
			else{
				alert("GameOver");
			}
		}
	}
	this.collision = function(){
		if((this.x) < (bullet.x + bullet.width) && (this.x) > bullet.x &&
               (this.y) < bullet.y + bullet.height && (this.y) > bullet.y)
		{

			this.color='red';
			
		}
	}
	this.update = function () {
		if(isBullet){
			
			//starts out with 10 bullets
			if(canvas.key && canvas.key === 32)
			{
				bullet.y=ship.y-bullet.height;
				bullet.x=ship.x+9;
				soundBullet.play();

				
				
			}
			updatePosition();

		
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
			this.collisionShipStars();
			this.draw();
		}
	}

}

//
function updatePosition(){
	bullet.y-=20;
}



	

var ship=new Component(30,100,'red',Math.random() * innerWidth, Math.random() * (innerHeight-110),false,false,true,false,false);
var bullet = new Component(50,50,'white',ship.x,ship.y,false,true,false,false,false);
//var asto= new Component(10,10,'grey',200,50,true,false,false,false,true);
 var soundBullet = new sound('laser.mp3');

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
	starArrays.push(new Component(30,30,'yellow',star_x,star_y,false,false,false,true,false,dx,dy));
}


function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for( var i=0; i<starArrays.length; i++){
		starArrays[i].update();
		starArrays[i].collision(starArrays[i]);
	}
	bullet.collision();
	bullet.update();
	ship.update();
	ctx.drawImage(spaceShip,300,300,70,150);
}
animate();
init();


