import axios from "axios";
import router from './router'
import Element from "element-ui"
// axios.defaults.baseURL="http://localhost:8088"
const request=axios.create({//创建axios实例
    timeout:5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})
// 添加请求拦截器
request.interceptors.request.use(config=>{
    config.headers['Authorization']=localStorage.getItem("token")//用户凭证
   return config
    })
// 添加响应拦截器
request.interceptors.response.use( (response)=> {
    // 对响应数据做点什么
    let res=response.data
    if(res.code===200){
        return response
    }else{
        Element.Message.error(res.msg?res.msg:'系统异常')
        return Promise.reject(response.data.msg)
    }
},  (error)=> {
    // 对响应错误做点什么
        if(error.response.data){
            error.message=error.response.data.msg
        }
        if(error.response.status===401){//401没有权限
            router.push('/login')
        }
         Element.Message.error(error.message,{duration:3000})//弹出弹窗
        return Promise.reject(error)
});
export  default  request

