import { exTypes } from "../../core/constants";

// 组件name
export const mod_name = 'wa_timing';
// 组件执行时机，
export const mod_exType = exTypes.onload;
// 组件执行统计的function
export const mod_fn = function() {
    const _this = this,
        _win = window,
        _performance = _win.performance || _win.webkitPerformance || _win.msPerformance || _win.mozPerformance;
    // 只统计实现了performance API的平台
    if (!_performance) {
        return false;
    }
    const _timing = _performance.timing;
    let times = {};
    // 白屏时间
    times.firstPaint = getFirstPaint(_win, _timing);
    // DNS查询耗时
    times.domainLookup = _timing.domainLookupEnd - _timing.domainLookupStart;
    // TCP建立连接耗时
    times.tcpConnect = _timing.connectEnd - _timing.connectStart;
    // html文档请求/响应总耗时
    times.htmlRequest = _timing.responseEnd - timing.requestStart;
    // html文档请求耗时
    times.htmlPureRequest = _timing.requestEnd - timing.requestStart;
    // html文档响应传输耗时
    times.htmlPureResponse = _timing.responseEnd - timing.responseStart;
    // domready时间点
    times.domready = _timing.domContentLoadedEventEnd - _timing.fetchStart;
    // onload时间点
    times.onload = _timing.loadEventEnd - _timing.fetchStart;

    return times;
};

/**
 * 获取白屏时间
 */
const getFirstPaint = function(win, timing) {
    let _firstPaint = 0;
    if (win.chrome && win.chrome.loadTimes) {
        // chrome提供loadTimes API，以s作为计量单位，数据比performance API精确几位小数
        // loadTimes的startLoadTime等于performance.timging.fetchStart
        let _times_chrome = win.chrome.loadTimes();
        _firstPaint = (_times_chrome.firstPaintTime - _times_chrome.startLoadTime) * 1000;
    } else if (typeof timing.msFirstPaint === 'number') {
        // IE提供msFirstPaint API，以ms作为计量单位
        _firstPaint = timing.msFirstPaint - timing.fetchStart;
    } else {
        _firstPaint = timing.domLoading - timing.fetchStart;
    }
    return _firstPaint;
}