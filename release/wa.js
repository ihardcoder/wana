(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wa = undefined;
	
	var _main = __webpack_require__(1);
	
	var _timing = __webpack_require__(3);
	
	var wa = exports.wa = _main.WA.create(); //main.js with Synchronous modules all in one
	
	wa.use(_timing.mod_timing.name, _timing.mod_timing.fn);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WA = undefined;
	
	var _constants = __webpack_require__(2);
	
	var WA = exports.WA = {
	    modules: [],
	    data: {},
	    create: function create() {
	        var _this = this;
	        _this.data = {};
	        return _this;
	    },
	    send: function send() {},
	    set: function set() {},
	    // 创建插件API
	    use: function use(name, fn) {
	        var _this = this;
	        if (!name || !fn || typeof fn !== 'function') {
	            return;
	        }
	        _this.modules.push(name);
	        _this.data[name] = fn.call(_this);
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// exTypes代表组件的执行时机
	// async - window.onload之后执行，不影响页面渲染
	// sync - 随主文件一同加载执行
	var exTypes = exports.exTypes = {
	    "async": "async",
	    "sync": "sync"
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.mod_timing = undefined;
	
	var _constants = __webpack_require__(2);
	
	var mod_timing = exports.mod_timing = {
	    name: 'timing',
	    exType: 'async',
	    fn: function fn() {
	        var _this = this,
	            _win = window,
	            _performance = _win.performance || _win.webkitPerformance || _win.msPerformance || _win.mozPerformance;
	        // 只统计实现了performance API的平台
	        if (!_performance) {
	            return false;
	        }
	        var _timing = _performance.timing;
	        var times = {};
	        // 白屏时间
	        times.firstPaint = getFirstPaint(_win, _timing);
	        // DNS查询耗时
	        times.domainLookup = _timing.domainLookupEnd - _timing.domainLookupStart;
	        // TCP建立连接耗时
	        times.tcpConnect = _timing.connectEnd - _timing.connectStart;
	        // html文档请求/响应总耗时
	        times.htmlRequest = _timing.responseEnd - _timing.requestStart;
	        // html文档请求耗时
	        times.htmlPureRequest = _timing.requestEnd - _timing.requestStart;
	        // html文档响应传输耗时
	        times.htmlPureResponse = _timing.responseEnd - _timing.responseStart;
	        // domready时间点
	        times.domready = _timing.domContentLoadedEventEnd - _timing.fetchStart;
	        // onload时间点
	        times.onload = _timing.loadEventEnd - _timing.fetchStart;
	
	        return times;
	    }
	};
	
	/**
	 * 获取白屏时间
	 */
	var getFirstPaint = function getFirstPaint(win, timing) {
	    var _firstPaint = 0;
	    if (win.chrome && win.chrome.loadTimes) {
	        // chrome提供loadTimes API，以s作为计量单位，数据比performance API精确几位小数
	        // loadTimes的startLoadTime等于performance.timging.fetchStart
	        var _times_chrome = win.chrome.loadTimes();
	        _firstPaint = (_times_chrome.firstPaintTime - _times_chrome.startLoadTime) * 1000;
	    } else if (typeof timing.msFirstPaint === 'number') {
	        // IE提供msFirstPaint API，以ms作为计量单位
	        _firstPaint = timing.msFirstPaint - timing.fetchStart;
	    } else {
	        _firstPaint = timing.domLoading - timing.fetchStart;
	    }
	    return _firstPaint;
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=wa.map.js