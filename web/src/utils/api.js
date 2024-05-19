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

// 获取用户信息
export const GetUserInfo = async () => {
  try {
    const response = await instance.get('/login/list');
    return response;
  } catch (error) {
    console.error('GetUserInfo error:', error);
    throw error;
  }
};

// 更改用户权限
export const ChangeUser = async (payload) => {
  try {
    const response = await instance.post('/user/update', payload);
    return response;
  } catch (error) {
    console.error('ChangeUser error:', error);
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

// 向后端发送表单消息
export const SendForm = async (payload) => {
  try {
    const response = await instance.post('/form/new', payload);
    return response;
  } catch (error) {
    console.error('SendForm error:', error);
    throw error;
  }
};

// 获取展示消息
export const GetShow = async () => {
  try {
    const response = await instance.get('/show/kind');
    return response;
  } catch (error) {
    console.error('GetShow error:', error);
    throw error;
  }
};
// 获取漏洞年份
export const GetYear = async () => {
  try {
    const response = await instance.get('/show/year');
    return response;
  } catch (error) {
    console.error('GetYear error:', error);
    throw error;
  }
}