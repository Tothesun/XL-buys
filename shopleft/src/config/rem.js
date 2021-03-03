/*
 * @Author: your name
 * @Date: 2020-10-18 11:24:56
 * @LastEditTime: 2020-10-21 19:28:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\config\rem.js
 */
(function (win,doc) {
    var docE1 = doc.documentElement,
        resizeEvt = "oritentation" in window ? "orientation" : "resize";
    recalc = function () {
        var clientWidth = docE1.clientWidth;
        if (!clientWidth) return;
        docE1.style.fontSize = 15 * (clientWidth / 320) + "px";
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
})(window,document)