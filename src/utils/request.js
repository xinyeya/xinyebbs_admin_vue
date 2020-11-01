import axios from 'axios';
import store from "@/store";

const request = axios.create({
    baseURL: 'http://www.bbsxinye.com/admin/v1.0/',
    timeout: 30000,
    dataType: "json",
});

// Alter defaults after instance has been created
// request.defaults.headers.common['Authorization'] = "593071F0B192F912D3B0F300FD77495D";


// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 如果已登录，则为请求接口统一添加用户 token
    const { userinfo } = store.state;
    if (userinfo) {
        config.headers.token = `${userinfo.token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default request;