////////////////////////                                                                  属性参数
var co = new Object;
	co.name = "" ,
	co.exp = 0,
	co._exp_coe = 1, //声明经验增长参数
	_exp_second = 500,//声明经验增长间隔
	co.str = 10, //力量
	co.headstr = 10,  //悟性
	co.foot = 10,  //身法
	co.phy = 10,  //体质
	co.luck = 10,  //幸运
	equip_atk = 25, //装备攻击力
	equip_def = 7,  //装备防御力
	equip_speed = 5,  //装备速度
	equip_hp = 15,  //装备血量
	_atk = co.str*2 + equip_atk, // 攻击力
	_def = co.phy*0.5 + equip_def,  //  防御力
	_speed = co.foot + equip_speed,  //速度
	_hp = co.phy * 5 +co.str * 2 +equip_hp,   //血量
	_hpnow = 0 ,  //当前血量
	_mp = co.headstr *3 +co.phy * 1 ,  //内力
	_mpnow = 0,  //当前内力
	co._propoint = 10000,  //属性点
	co.lv = 0, //等级
	co._money = 0, //铜钱
	co.exp_up = 10000, //升级所需初始经验
	co.ng_coe = 1, 	//内功系数
	co.zhenqi = 10000;		//真气数量
	co.zhenqi_up = 100;		//真气升级数量
	isxiulian = false ;		//判断是否在修炼
	co.nglv = 0;		//修为等级
	map_event = document.getElementById("map-events");  //地图事件的内容
	map_eventtext = map_event.innerHTML; /////////////////
	map_coe = 5 ;
	time = 0;
	mon = new Object;
	mon.name = "无" ;
	mon.atk = "" ;
	mon.def = "" ;
	mon.speed = "";
	mon.hp = "";
	mon.hpnow = 0 ;
	mon.power = "";
	map_coe = 5 ;
	j= 1;
	
///////////////////////////////////////////////                                                 文字数据组	
	bossname = ["","","","","","一刀独行田伯光",];
	mon_name = ["山贼","采花大盗","小啰喽",];
	active = ["爬上了一颗大树","找到一个稀有虫子","躺在路边睡了一觉","望了望天气继续赶路","跳进河里洗了个澡","追一只野兔结果追丢了"],                    //                                                                              无影响动作
	active1 = ["打死了一只野猪","捡到了路人丢失的东西","遇到淫贼逞凶，将其打死","帮助村里老人过河","帮小二捡到掉在屋顶上的风筝","踩到一块狗屎"],    //                                                                                   影响好动作
	active2 = ["清洗了凶名赫赫的山寨","打败了一个魔道人物","掉落山崖，发现前人遗骨遗物","在城中摆下擂台，未尝一败","将被通缉数年之久的江洋大盗捉拿归案"],    //                                                                              影响极好
	active_1 = ["走路过多脚脖子崴了","自己做午餐砍到手指","被三只手顺走一些东西","一下子睡了好几天","沉迷下棋无法自拔","练功过度，肌肉损伤"], //                                                                                           影响坏
	active_2 = ["练功走火入魔","与人争斗，受了重伤","逛窑子巧遇妖女被吸干","被人下了毒药","想学他人的奇遇跳井，结果头撞歪了"]
	propore = ["力量","体质","悟性","身法","福缘","铜钱","经验"];
	
///////////////////////////////////////////////////                                             函数参数	
	_exp_func = ""; //= setInterval("expup(_exp_coe)",_exp_second)//           经验自增
	_jug_num = "";  // 数据校验函数
	battlerun = ""; //   战斗循环
	battlefunc = "" ;  //   
	map_eventstart = "" ; //  地图循环生成事件
	func_xiulian = setInterval("xiulianzq()",50) ;
	clearInterval(func_xiulian);
function ran(num){
	return Math.floor(Math.random()*num);
}//                                                                                          获取一个随机数


function jugnum(){
	_atk = co.str*2 + equip_atk;
	_def = co.phy*0.5 + equip_def; 
	_speed = co.foot + equip_speed;  
	_hp = co.phy * 5 +co.str * 2 +equip_hp; 
	_mp = co.headstr *3 +co.phy * 1;
	atk.innerHTML = _atk;
	def.innerHTML = _def;
	speed.innerHTML = _speed;
	hp.innerHTML = _hp;
	hpnow.innerHTML = _hpnow;
	mp.innerHTML = _mp;
	mpnow.innerHTML = _mpnow;
	document.getElementById("mon-name").innerHTML = mon.name ;
	document.getElementById("mon-hp").innerHTML = mon.hp ;
	document.getElementById("mon-hpnow").innerHTML = mon.hpnow;
	document.getElementById("mon-atk").innerHTML = mon.atk;
	document.getElementById("mon-def").innerHTML = mon.def;
	document.getElementById("mon-speed").innerHTML = mon.speed;
	propoint.innerHTML = co._propoint;
	document.getElementById("zhenqi").innerHTML = co.zhenqi;
	if(co.exp<0){
		co.exp = 0;
	}
	document.getElementById("exp").innerHTML = Math.floor(co.exp) ;
	if(co._money<0){
		co._money = 0;
	}
	document.getElementById("money").innerHTML = Math.floor(co._money) ;

} //                                                                                      属性校正


function expup(exp_coe){
	co.exp = Number(document.getElementById("exp").innerHTML);
	co.exp += 100 * co._exp_coe;
	document.getElementById("exp").innerHTML = Math.floor(co.exp).toFixed(0) ;
}                                //                                                        经验自增过渡函数





//////////////////////////                                                                      加属性点
function add1(proid){
	var _point = parseInt(document.getElementById("propoint").innerHTML);
	if(_point>0){
		_propoint = _point - 1;
		document.getElementById(proid).innerHTML = str + 1 ;
		str += 1;
		document.getElementById("propoint").innerHTML = _propoint  ; 
	}
}
document.getElementById("addpro1").onclick = function(){
	add1("str");
}
function add1(proid){
	var _point = parseInt(document.getElementById("propoint").innerHTML);
	if(_point>0){
		_propoint = _point - 1;
		document.getElementById(proid).innerHTML = str + 1 ;
		str += 1;
		document.getElementById("propoint").innerHTML = _propoint  ; 
	}
}
document.getElementById("addpro2").onclick = function(){
	add2("phy");
}
function add2(proid){
	var _point = parseInt(document.getElementById("propoint").innerHTML);
	if(_point>0){
		_propoint = _point - 1;
		document.getElementById(proid).innerHTML = phy + 1 ;
		phy += 1;
		document.getElementById("propoint").innerHTML = _propoint  ; 
	}
}
document.getElementById("addpro3").onclick = function(){
	add3("headstr");
}
function add3(proid){
	var _point = parseInt(document.getElementById("propoint").innerHTML);
	if(_point>0){
		_propoint = _point - 1;
		document.getElementById(proid).innerHTML = headstr + 1 ;
		headstr += 1;
		document.getElementById("propoint").innerHTML = _propoint  ; 
	}
}
document.getElementById("addpro4").onclick = function(){
	add4("foot");
}
function add4(proid){
	var _point = parseInt(document.getElementById("propoint").innerHTML);
	if(_point>0){
		_propoint = _point - 1;
		document.getElementById(proid).innerHTML = foot + 1 ;
		foot += 1;
		document.getElementById("propoint").innerHTML = _propoint  ; 
	}
}
document.getElementById("addpro5").onclick = function(){
	add5("luck");
}
function add5(proid){
	var _point = parseInt(document.getElementById("propoint").innerHTML);
	if(_point>0){
		_propoint = _point - 1;
		document.getElementById(proid).innerHTML = luck + 1 ;
		luck += 1;
		document.getElementById("propoint").innerHTML = _propoint  ; 
	}
}



//                                                                                         修炼按钮

function xiulianzq(){
	if(exp>1000){
		exp -= 1000;
		document.getElementById("exp").innerHTML = exp ;
		zhenqi += 1 * ng_coe ;
		document.getElementById("zhenqi").innerHTML = zhenqi.toFixed(2);
		isxiulian = true;
	}
	
}//                                                                                  修炼转化函数
	



//                                                                        判断境界（以下）

function jug_nglv(nglv){
	var arr = ["练气期","筑基期","心动期","金丹期","元婴期","出窍期","分神期","合体期","洞虚期","大乘期","渡劫期","飞升","仙人"];
	return arr[nglv];
}

//                                                                                                 升级境界





// ///////////////////                       地图操作
	//     /////////////////////////////////////////////////////                               地图事件
	
		
	function jug_pro(num){
		var i = ["str","phy","headstr","foot","luck","money","exp",""]
		return i[num];
	}
	
	function mapevents(){
		map_eventtext = document.getElementById("map-events").innerHTML;
		var rand = Math.random()*100;
		if(rand>(100-map_coe)){
			var add1 = ran(3) + 1 ; 
			var pro = ran(5);
			var addend = Number(document.getElementById(jug_pro(pro)).innerHTML);
			map_eventtext = name + active2[ran(5)] + "，" + "增加了" + add1 + propore[pro]+ "<br />"+ map_eventtext ;
			addend += add1;
			document.getElementById(jug_pro(pro)).innerHTML = addend;
		
		}else if(rand>(100-(map_coe * map_coe))){
			var add1 = ran(10000) + 1 ; 
			var pro = ran(2)+5;
			var addend = Number(document.getElementById(jug_pro(pro)).innerHTML);
			map_eventtext = name + active1[ran(6)] + "，" + "增加了" + add1 + propore[pro]+ "<br />"+ map_eventtext ;
			addend += add1;
			document.getElementById(jug_pro(pro)).innerHTML = addend;
		}else if(rand<(map_coe/2)){
			var add1 = ran(3) + 1 ; 
			var pro = ran(5);
			var addend = Number(document.getElementById(jug_pro(pro)).innerHTML);
			map_eventtext = name + active_1[ran(6)] + "，" + "减少了" + add1 + propore[pro]+ "<br />"+ map_eventtext ;
			addend -= add1;
			document.getElementById(jug_pro(pro)).innerHTML = addend;
		}else if(rand<(map_coe*map_coe)/2){
			var add1 = ran(10000) + 1 ; 
			var pro = ran(2)+5;
			var addend = Number(document.getElementById(jug_pro(pro)).innerHTML);
			map_eventtext = name + active_2[ran(5)] + "，" + "减少了" + add1 + propore[pro]+ "<br />"+ map_eventtext ;
			addend -= add1;
			document.getElementById(jug_pro(pro)).innerHTML = addend;
		}else {
			
			document.getElementById("map-events").innerHTML = "你遇到了" + mon.name + "，开始战斗" +document.getElementById("map-events").innerHTML;
			metbattle();
			clearInterval(map_eventstart);
		}
		
	
		document.getElementById("map-events").innerHTML = map_eventtext;
		
		j++; 
		if( j % 40 === 0){
			document.getElementById("map-events").innerHTML = map_eventtext.slice(0,400);
		}                                                          
	}                                                                
	//                                                                    地图事件
	function goodevent(num){
		a = document.getElementById("map-events").innerHTML;
		switch(num){
			case 1:
			
		}
	}
	

		function metbattle(){
				if(mon.hpnow == 0){
					console.log("1");
					newmonster();
					battlerun = setInterval("battle(_hpnow,mon.hpnow,_atk,mon.atk,_def,mon.def,_speed,mon.speed)",_exp_second) ;
				}
			}                    //                                     战斗触发
			
			
			function textd(name, dam,e){
				document.getElementById("map-events").innerHTML =name +"受到了" + dam +"点伤害死亡" + "<br />" + e ;
			}                    //                                     死亡文本输出
			
			function textb(name1,name2,dam,e,mhn){
				document.getElementById("map-events").innerHTML =name1 + "攻击了" + name2 +",造成了" + dam +"点伤害,"+ name2 +"还剩下"+  mhn +"点血量"+ "<br />" + e;
			}                     //                                    受伤文本输出
			
			function hd(){
				textd(name, hatkm(mon.atk,_def),document.getElementById("map-events").innerHTML);
				clearInterval(battlerun);
				mon.name = "无";
				mon.hp = 0;
				mon.hpnow = 0;
				mon.atk = 0;
				mon.def = 0;
				mon.speed = 0;
			}                      //                                     自己死亡
			function md(){
				textd(mon.name, hatkm(_atk,mon.def),document.getElementById("map-events").innerHTML);
				clearInterval(battlerun);
				_hpnow = _hp;
				jug_earn();
				map_eventstart = setInterval("mapevents()",_exp_second);
				document.getElementById("hpnow").innerHTML = _hpnow ;
			}                    //                                        怪物死亡
			function mdam(){
				textb(name,mon.name, hatkm(_atk,mon.def),document.getElementById("map-events").innerHTML,mon.hpnow);
			}                   //                                        人物攻击怪物
			function hdam(){
				textb(mon.name,name, hatkm(mon.atk,_def),document.getElementById("map-events").innerHTML,_hpnow);
			}                   //                                        怪物攻击人物
			  
			
			function hatkm(atk,def){
				var	hl = 0;
				
				if(atk>=def){
					var b = atk - def;
					hl = Math.floor(b*(ran(20)+90)/100);
				} else {}
				return hl;
			} //                                                         减少血量机制
			
			
			
			
			function battle(h,mh,a,ma,d,mde,s,ms){
				if( s >= ms){
						mh -= hatkm(a,mde);
						if(mh<0){
							mon.hpnow = 0;
							md();
							mon.name = "无";
							mon.atk = "" ;
							mon.def = "" ;
							mon.speed = "";
							mon.hp = "";
							mon.hpnow = "";
							mon.power = "";
							document.getElementById("mon-hpnow").innerHTML = 0
							return;
						} else {
							mon.hpnow = mh;
							mdam();
							document.getElementById("mon-hpnow").innerHTML = mon.hpnow ;
						}
						h -= hatkm(ma,d);
						if(h<0){
							_hpnow = 0;
							hd();
							document.getElementById("hpnow").innerHTML = 0
							return;
						} else {
							_hpnow = h;
							hdam();
							document.getElementById("hpnow").innerHTML = _hpnow ;
						}
					} else {
						h -= hatkm(ma,d);
						if(h<0){
							_hpnow = 0;
							hd()
							document.getElementById("hpnow").innerHTML = 0
							return;
						} else {
							_hpnow = h;
							hdam();
							document.getElementById("hpnow").innerHTML = _hpnow ;
						}
						mh -= hatkm(a,mde);
						if(mh<0){
							mon.hpnow = 0;
							md();
							mon.name = ";"
							mon.atk = "" ;
							mon.def = "" ;
							mon.speed = "";
							mon.hp = "";
							mon.hpnow = "";
							mon.power = "";
							document.getElementById("mon-hpnow").innerHTML = 0
							return;
						} else {
							mdam()
							mon.hpnow = mh;
							document.getElementById("mon-hpnow").innerHTML = mon.hpnow ;
						}
				}
			}   //                                                                                        战斗判断
			
				
				function newmonster(){
					var a = ran(3);
						b = map_coe * map_coe ;
						c = Math.random()*100;
					if(c>= 99){
						mon.name = "首领" + mon_name[a];
						mon.atk = Math.floor(b *4 * (ran(20)+90) / 100);
						mon.def = Math.floor(b * 1.5  * (ran(20)+90) / 100);
						mon.speed = Math.floor(b * 1 * (ran(20)+90) / 100) ;
						mon.hp = Math.floor(b * 40 * (ran(20)+90) / 100) ;
						mon.hpnow = mon.hp ;
						mon.power = Math.floor(b*b);
					} else if(c>=95){
						mon.name ="精英"+ mon_name[a];
						mon.atk = Math.floor(b *3 * (ran(20)+90) / 100);
						mon.def = Math.floor(b * 1.2  * (ran(20)+90) / 100);
						mon.speed = Math.floor(b * 0.8 * (ran(20)+90) / 100);
						mon.hp = Math.floor(b * 25 * (ran(20)+90) / 100 );
						mon.hpnow = mon.hp ;
						mon.power = Math.floor(b*b/5);
					} else if(c>=80){
						mon.name ="强壮的"+ mon_name[a];
						mon.atk = Math.floor(b *2.4 * (ran(20)+90) / 100);
						mon.def = Math.floor(b * 1  * (ran(20)+90) / 100);
						mon.speed = Math.floor(b * 0.7 * (ran(20)+90) / 100);
						mon.hp = Math.floor(b * 20 * (ran(20)+90) / 100 );
						mon.hpnow = mon.hp ;
						mon.power = Math.floor(b*b/15);
					} else {
						mon.name =mon_name[a];
						mon.atk = Math.floor(b *2 * (ran(20)+90) / 100);
						mon.def = Math.floor(b * 0.9  * (ran(20)+90) / 100);
						mon.speed = Math.floor(b * 0.6 * (ran(20)+90) / 100);
						mon.hp = Math.floor(b * 18 * (ran(20)+90) / 100 );
						mon.hpnow = mon.hp ;
						mon.power = Math.floor(b*b/20);
					}
					document.getElementById("mon-name").innerHTML = mon.name ;
					document.getElementById("mon-hp").innerHTML = mon.hp ;
					document.getElementById("mon-hpnow").innerHTML = mon.hpnow ;
					document.getElementById("mon-atk").innerHTML = mon.atk ;
					document.getElementById("mon-def").innerHTML = mon.def ;
					document.getElementById("mon-speed").innerHTML = mon.speed ;
					document.getElementById("map-events").innerHTML = "你遇到了" + mon.name+ "，开始战斗。" + "<br />" + document.getElementById("map-events").innerHTML;
					
				} //                                                             怪物生成
				
				
				
			function newboss(){
				var b= map_coe * map_coe;
				mon.name = bossname[map_coe];
				mon.atk = Math.floor(b *3 * (ran(20)+90) / 100);
				mon.def = Math.floor(b * 2.5 * (ran(20)+90) / 100);
				mon.speed = Math.floor(b * 0.5 * (ran(20)+90) / 100);
				mon.hp = Math.floor(b * 100 * (ran(20)+90) / 100 );
				mon.hpnow = mon.hp ;
				mon.power = Math.floor(b*b*4);
				document.getElementById("mon-name").innerHTML = mon.name ;
				document.getElementById("mon-hp").innerHTML = mon.hp ;
				document.getElementById("mon-hpnow").innerHTML = mon.hpnow ;
				document.getElementById("mon-atk").innerHTML = mon.atk ;
				document.getElementById("mon-def").innerHTML = mon.def ;
				document.getElementById("mon-speed").innerHTML = mon.speed ;
				document.getElementById("map-events").innerHTML = "你遇到了"+ document.getElementById("map-name").innerHTML + "的最终BOSS:" + mon.name+ "，开始战斗吧！！！" + "<br />" + document.getElementById("map-events").innerHTML;
			}  //                                                                  BOSS生成
			
			
			
			function jug_earn(){
				var a = ran(100);
					map_eventtext = document.getElementById("map-events").innerHTML;
				if((mon.name).indexOf("首领") == 0){
					if(a>=95){
						document.getElementById("map-events").innerHTML = name + "获得了橙装：" + "<br />" + map_eventtext ;
						} else if (a>=80){
							document.getElementById("map-events").innerHTML = name + "获得了紫装：" + "<br />" + name + "获得了" + (mon.power*(ran(5)+20)/5) +"经验" + "<br />"+ name + "获得了" + (mon.power*(ran(5)+20)/5) +"铜钱" + map_eventtext ;
						} else {
							document.getElementById("map-events").innerHTML = name + "获得了蓝装：" + "<br />"  + map_eventtext ;
						}
					document.getElementById("map-events").innerHTML = name + "获得了" + (mon.power*(ran(5)+20)*2) +"经验" + "<br />"+ name + "获得了" + (mon.power*(ran(5)+20)*2) +"铜钱" + "<br />" + map_eventtext;
					exp += mon.power*(ran(5)+20)*2;
					_money += mon.power*(ran(5)+20)*2;
				} else if ((mon.name).indexOf("精英") == 0){
					if(a>=99){
						document.getElementById("map-events").innerHTML = name + "获得了橙装：" + "<br />" + map_eventtext ;
					} else if (a>=95){
							document.getElementById("map-events").innerHTML = name + "获得了紫装：" + "<br />" + name + "获得了" + (mon.power*(ran(5)+20)/5) +"经验" + "<br />"+ name + "获得了" + (mon.power*(ran(5)+20)/5) +"铜钱" + map_eventtext ;
					} else {
							document.getElementById("map-events").innerHTML = name + "获得了蓝装：" + "<br />"  + map_eventtext ;
					}
					document.getElementById("map-events").innerHTML = name + "获得了" + (mon.power*(ran(5)+20)*2) +"经验" + "<br />"+ name + "获得了" + (mon.power*(ran(5)+20)*2) +"铜钱" + "<br />"  + map_eventtext;
					exp += mon.power*(ran(5)+20)*2;
					_money += mon.power*(ran(5)+20)*2;
				} else if ((mon.name).indexOf("强壮") == 0){
					if (a>=99){
							document.getElementById("map-events").innerHTML = name + "获得了紫装：" + "<br />"  + map_eventtext  ;
					} else if(a>80){
							document.getElementById("map-events").innerHTML = name + "获得了蓝装：" + "<br />"  + map_eventtext 
					}
					document.getElementById("map-events").innerHTML = name + "获得了" + (mon.power*(ran(5)+20)*2) +"经验" + "<br />"+ name + "获得了" + (mon.power*(ran(5)+20)*2) +"铜钱" + "<br />"  +  map_eventtext ;
					exp += mon.power*(ran(5)+20)*2;
					_money += mon.power*(ran(5)+20)*2;
				} else {
					if (a>=80){
							document.getElementById("map-events").innerHTML = name + "获得了蓝装：" + "<br />" + name + "获得了" + (mon.power*(ran(5)+20)/5) +"经验" + "<br />"+ name + "获得了" + (mon.power*(ran(5)+20)*2) +"铜钱" + map_eventtext  ;
						}
					document.getElementById("map-events").innerHTML = name + "获得了" + (mon.power*(ran(5)+20)*2) +"经验" + "<br />"+ name + "获得了" + (mon.power*(ran(5)+20)*2) +"铜钱" + "<br />"  +  map_eventtext ;
					exp += mon.power*(ran(5)+20)*2;
					_money += mon.power*(ran(5)+20)*2;
				}
				
			}
	
	
	
	
	
	
	//操作
	function cut(){
		
	}
	//特殊地图
//地图一
	function remap(){
		var a = document.getElementsByClassName("map");
		for(var i = 0; i<a.length; i++){
			a[i].style.display = "none" ;
		}
	}
	
	
	///////////////////////////////                                                             新手村
	function retalk(b){
		var a = document.getElementsByClassName("npcbutton");
		for(i=0;i<a.length;i++){
			newvaNpcName.innerHTML = b;
			a[i].style.display = "none" ;
			
		}
	}
	
	function newvatalk(npcname){
		switch(npcname){
			case "村长":
			textbox1.innerHTML = "吃屎了你";
			break;
			case "村长老婆":
			textbox1.innerHTML = "吃屎了你";
			break;
			case "胡先生":
			textbox1.innerHTML = "吃屎了你";
			break;
			case "牛大夫":
			textbox1.innerHTML = "吃屎了你";
			break;
			case "杜小二":
			textbox1.innerHTML = "吃屎了你";
			break;
			case "朱铁匠":
			textbox1.innerHTML = "吃屎了你";
			break;
			case "王寡妇":
			textbox1.innerHTML = "吃屎了你";
			break;
			case "谢大胆":
			textbox1.innerHTML = "吃屎了你";
			break;
			case "武教头":
			textbox1.innerHTML = "吃屎了你";
			break;
			case " 韦朕":
			textbox1.innerHTML = "吃屎了你";
			break;
		}
	}////////////                                                          函数     谈话
	

	///////////////////////////////
	
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////                                  ！！！左下角道具栏

	function resetitem(){
		var a = document.getElementById("itembox") ;
		var b = document.getElementsByClassName("item");
		for(var i =0 ;i<b.length;i++){
			b[i].style.zIndex = 1;
		}
		
	}             //                                                                     重置所有道具栏选择页面层级


/////////////////////        ！！！ 装备
	var equiparr = [];
    var equiptype = ["头","面具","项链","衣服","手镯","主武器","副武器","戒指","裤子","鞋"];
    var equipqualituy = ["粗糙","良好","精良","优秀","通神"];		
    function newequip(){
   	var neweq = new Object;
   		neweq.lv = (Math.floor((map_coe/2-1)+(Math.random()*1.2-0.6) ))*5 ;
   		a = Math.random()*100;
	   		if(a>99.5)
	   			neweq.type = equiptype[1];
	   		else if(a>99)
	   			neweq.type = equiptype[6];
			else if(a>98)
	   			neweq.type = equiptype[2];
	   		else if(a>97)
	   			neweq.type = equiptype[4];
	   		else if(a>96)
	   			neweq.type = equiptype[7];
	   		else if(a>80)
	   			neweq.type = equiptype[0];
	   		else if(a>64)
	   			neweq.type = equiptype[3];
	   		else if(a>48)
	   			neweq.type = equiptype[8];
	   		else if(a>32)
	   			neweq.type = equiptype[9];
	   		else 
	   			neweq.type = equiptype[5];
   		b = Math.random()*100;
	   		if(b>99)
	   			neweq.quality = equipqualituy[4];
	   		else if(b>95)
	   			neweq.quality = equipqualituy[3];
	   		else if(b>80)
	   			neweq.quality = equipqualituy[2];
	   		else if(b>50)
	   			neweq.quality = equipqualituy[1];
	   		else
	   			neweq.quality = equipqualituy[0];
   		console.log(neweq);
   		neweq.name = neweq.quality + "的"+neweq.type +"Lv" + neweq.lv;
   		equiparr.push(neweq);
   		neweq.num = equiparr.indexOf(neweq);
   		equipbox.innerHTML += '<input type="checkbox" id="'+ neweq.num +'" class="equips">' + neweq.name +"<br>";
   }

var isequipboxall = 0;
		equipboxall.onclick = function(){
			var a = document.getElementsByClassName("equips");
			if( isequipboxall == 0 ){
			for(i=0;i<equiparr.length;i++){
					a[i].checked = true;
				}
				isequipboxall =1 ;
			}
			else {
				for(i=0;i<equiparr.length;i++){
					a[i].checked = false;
				}
				isequipboxall = 0;
			}
		}/////////                                                         点击事件        装备全选/取消全选 
		
		equipboxsell.onclick = function(){
			var a = document.getElementsByClassName("equips");
			var delbox = [];
			for(i = (equiparr.length-1) ; i>-1;i--){
				if(a[i].checked == true){
					var b = '<input type="checkbox" id="'+ equiparr[i].num +'" class="equips">' + equiparr[i].name +"<br>";
					delbox.push(b);
					equiparr.splice(i,1);
					for(k in equiparr){
						equiparr[k].num = equiparr.indexOf(equiparr[k]);
					}
				}
			}
			for(i= 0 ; i<delbox.length ; i++){
				var del = delbox[i];
				equipbox.innerHTML = equipbox.innerHTML.replace(del,"");
			}
		}
