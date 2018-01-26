/**
 * Created by huang on 16/3/18.
 * 这里主要是一些通用方法
 */

/**
 * 获取用户的地理位置
 */
function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        $.toast("该浏览器不支持获取地理位置");
    }
}

/**
 * 验证手机号码
 * @param tel
 */
function checkPhone(tel) {
    var reg = new RegExp("^1[3-8]+\\d{9}$");
    return reg.test(tel);
}

/**
 * 获取url中的参数
 * @param {String} name
 * @returns {String}
 */
function getParamValue(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return unescape(r[2]);
    } else {
        return "";
    }
}

/**
 * 对Date类进行Format扩展,对时间进行特定样式转换
 * @param fmt 需要转化的样式,如yyyyMMdd HH:mm:ss
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 对Date类进行AwayFrom扩展,返回指定时间点到当前时间
 * @param time
 * @returns {String}
 * @constructor
 */
Date.prototype.AwayFrom = function (time) {
    var year = 60 * 60 * 24 * 365;
    var month = 60 * 60 * 24 * 30;
    var week = 60 * 60 * 24 * 7;
    var day = 60 * 60 * 24;
    var hour = 60 * 60;
    var mintues = 60;

    var currTime = new Date().getTime() / 1000;
    var awayTime = currTime - time;
    if (awayTime / year > 1) {
        return parseInt(awayTime / year) + "年前";
    }
    if (awayTime / month > 1) {
        return parseInt(awayTime / month) + "月前";
    }
    if (awayTime / week > 1) {
        return parseInt(awayTime / week) + "周前";
    }
    if (awayTime / day > 1) {
        return parseInt(awayTime / day) + "天前";
    }
    if (awayTime / hour > 1) {
        return parseInt(awayTime / hour) + "小时前";
    }
    if (awayTime / mintues > 1) {
        return parseInt(awayTime / mintues) + "分钟前";
    }
    return "刚刚";
}


