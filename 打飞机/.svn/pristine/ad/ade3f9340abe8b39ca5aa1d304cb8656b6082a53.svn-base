//////////公用角色
function Role(option){
	option = option || {};
	this.x = option.x;
	this.y = option.y;
	this.element = null;
	this.map = null;
	this.width = option.width;
	this.height = option.height;
	this.src = option.src;
	this.speed = option.speed;
	this.sur = true;
	this.timer = [];
	this.hp = option.hp || 1;
	this.point = option.point || 1000; 
}
Role.prototype.init = function(){
	var ele = this.element =document.createElement("img");
	ele.src = this.src;
	css(ele,{
		position: "absolute",
		left: this.x+"px",
		top:this.y+"px",
		width:this.width+"px",
		height:this.height+"px"
	})
	this.map.element.appendChild(ele); 
}
Role.prototype.move = function(){
	this.y += this.speed;
	css(this.element,{
		top:this.y+"px"
	})
	if (this.y < 0 || this.y > this.map.height) {
		this.sur = false;
		this.map.element.removeChild(this.element);
	}
}
//////////////自己的战机
function Self(option){
	this.hp = 5;
	Role.call(this,option);
}
Self.prototype = new Role();
Self.prototype.constructor = Self;
//Self.prototype.move = function(){ 
//	var that = this;
//	this.map.element.onmousemove = function(e){
//		e = e || event;
//		
//		offset(that.element,{
//			top: page(e).y - that.height / 2,
//			left: page(e).x - that.width / 2
//		});
//
//		that.x = that.element.offsetLeft;
//		that.y = that.element.offsetTop;
//	}
//}
Self.prototype.move = function(){
	var that = this;
	this.map.element.onmousemove = function(e){
	e = e || event;
	
	offset(that.element,{
		top: page(e).y - that.height / 2,
		left: page(e).x - that.width / 2
	});

	that.x = that.element.offsetLeft;
	that.y = that.element.offsetTop;
	}
	window.onkeydown = function(e){
		e = e || event;
		var src = e.target || e.srcElement;
		var direc = 0;
		var newtimer = setInterval(function(){
			if(e.which == 37){
				that.x -=3;
				that.x = Math.max(that.x,0);
				css(that.element,{
					left:that.x +"px"
				});
			}
			if(e.which == 38){
				that.y -=3;
				that.y = Math.max(that.y,0);
				css(that.element,{
					top:that.y +"px"
				});
			}
			if(e.which == 39){
				that.x +=3;
				that.x = Math.min(that.x,(that.map.width-that.width));
				css(that.element,{
					left:that.x +"px"
				});
			}
			if(e.which == 40){
				that.y +=3;
				that.y = Math.min(that.y,(that.map.height-that.height));
				css(that.element,{
					top:that.y +"px"
				});
			}
		},1000/60)
		that.timer.push(newtimer);
	}
	window.onkeyup = function(){
		for(var i =that.timer.length-1; i>=0;i--){
			clearInterval(that.timer[i]);
			that.timer.pop();
		}
	}
}
///////////敌对飞机构造
function Enemy(option){
	Role.call(this,option);
}
Enemy.prototype = new Role();
Enemy.prototype.constructor = Enemy;
///////////子弹构造
function Bullet(option){
	Role.call(this,option);
}
Bullet.prototype = new Role();
Bullet.prototype.constructor = Bullet;
///////////能量球构造
function Power(option){
	Role.call(this,option);
}
Power.prototype = new Role();
Power.prototype.constructor = Power;
////////////////工具函数
var Tool = {
			intersect : function(obj1, obj2){
				return !(obj1.y > obj2.y + obj2.height 
						|| obj1.x > obj2.x + obj2.width
						|| obj1.y + obj1.height < obj2.y
						|| obj1.x + obj1.width < obj2.x);
			}
		}