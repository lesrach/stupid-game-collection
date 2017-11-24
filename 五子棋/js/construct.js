
function Chessbox(x,y){
	this.x= x;
	this.y= y;
	this.element = null;
	this.game = null;
}
Chessbox.prototype = {
	init:function(){
		var cb = this.element = document.createElement("div");
		cb.className = "chessbox";
		cb.inner = 0;
		$("#box").appendChild(cb);
		that = this;
		cb.onclick = function(e){
			e = e || event;
			var src = e.target || e.srcElement;
			if(this.inner == 0 && that.game!=null){
				that.game.time ++;
				this.inner = that.game.time%2+1;
				if(that.game.time%2 ==0){
					var black =  document.createElement("div");
					black.className = "black";
					this.appendChild(black);
				} else {
					var blank =  document.createElement("div");
					blank.className = "blank";
					this.appendChild(blank);
				}
			}
		}
		cb.onmouseenter = function(){
			if(that.game.time%2 ==0){
				css(this,{
					background:"#fff",
					borderRadius:"50%",
					border:"1px solid"
				})
			} else{
				css(this,{
					background:"#000",
					borderRadius:"50%"
				})
			}
		}
		cb.onmouseleave = function(){
			css(this,{
				background:"transparent",
				border:0
			})
		}
	}
}
//////////////////////////////
function Game(){
	this.time=0 ;
	this.nums= [] ;
}
Game.prototype.init = function(){
	for(var i = 0;i<400 ;i++){
		$("#seebox").appendChild(document.createElement("li"));
	}
	for(var j =0;j<19;j++){
		for(var i= 0;i<19;i++){
			var chessbox = new Chessbox(i,j);
			chessbox.init();
			chessbox.game = this;
			this.nums.push(chessbox);
		}
	}
	console.log(this.nums);
}
;