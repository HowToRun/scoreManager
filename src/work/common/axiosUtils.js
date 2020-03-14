import axios from 'axios'
import qs from 'qs'

//axios原生的也添加请求拦截,在上传图片时候有用到axios本身

const axiosPostForm = axios.create({
    // axios实例配置
    timeout: 15000,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function(data) {
        // 请求前参数序列化
        return qs.stringify(data);
    }]
});

const axiosGetForm = axios.create({
    // axios实例配置
    timeout: 15000,
    method: 'get',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function(data) {
        // 请求前参数序列化
        return qs.stringify(data);
    }]
});
const axiosGetJson = axios.create({
    // axios实例配置
    timeout: 15000,
    method: 'get',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // transformRequest: [function(data) {
    //     // 请求前参数序列化
    //     return qs.stringify(data);
    // }]
});
const axiosPostJson = axios.create({
    // axios实例配置
    timeout: 15000,
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // transformRequest: [function(data) {
    //     // 请求前参数序列化
    //     return qs.stringify(data);
    // }]
});

// 请求超时次数上限
axiosPostForm.defaults.retry = 3;
// 重新请求延时
axiosPostForm.defaults.retryDelay = 1000;
axiosPostJson.defaults.retry = 3;
axiosPostJson.defaults.retryDelay = 1000;
axiosGetJson.defaults.retry = 3;
axiosGetJson.defaults.retryDelay = 1000;
axiosGetForm.defaults.retry = 3;
axiosGetForm.defaults.retryDelay = 1000;

export {axiosGetForm,axiosGetJson,axiosPostForm,axiosPostJson}