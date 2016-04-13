var oCity = document.getElementById('aqi-city-input');
var oAbove = document.getElementById('aqi-value-input');
var oBtn = document.getElementById('add-btn');
var oTable = document.getElementById('aqi-table');
var oBody = document.getElementById('aqi-body');

var Tools = function() {
	this.cname = '';
	this.trim = function(str) {
		return str.replace(/^\s+|\s+$/g, '');
	};
	this.zhen = function(str) {
		return this.valid(str, /^[a-zA-Z\u4e00-\u9fa5]{2,10}$/g);
	};
	this.num = function(str) {
		return this.valid(str, /^[0-9]{1,5}$/g);
	};
	this.valid = function(str, reg) {
		return reg.test(str);
	};

	this.bind = function(elem, type, handler) {
		var hdl = this.handler(elem, handler);
		elem.addEventListener ? elem.addEventListener(type, hdl, false) : elem.attachEvent('on' + type, hdl);
	};
	this.handler = function(elem, fn) {
		var _this = this;
		return function(event) {
			event = _this.fix(event || window.event);
			if (fn.call(elem, event) === false) {
				event.preventDefault();
				event.stopPropagation();
			};
		}
	};
	this.fix = function(event) {
		if (event.target) return event;
		var event2 = {
			target: event.srcElement || document,
			preventDefault: function() {
				event.returnValue = false;
			},
			stopPropagation: function() {
				event.cancelBubble = true;
			}
		};
		// IE6/7/8 在原生window.event对象写入数据会导致内存无法回收，应当采用拷贝
		for (var i in event) event2[i] = event[i];
		return event2;
	};

	this.createRow = function() {
		var cname = this.cname;
		var newRow = oBody.insertRow(0);
		var newCell1 = newRow.insertCell(0);
		var newCell2 = newRow.insertCell(1);
		var newCell3 = newRow.insertCell(2);
		newCell1.innerHTML = cname;
		newCell2.innerHTML = aqiData[cname];
		newCell3.innerHTML = '<button >删除</button>';
		newCell3.cname = cname;
	};
	this.updataRow = function() {
		var cname = this.cname;
		var row = oBody.rows[cache.obj[cname]];
		row.cells[0].innerHTML = cname;
		row.cells[1].innerHTML = aqiData[cname];
	};
	this.deleRow = function() {
		oBody.deleteRow(cache.obj[this.cname]);
	};

	this.addCache = function() {
		cache.ary.splice(0, 0, this.cname);
		this.initCache();
	};
	this.delCache = function() {
		cache.ary.splice(cache.obj[this.cname], 1);
		delete cache.obj[this.cname];
		this.initCache();
	};
	this.initCache = function() {
		for (var i = 0; i < cache.ary.length; i++) {
			cache.obj[cache.ary[i]] = i;
		}
	};

};
//工具对象
var tool = new Tools();

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
//缓存
var cache = {
	ary: [],// rowindex:北京
	obj: {} //北京：rowindex
};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	//校验
	var cname = tool.trim(oCity.value);
	var aname = tool.trim(oAbove.value)
	if (!tool.zhen(cname)) {
		oCity.value = '城市名称必须2-10位的中英文！';
		oCity.focus();
		oCity.select();
		return false;
	}
	if (!tool.num(aname)) {
		oAbove.value = '空气质量指数必须1-5位正整数！';
		oAbove.focus();
		oAbove.select();
		return false;
	}
	//成功后添加到对象和tool中
	aqiData[cname] = aname;
	tool.cname = cname;
	return true;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	//清除记录提示 当然可以在删除所有数据的时候让她
	if (cache.ary.length === 0) {
		oBody.deleteRow(0);
	}
	if (typeof(cache.obj[tool.cname]) === 'undefined') {
		tool.addCache();
		tool.createRow();
		return;
	}
	tool.updataRow();
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	if (!addAqiData()) return;
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
	tool.deleRow();
	tool.delCache();
	delete aqiData[tool.cname];
}

function init() {
	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	tool.bind(oBtn, 'click', function() {
		addBtnHandle();
	});
	tool.bind(oBody, 'click', function(e) {
		if (e.target.tagName.toLocaleLowerCase() == 'button') {
			tool.cname = e.target.parentNode.cname;
			delBtnHandle();
			return false;
		}
	});

}
init();