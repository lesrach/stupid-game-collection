///////////////////////////////////////////////////////////////////////////////////////////////////////////////////   地图构造
function Map(option){
	option = option || {};
	this.width = option.width || 320;
	this.height = option.height || 568;
	this.init_bg = option.init_bg;
	this.bg = option.bg;
	this.element = "";
	this.self = null;
	this.game = null;
}
Map.prototype.init = function(){
	var map = this.element = document.createElement("div");
		css(map,{
			width:this.width+"px",
			height:this.height+"px",
			margin:"auto",
			position:"absolute",
			left:0,
			top:0,
			right:0,
			bottom:0,
			background:"url("+ this.init_bg +")"
		})
	$("#box").appendChild(map);
	var that = this;
	map.onclick = function(){
		if(that.self == null){
			css(this,{
			background:"url("+ that.bg +")"
		})
		map.innerHTML=  "";
		that.game = new Game(that);
		that.game.init();
		}
	}
}