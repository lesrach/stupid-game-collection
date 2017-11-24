//////////////////////////////                                                                         创建人物模块
document.getElementById("createnew").onclick = function(){
	document.getElementById("create").style.display = "block";
}   //                                                                                                 调出创建模块     

document.getElementById("esc").onclick = function(){
	document.getElementById("create").style.display = "none";
	
}   //                                                                                                 退出创建模块     

document.getElementById("sure").onclick = function(){
	if(document.getElementById("inputname").value == ""){
		alert("请输入一个名字")
		return;
	}
	if(document.getElementById("c1").innerHTML == 0){
		alert("请随机一个属性")
		return;
	}
	
	document.getElementById("str").innerHTML = document.getElementById("c1").innerHTML;
	document.getElementById("phy").innerHTML = document.getElementById("c2").innerHTML;
	document.getElementById("headstr").innerHTML = document.getElementById("c3").innerHTML;
	document.getElementById("foot").innerHTML = document.getElementById("c4").innerHTML;
	document.getElementById("luck").innerHTML = document.getElementById("c5").innerHTML;
	document.getElementById("name").innerHTML = document.getElementById("inputname").value;
	name = document.getElementById("inputname").value;
	document.getElementById("create").style.display = "none";
	document.getElementById("newbackground").style.display = "none";
	document.getElementById("headtell").innerHTML = "十里坡剑神" ;
	document.getElementById("age").innerHTML = 16 ;
	_exp_func = setInterval("expup(co._exp_coe)",_exp_second);  //启动经验自加
	_jug_num = setInterval("jugnum()",1000);            //启动数据校验
}   //                                                                                                  确定创建人物

document.getElementById("randompro").onclick = function(){
	do{
		var a = ran(20)+10;
		var b = ran(20)+10;
		var c = ran(20)+10;
		var d = ran(20)+10;
		var e = ran(20)+10;
		var count = a+b+c+d+e;
	} while(count > 120 && count < 80)
	c1.innerHTML = a;
	c2.innerHTML = b;
	c3.innerHTML = c;
	c4.innerHTML = d;
	c5.innerHTML = e;
	str = a;
	phy = b;
	headstr = c;
	foot = d;
	luck = e;
}
//////////////////////////////////////////////////////////////////////////////                          其余事件
document.getElementById("save").onclick  = function(){
	alert("还不会，就给看看");
}//                                                                                     存档

document.getElementById("expup").onclick = function(){
	_exp_second /= 2 ;
		if (_exp_second<1)
	_exp_second = 500;
	var a = Math.floor(500/_exp_second);
	console.log(_exp_second);
	clearInterval(_exp_func);
	_exp_func = setInterval("expup(co._exp_coe)",_exp_second);
	$("#expup").innerHTML = "加速X"+a;
}      //                                                                              cheat：加速

document.getElementById("stop").onclick = function(){
	_exp_second = 10000;
}     //                                                                               cheat:停止自循环函数

document.getElementById("lvup").onclick = function(){
	var _exp =parseInt(document.getElementById("exp").innerHTML);
	if (exp> exp_up){
		exp -= exp_up;
		exp_up += 1000;
		document.getElementById("exp").innerHTML = Math.floor(exp) ;
		console.log(Math.floor(exp));
		lv += 1;
		document.getElementById("lv").innerHTML = lv;
		_propoint += 5;
		document.getElementById("propoint").innerHTML = _propoint;
	}
	
}//                                                                                               升级操作


document.getElementById("xiulian").onclick = function(){
	if(isxiulian == false){
		func_xiulian = setInterval("xiulianzq()",50) ;
		isxiulian = true ;
		document.getElementById("xling").innerHTML = "正在修炼";
	} else {
		clearInterval(func_xiulian);
		isxiulian = false ;
		document.getElementById("xling").innerHTML = "";
	}
}//                                                                                        切换修炼状态


document.getElementById("zhenqiup").onclick = function (){
	var b = jug_nglv(co.nglv+1);
		
	if(zhenqi >= co.zhenqi_up){
		zhenqi -= co.zhenqi_up;
		document.getElementById("zhenqi").innerHTML = zhenqi;
		if( Math.random()< (1-nglv*0.05) ){
			zhenqi_up *= 3;
			nglv += 1;
			document.getElementById("xiuwei").innerHTML = jug_nglv(nglv);
			str += 5;
			foot += 5;
			phy += 5;
			headstr += 3;
			document.getElementById("str").innerHTML = str;
			document.getElementById("foot").innerHTML = foot;
			document.getElementById("phy").innerHTML = phy;
			document.getElementById("headstr").innerHTML = headstr;
		} else {
			alert("很不幸，你走火入魔，升级境界失败！")
		}
	} else {
		var a = co.zhenqi_up - zhenqi ;
		alert("你距离"+b+"还差"+ a +"真气");
	}
}////                                                                                         升级境界

///////////////////////////////////////////                                                         地图BOSS
document.getElementById("boss").onclick = function(){
	document.getElementById("boss").disabled= true ;
	if(_hpnow!=0){
		newboss();
		clearInterval(battlerun);
		battlerun = setInterval("battle(_hpnow,mon.hpnow,_atk,mon.atk,_def,mon.def,_speed,mon.speed)",_exp_second);
	}
}
	
	//                                                                                                 开始探索
document.getElementById("start").onclick = function(){
	document.getElementById("boss").disabled= false ;
	if(document.getElementById("map-name").innerHTML == "无"){
		alert("请选择地图");
		return;
	}
	map_eventstart = setInterval("mapevents()",_exp_second);
	document.getElementById("start").disabled = true;
	_mpnow = _mp;
	_hpnow = _hp;
	mpnow.innerHTML = _mpnow;
	hpnow.innerHTML = _hpnow;
}


document.getElementById("map_0").onclick = function(){
	remap();
	document.getElementById("newva").style.display = "block";
	map_coe = 1;
	
}

$("#talk").onclick = function(){
	newvatalk(newvaNpcName.innerHTML);
}

document.getElementById("backtostart").onclick = function(){
		remap();
		document.getElementById("newva").style.display = "block";
		map_coe = 1;
		_hpnow = _hp;
		document.getElementById("boss").disabled= false ;
		document.getElementById("start").disabled= false ;
		clearInterval(battlerun);
		document.getElementById("map-events").innerHTML = "";
		mon.hpnow = 0;
	}
	
	 
	document.getElementById("map_1").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_1").innerHTML;
		document.getElementById("map-name").style.color = "#333";
		remap();
		document.getElementById("mapcon").style.display = "block";
		map_coe = 5;
	}
	document.getElementById("map_2").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_2").innerHTML;
		document.getElementById("map-name").style.color = "#333";
		remap();
		document.getElementById("mapcon").style.display = "block";
		map_coe = 7;
	}
	document.getElementById("map_3").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_3").innerHTML;
		document.getElementById("map-name").style.color = "#333";
		remap();
		document.getElementById("mapcon").style.display = "block";
		map_coe = 9;
	}
	document.getElementById("map_14").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_14").innerHTML;
		document.getElementById("map-name").style.color = "gold";
		remap();
		document.getElementById("mapcon").style.display = "block";
	}
	document.getElementById("map_15").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_15").innerHTML;
		document.getElementById("map-name").style.color = "silver";
	}
	document.getElementById("map_16").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_16").innerHTML;
		document.getElementById("map-name").style.color = "blue";
	}
	document.getElementById("map_17").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_17").innerHTML;
		document.getElementById("map-name").style.color = "pink";
	}
	document.getElementById("map_18").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_18").innerHTML;
		document.getElementById("map-name").style.color = "#000";
	}
	document.getElementById("map_19").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_19").innerHTML;
		document.getElementById("map-name").style.color = "#fff";
	}
	document.getElementById("map_20").onclick = function(){
		document.getElementById("map-name").innerHTML = document.getElementById("map_20").innerHTML;
		document.getElementById("map-name").style.color = "purple";
	}
	
/////////////////////////                                      装备
	document.getElementById("equip").onclick = function(){
		resetitem();
		document.getElementById("items-equip").style.zIndex = 2;
	}
	document.getElementById("elixir").onclick = function(){
		resetitem();
		document.getElementById("items-elixir").style.zIndex = 2;
	}
	document.getElementById("book").onclick = function(){
		resetitem();
		document.getElementById("items-book").style.zIndex = 2;
	}
////////////以上为道具栏切换

////////////////测试函数
$("equipboxadd").onclick = function(){
	newequip();
	newequip();
	newequip();
	newequip();
	newequip();
}
///////////////