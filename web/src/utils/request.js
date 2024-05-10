import axios from 'axios';
import { getToken } from './storage';


const API_HOST = 'http:localhost/api'

const SUCCESS_CODE = 200;
// const TIMEOUT = 5000;
const TIMEOUT = 20000;

export const instance = axios.create({
    baseURL: API_HOST,
    timeout: TIMEOUT,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

// TODO: 完善
instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

axios.defaults.headers.common['retry'] = 3;

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        // console.log("instance:",instance);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // FIXME
        config.headers['Authorization'] = getToken();
        console.log('requset_config', config);
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
//   eslint-disable-next-line consistent-return
instance.interceptors.response.use(
    (response) => {
        console.log('response', response);
        if (response.status === 200) {
            const { data } = response;
            if (data.code === SUCCESS_CODE) {
                console.log('reponse_data', data);
                return data;
            }
            // return Promise.reject(data);
            return data;
        }
        return Promise.reject(response?.data);
    },
    (error) => {
        const { config } = error;
        if (!config || !config.retry) return Promise.reject(error);

        config.retryCount = config.retryCount || 0;

        if (config.retryCount >= config.retry) {
            return Promise.reject(error);
        }

        config.retryCount += 1;

        // 设置请求间隔 通过定时器来阻塞
        const backoff = new Promise((resolve) => {
            setTimeout(() => {
                resolve({});
            }, config.retryDelay || 1);
        });

        return backoff.then(() => instance(config));
    }
);

export default instance;
