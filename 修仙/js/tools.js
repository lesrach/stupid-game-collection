// 封装函数，实现根据id、标签、类名查找元素
// 参数：
//		selector : 选择器，如：#id, .className, element
//		context : 查询上下文环境，可选参数，表示一个具体的DOM对象
// 返回值：
//		返回满足条件的结果
function $(selector, context){
	context = context || document; // 默认查询上下文为 document
	if (selector.indexOf("#") === 0) // id
		return document.getElementById(selector.slice(1));
	if (selector.indexOf(".") === 0) // className
		return getElementsByClassName(selector.slice(1), context);
	return context.getElementsByTagName(selector);
}

// 解决 getElementsByClassName() 方法兼容问题
// 参数：
// 		className : 类名
//		context : 查询上下文环境，可选参数，表示一个具体的DOM对象
// 返回值：
//		返回根据类名查找的结果
function getElementsByClassName(className, context) {
	context = context || document;
	// 判断浏览器是否支持使用 getElementsByClassName()
	if (context.getElementsByClassName) // 支持
		return context.getElementsByClassName(className);

	/* 不支持 */
	var result = []; // 保存查找到结果的数组
	// 查找在查询上下文后代中所有的元素
	var allElements = context.getElementsByTagName("*");
	// 遍历所有元素
	for (var i = 0, len = allElements.length; i < len; i++) {
		// 判断当前遍历到的元素类名中是否存在待查找的类名
		var classNames = allElements[i].className.split(" ");
		if (inArray(className, classNames) !== -1) // 存在
			result.push(allElements[i]);
	}
	// 返回查找结果
	return result;
}

// 判断给定的某个值是否在数组中存在，存在则返回其下标，不存在返回-1
// 参数：
//		value : 待查找判断的值
//		array : 数组
// 返回值：
//		数组中的下标，-1表示不存在
function inArray(value, array) {
	if (Array.prototype.indexOf) // 支持使用数组的 indexOf() 方法
		return array.indexOf(value);
	// 不支持使用 indexOf()
	for (var i = 0, len = array.length; i < len; i++) {
		if (array[i] === value)
			return i;
	}
	return -1;
}

// 封装函数，获取/设置CSS样式
// 使用 css(element, "width") -- 获取 element元素的 width 属性值
// 使用 css(element, "width", "100px") -- 设置 element 元素的 width 属性值为 100px(只设置一个属性)
// 使用 css(element, {width:"100px", height:"100px"}) -- 设置 element 元素的多个CSS属性，属性名与属性值使用对象表示
// 参数：
//		element : DOM元素对象
//		attr : CSS属性名
//		value : CSS属性值，可选，不传表示获取CSS，传递表示设置CSS
// 返回值：
//		查找到的CSS属性值
function css(element, attr, value) {
	// 获取
	if (typeof attr === "string" && typeof value === "undefined")
		return window.getComputedStyle 
				? getComputedStyle(element)[attr] 
				: element.currentStyle[attr];
	// 设置
	if (typeof attr === "string" && value){
		element.style[attr] = value;
	} else if (typeof attr === "object") {
		for (var prop in attr) {
			element.style[prop] = attr[prop];
		}
	}
}

// 显示 element 元素
function show(element) {
	element.style.display = "block";
}

// 隐藏 element 元素
function hide(element) {
	element.style.display = "none";
}

// 注册事件监听
function on(element, type, callback) {
	if (element.addEventListener) { // 支持使用 addEventListener
		if (type.indexOf("on") === 0)
			type = type.slice(2);
		element.addEventListener(type, callback, false);
	} else { // 不支持使用 addEventListener
		if (type.indexOf("on") !== 0)
			type = "on" + type;
		element.attachEvent(type, callback);
	}
}

// 解除事件监听
function off(element, type, callback) {
	if (element.removeEventListener) { // 支持使用 removeEventListener
		if (type.indexOf("on") === 0)
			type = type.slice(2);
		element.removeEventListener(type, callback, false);
	} else { // 不支持使用 removeEventListener
		if (type.indexOf("on") !== 0)
			type = "on" + type;
		element.detachEvent(type, callback);
	}
}

// 获取/设置指定元素在文档中的定位坐标
// 参数：
//		element : DOM 元素
//		coordinate : 坐标，可选参数，传递时表示设置元素在文档中的坐标
function offset(element, coordinate) {
	if (typeof coordinate === "undefined") { // 获取
		var _top = 0, _left = 0;
		while(element) {
			_top += element.offsetTop;
			_left += element.offsetLeft;
			element = element.offsetParent;
		}

		return {
			top : _top,
			left : _left
		};
	}
	
	// 设置
	// 先查找父元素在文档中坐标
	var _top = 0, _left = 0, currentElement = element.offsetParent;
	while(currentElement) {
		_top += currentElement.offsetTop;
		_left += currentElement.offsetLeft;
		currentElement = currentElement.offsetParent;
	}
	// 计算当前元素在文档中定位换算为距其有定位父元素坐标系中的位置
	css(element, {
		top : coordinate.top - _top + "px",
		left : coordinate.left - _left + "px"
	});
}

// 解决 event.pageX/event.pageY 兼容问题
function page(e) {
	var _x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
		_y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
	return {
		x : _x,
		y : _y
	}
}

// 封装操作 cookie 的函数：获取/设置 cookie
// 参数：
//		key : cookie 名
//		value : cookie 值，可选，不传递表示读取cookie
//		options : 可配置项  {expires:7, path:"/", domain:"", secure:true}
function cookie(key, value, options){
	// 读取
	if (typeof value === "undefined") {
		var cookies = document.cookie.split("; ");
		for (var i = 0, len = cookies.length; i < len; i++) {
			var cookie = cookies[i].split("=");
			var name = decodeURIComponent(cookie.shift());
			if (name === key)
				return decodeURIComponent(cookie.join("="));
		}

		return null;
	}

	// 保存
	// 基础 key=value 的结构
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	// 判断是否有可配置项
	options = options || {};
	if (options.expires) { // 失效时间
		var date = new Date();
		date.setDate(date.getDate() + options.expires);
		cookie += ";expires=" + date.toUTCString();
	}
	if (options.path) // 路径 
		cookie += ";path=" + options.path;
	if (options.domain) // 域名
		cookie += ";domain=" + options.domain;
	if (options.secure) // 安全
		cookie += ";secure";

	document.cookie = cookie;
}

// 删除 cookie
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1;
	cookie(key, "", options);
}