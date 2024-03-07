import axios from "axios"

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_HOST,
    timeout: 30000 // request timeout
})
const errorCode = {
    '401': '认证失败，无法访问系统资源',
    '403': '当前操作没有权限',
    '404': '访问资源不存在',
    'default': '系统未知错误，请反馈给管理员'
}
export let isReLogin = { show: false };

// 响应拦截器
service.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default']
        // 二进制数据则直接返回
        if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
            return res.data
        }
        if (code === 401) {
            if (!isReLogin.show) {
                isReLogin.show = true;
                isReLogin.show = false;
            }
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            return Promise.reject(new Error(msg))
        } else if (code === 601) {
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            return Promise.reject('error')
        } else {
            return  Promise.resolve(res.data)
        }
    },
    error => {
        console.log('err' + error)
        let { message } = error;
        if (message === "Network Error") {
            message = "接口连接异常";
        } else if (message.includes("timeout")) {
            message = "接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "接口" + message.substr(message.length - 3) + "异常";
        }
        return Promise.reject(error)
    }
)

export default service