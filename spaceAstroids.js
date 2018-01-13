
var spaceShip = new Image();
var laser = new Image();
var rock = new Image();
spaceShip.src = 'http://www.pngmart.com/files/3/Spaceship-PNG-File.png';
laser.src = 'https://donaldcarling.files.wordpress.com/2016/03/blast-harrier-laser-1.png';
rock.src = 'http://www.freepngimg.com/download/alien/7-2-alien-transparent.png';
console.log(rock);
var alienHit =0;


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

function Component(img,x,y,width,height,isBullet,isShip,isComet,color,dx,dy){
	this.img = img;
	this.x=x;
	this.y=y;
	this.color=color;
	this.width=width;
	this.height=height;
	this.dx=dx;
	this.radius=20;
	this.dy=dy;

	this.draw=function(){
		ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
			
		
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
			console.log('hit by alien')
			alert("GameOver");
			
		}
	}
	this.collision = function(){
		if((this.x) < (bullet.x + bullet.width) && (this.x) > bullet.x &&
               (this.y) < bullet.y + bullet.height && (this.y) > bullet.y)
		{

			console.log('alien hit');
			alienHit+=1;
			console.log(alienHit);
			this.width= 0;
			this.x=0;
			this.y=0;
			this.dx=0;
			this.dy=0;
			this.height = 0;
			// should display 000000
			console.log(this.width,this.height,this.x,this.y,this.dx,this.dy);

			
		}
		if(alienHit >= starInitial){
			alert("YOU WIN!!");
		}
		
	}
	this.update = function () {
		if(isBullet){
			
			if(canvas.key && canvas.key === 32)
			{
				bullet.y=ship.y;
				bullet.x=ship.x;

				soundBullet.play();	
			}
			// continuoulsy moves the bullet 20 spaces up
			bullet.y-=20;
			
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
		else if(isComet){
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
	
// initiating the calls to
var ship = new Component(spaceShip,Math.random() * innerWidth, Math.random() * (innerHeight-110),100,50,false,true,false);
var bullet = new Component(laser,Math.random() * innerWidth, Math.random() * (innerHeight-110),100,50,true,false,false);
//var asto= new Component(10,10,'grey',200,50,true,false,false,false,true);
soundBullet = new sound('laser.mp3');

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
	starArrays.push(new Component(rock, Math.random() * innerWidth, Math.random() * (innerHeight-110),50,50,false,false,true,"red",dx,dy));
	console.log(starArrays)
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

}
animate();


