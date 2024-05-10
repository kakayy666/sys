import instance from './request'
//登录，获取jwt
export const Login = async (payload) => {
    // console.log('payload', payload);
  try {
    // 使用await等待post请求的结果
      const response = await instance.post('/login', payload);
    // 请求成功，返回响应数据
    return response;
  } catch (error) {
    // 请求失败，抛出错误或进行错误处理
    console.error('Login error:', error);
    throw error;
  }
};

// 注册用户
export const Register = async (payload) => {
  try {
    const response = await instance.post('/login/register', payload);
    return response;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};