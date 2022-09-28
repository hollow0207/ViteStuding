import { HEADER, HEADERPARAMS, TOKENNAME, HTTP_REQUEST_URL } from "./config" 

const request = function(
	url:string,
	method:any,
	data?:any,
	auth?:any,
	params?:unknown
){
	if(auth == undefined){
		auth = {
			auth:true,
			loading:false
		}
	}
	// 持久化token
	const token = uni.getStorageSync('token');
	const Url = HTTP_REQUEST_URL
	let header = JSON.parse(JSON.stringify(HEADER))
	if(params != undefined){
		header = HEADERPARAMS
	}
	// 需要权限 但是没有token处理 - 转到登录页
	// if(auth.auth){
	// 	if(!token){
	// 		// 跳转登录页
	// 		uni.clearStorage();
	// 		return Promise.reject({
	// 			msg:'未登录'
	// 		})
	// 	}else{
	// 		header[TOKENNAME] = 'Bearer' + token
	// 	}
	// }

	// 返回一个promise作为封装后的输出值
	return new Promise((resolve, reject)=>{
		if(auth.loading){
			uni.showLoading({
				title:'请稍后',
				mask:true
			})
		}
		// 发送请求, method不能用string赋值所以改成any类型
		uni.request({
			// 参数
			url:Url + url,
			method:method || "GET",
			header:header,
			data:data || {},
			// 请求成功回调函数
			success:(res:any)=>{
				resolve(res)
				uni.hideLoading()
				// 存入token
				// if(res.data.data.token && res.data.data.token != null){
				// 	uni.setStorageSync('token', res.data.data.token)
				// }
				if(!auth.auth){
					resolve(res.data)
				}else{
					const {code} = res.data; // 接受状态码进行反应
					switch(code){
						case '200':
							resolve(res.data)
							break;
						case '-1':
							uni.showToast({
								title:res.data.error,
								duration:2000,
								icon:'error'
							});
							reject(res.data)
							break;
						case '401':
							// token过期
							uni.clearStorage();
							uni.navigateTo({
								url:'/page/home/home'
							})
							reject(res.data)
							break;
						default:
							// uni.showToast({
							// 	title:'系统错误',
							// 	duration:2000,
							// 	icon:'error'
							// });
							// reject(res.data.message || '系统错误')
							break;
					}
				}
			},
			fail:(msg:any)=>{
				uni.hideLoading()
				reject('请求失败')				
			}
		})
	})
}

export default request