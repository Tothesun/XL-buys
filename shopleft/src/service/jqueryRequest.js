/*
 * @Author: your name
 * @Date: 2020-11-10 15:24:55
 * @LastEditTime: 2021-02-04 10:11:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\service\axios.js
 */
import $ from "jquery"

export default function axioss(url = "", params = {}, type = "GET") {
	return new Promise((resolve,reject)=>{
		if(type.toLowerCase() === "get" ){
			$.get(url,params,(data)=>{
				resolve(data);
			})
		}else if(type.toLowerCase() === "post"){
			$.post(url,params,(data)=>{ 
				resolve(data);
			})
		}else{
			return "其他请求";
		}
	})
	
}

