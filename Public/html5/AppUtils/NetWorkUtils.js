/**
 * Created by huang on 16/3/18.
 * 这里主要是网络请求的处理
 */

/**
 * 服务器地址
 * @type {string}
 */
var SERVER_URL = "http://p.yunyoutui.com/";

/**
 * 获取服务器数据
 * @param control 模块名
 * @param method 方法名
 * @param params 参数
 * @param callback 回调函数
 * @constructor
 */
function Post(control, method, params, callback) {
    $.ajax({
        type: "POST",
        url: SERVER_URL + "?c=" + control + "&a=" + method,
        dataType: "JSON",
        data: params.getValues(),
        success: function (data) {
            console.log(SERVER_URL + "?c=" + control + "&a=" + method);
            if (data.code === 1) {
                callback(data.body);
            } else if (data.code === 0) {
                $.toast(data.result);
            } else {
                var newData = eval("(" + data + ")");
                if (newData.code === 1) {
                    callback(newData.body);
                } else if (newData.result === 0) {
                    console.log(newData.result);
                } else {
                    console.log("数据错误！")
                }
            }
        },
        error: function (jqXHR) {
            console.log("数据错误！");
            console.log(SERVER_URL + "?c=" + control + "&a=" + method);
        }
    });
}

/**
 * 自定义的对象,用户处理传递给服务器的参数
 * @constructor
 */
var HashMap = function () {
    var values = "";

    /**
     * 增加参数
     * @param key
     * @param value
     */
    this.addValue = function (key, value) {
        if (values === "") {
            values = key + "=" + value;
        } else {
            values = values + "&" + key + "=" + value;
        }
    }

    /**
     * 获取最后的参数字符串
     * @returns {string}
     */
    this.getValues = function () {
        return values;
    }
}




