/*
 * @Author: your name
 * @Date: 2020-11-16 15:32:53
 * @LastEditTime: 2020-12-06 09:54:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\config\global.js
 */

/* 本地存储数据函数 */
export const setItem = (name,content)=>{
    if(!name) return;
    if(typeof content !== "string"){
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name,content);
}

/* 本地获取数据函数 */
export const getItem = name=>{
    if(!name) return;
    if(typeof name !== "string"){
        content = JSON.stringify(name);
    }
    return window.localStorage.getItem(name);
}

/* 本地清除数据缓存 */
export const removeItem = name=>{
    if(!name) return;
    if(typeof name === "string"){
        return window.localStorage.removeItem(name);
    }
}

/* 缓动动画 */
export const animate = (end)=>{
    let scrollY = document.documentElement.scrollTop,timer;

    timer =  setInterval(() => {
        scrollY -= 30;
        document.documentElement.scrollTop = scrollY;
        if(scrollY <= 0){
            document.documentElement.scrollTop = end;
            clearTimeout(timer);
        }
    }, 0.01);

}
