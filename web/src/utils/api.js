import instance from './request'
//登录，获取jwt
export const login = (payload) => {
    return instance.post('/login', payload);
}