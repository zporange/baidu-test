(function(window, undefined) {
	window.onload = function() {
		var city = document.getElementById('aqi-city-input'),
			weather = document.getElementById('aqi-value-input'),
			btn = document.getElementById('add-btn'),
			table = document.getElementById('aqi-table'),
			city_error = document.getElementById('city-error'),
			value_error = document.getElementById('value-error'),
			reset = document.getElementById('reset');

		function trim(str) {
			return str.replace(/(^\s+)|(\s+$)/g, '');
		}
		function ifHasNumber(str) {
			if (!trim(str)) {
				city_error.innerText = '城市输入为空，请输入一个城市！';
				return	false;
			}
			var pos = trim(str).search(/\d/);
			if (pos >= 0) {
				city_error.innerText = '输入有误，请输入中文或者英文字母，不能包含数字！';
				return false;
			}
			return true;
		}
		function ifHasLetter(str) {
			if (!trim(str)) {
				value_error.innerText = '空气质量输入为空，请输入当前城市的天气质量！';
				return false;
			}
			var pos = trim(str).search(/\D/);
			if (pos >= 0) {
				value_error.innerText = '输入有误，请输入一个合法的正整数，不能包含中文、英文字母或者中间包含空格！';
				return false;
			}
			return true;
		}
		function bind(node, type, handler) {
			if (!node) return false;
			if (node.addEventListener) {
				node.addEventListener(type, handler, false);
				return true;
			} else if (node.attachEvent) {
				node['e' + type + handler] = handler;
				node[type + handler] = function() { //处理 ie 里的 this，同时方便 unbind
					node['e' + type + handler](window.event);
				};
				node.attachEvent('on' + type, node[type + handler]);
				return true;
			}
			return false;
		}
		function delegateEvent(node, tag, eventName, listener) {
            bind(node, eventName, function () {
                var event = arguments[0] || window.event,
                    target = event.target || event.srcElement;
                if (target && target.tagName === tag.toUpperCase()) {
                    listener.call(target, event);
                }
            });
        }
		function clear() {
			city_error.innerText = '';
			value_error.innerText = '';
		}
		/**
         * aqiData，存储用户输入的空气指数数据
         * 示例格式：
         * aqiData = {
         *    "北京": 90,
         *    "上海": 40
         * };
         */
        var aqiData = {};
        var canAdd = false;
        var isDelete = false;
        /**
         * 从用户输入中获取数据，向aqiData中增加一条数据
         * 然后渲染aqi-list列表，增加新增的数据
         */
        function addAqiData() {
        	clear();
        	if (ifHasNumber(city.value)) {
        		if (ifHasLetter(weather.value)) {
        			canAdd = true;
        			aqiData[city.value] = parseInt(weather.value);
        		}
        	} else {
        		ifHasLetter(weather.value);
        	}
        }
        /**
         * 渲染aqi-table表格
         */
        function renderAqiList(index) {
         	if (canAdd) {
         		table.innerHTML +='<tr><td>' + city.value + '</td><td>' + weather.value + '</td><td><button>删除</button></td>';
         		canAdd = false;
         		city.value = '';
         		weather.value = '';
         	}
         	if (isDelete) {
         		delRow(index);
         		isDelete = false;
         	}
         	console.log(aqiData);
        }
        function delRow(index) {
        	table.deleteRow(index);
        }
        /**
         * 点击add-btn时的处理逻辑
         * 获取用户输入，更新数据，并进行页面呈现的更新
         */
        function addBtnHandle() {
        	addAqiData();
        	renderAqiList();
        }
        /**
         * 点击各个删除按钮的时候的处理逻辑
         * 获取哪个城市数据被删，删除数据，更新表格显示
         */
        function delBtnHandle() {
        	// do sth.
        	isDelete = true;
        	renderAqiList(this.parentNode.parentNode.rowIndex);
        	delete aqiData[this.parentNode.parentNode.firstChild.innerHTML];
        	console.log(aqiData);
        }
        function init() {
        	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        	bind(btn, 'click', addBtnHandle);
        	//想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        	delegateEvent(table, "button", "click", delBtnHandle);
        }

        init();
	};
})(window);