////////////    游戏构造函数
function Game(map){
	this.self = null;
	this.power = null;
	this.p_num = 0;
	this.enemies = [];
	this.bullets = [];
	this.map = map;
	this.bullet_m = 1; ////子弹数量
	this.point = 0;  ///游戏分数		
}
Game.prototype.init = function(){
	var self = new Self({
		src:"img/self.gif",
		x:140,
		y:400,
		width:66,
		height:80,
		hp:10
	});
	this.map.self = self;
	self.map = this.map;
	this.self = this.map.self;
	self.init();
	self.move();
	var point = document.createElement("div");
	css(point,{
		position:"absolute",
		zIndex:"5"
	});
	point.id = "point";
	this.map.element.appendChild(point);
	var	time = 0,
		that = this;
	$("#point").innerHTML = "分数："+that.point +"战机HP："+that.self.hp;
	this.timer = setInterval(function(){
		time += 1;
		if(time%30 == 0){
			var enemy = new Enemy({
				src:"img/small_fly.png",
				width:34,
				height:24,
				x:Math.random()*300,
				y:0,
				speed:5,
				hp:2*(Math.floor(time/10000)+1)
			});
			enemy.map = that.map;
			enemy.init();
			that.map.element.appendChild(enemy.element);
			that.enemies.push(enemy);
		}
		if(time%200 == 0){
			var enemy = new Enemy({
				src:"img/mid_fly.png",
				width:46,
				height:60,
				x:Math.random()*300,
				y:0,
				speed:3,
				hp:6*(Math.floor(time/10000)+1),
				point:5000
			});
			enemy.map = that.map;
			enemy.init();
			that.map.element.appendChild(enemy.element);
			that.enemies.push(enemy);
		}
		if(time%500 == 0){
			var enemy = new Enemy({
				src:"img/big_fly.png",
				width:110,
				height:164,
				x:Math.random()*300,
				y:0,
				speed:1,
				hp:15*(Math.floor(time/10000)+1),
				point:20000
			});
			enemy.map = that.map;
			enemy.init();
			that.map.element.appendChild(enemy.element);
			that.enemies.push(enemy);
		}
		if(time%10 == 0){
			for(var i=0;i<that.bullet_m;i++){
				var bullet = new Bullet({
				src:"img/bullet.png",
				width:6,
				height:14,
				x:that.self.x + (31-(that.bullet_m-1)*4) + i*8,
				y:that.self.y-20,
				speed:-3
			});
			bullet.map = that.map;
			bullet.init();
			that.map.element.appendChild(bullet.element);
			that.bullets.push(bullet);
			}
		}
		if((that.point/100000-that.p_num) > 1){
			that.power = new Power({
			src:"img/power1.png",
			width:20,
			height:20,
			x:Math.random()*300,
			y:0,
			speed:2
			});
			that.power.map = that.map;
			that.power.init();
			that.map.element.appendChild(that.power.element);
			that.p_num++;
		}
		for(var i=0;i<that.enemies.length;i++){
			that.enemies[i].move();
			if (!that.enemies[i].sur)
				that.enemies.splice(i, 1);
		}
		for(var i=0;i<that.bullets.length;i++){
			that.bullets[i].move();
			if (!that.bullets[i].sur)
				that.bullets.splice(i, 1);
		}
		for (var i = that.enemies.length - 1; i >= 0; i--) { ////子弹与敌机相撞
			var enemy = that.enemies[i];
			for (var j = that.bullets.length - 1; j >= 0; j--) {
				var bullet = that.bullets[j];
				if (Tool.intersect(enemy, bullet)) { 
					that.map.element.removeChild(bullet.element);
					that.bullets.splice(j, 1);
					enemy.hp -= 1;
					if (enemy.hp==0){
						that.map.element.removeChild(enemy.element);
						that.enemies.splice(i, 1);
						that.point += enemy.point;
						$("#point").innerHTML = "分数："+that.point +"战机HP："+that.self.hp;
					}
					break;
				}
			}
		}
		if (that.power!=null) {       /// 能量球和自己碰撞
			that.power.move();
			if(Tool.intersect(that.power, self)){
				that.map.element.removeChild(that.power.element);
				that.bullet_m += 1;
				that.power = null;
			}
		}
		for (var i = that.enemies.length - 1; i >= 0; i--){
			var enemy = that.enemies[i];
			if (Tool.intersect(enemy, that.self)) { 
				enemy.hp -= 1;
				if (enemy.hp==0){
					that.map.element.removeChild(enemy.element);
					that.enemies.splice(i, 1);
					that.point += enemy.point;
				}
				if(that.bullet_m>1){
					that.bullet_m -= 1;
				}else{
					that.self.hp -=1;
					$("#point").innerHTML = "分数："+that.point +"战机HP："+that.self.hp;
					if(that.self.hp ==0){
						clearInterval(that.timer);
						that.map.element.innerHTML = "点击重新开始";
						that.map.self = null;
						
					}
				}
			}
		}
	},1000/60)
}