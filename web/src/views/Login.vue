<template>
    <div id="background" class="container"></div>
    <div class="card">
        <div class = "board">
            <img src="/cse.ico" style="width: 30px; height: 30px;margin-top:30px;">
            <div class="title">S2Vulhub</div>
        </div>
        <div class="layout">
            <el-tabs type="border-card">
                <el-tab-pane label="登录">
                    <el-form label-position="right" label-width="60px" style="max-width: 460px" class="loginForm">
                        <el-form-item label="用户：">
                            <el-input v-model="username" />
                        </el-form-item>
                        <el-form-item label="密码：">
                            <el-input type="password" v-model="password" />
                        </el-form-item>

                        <el-button type="primary" class="loginBtn" @click="login">
                            登录
                        </el-button>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="注册">
                    <el-form label-position="right" label-width="100px" style="max-width: 460px" class="loginForm">
                        <el-form-item label="用户：">
                            <el-input v-model="rusername" />
                        </el-form-item>
                        <el-form-item label="密码：">
                            <el-input type="password" v-model="rPassword" />
                        </el-form-item>
                        <el-form-item label="确认密码：">
                            <el-input type="password" v-model="confirmPassword" />
                        </el-form-item>

                        <el-button type="primary" class="loginBtn" @click="register">
                            注册
                        </el-button>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import * as THREE from "three";
import NET from 'vanta/dist/vanta.net.min'
import { onMounted, onBeforeUnmount } from "vue";
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from 'vue-router';
import { ElMessage } from "element-plus";
import { Login, Register } from "../utils/api";
export default {
    setup() {
        let vantaEffect = null
        onMounted(() => {
            vantaEffect = NET({
                THREE: THREE,
                el: "#background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                maxDistance: 17.00,
                spacing: 14.00
            })
        })
        onBeforeUnmount(() => {
            if (vantaEffect) vantaEffect.destroy()
        })
        const form = reactive({
            username: "",
            password: "",
        });
        const registerForm = reactive({
            rusername: "",
            rPassword: "",
            confirmPassword: "",
        });
        const router = useRouter();
        // 方法
        // 登录
        function login() {
            // console.log('form', form);
            Login(form)
                .then(res => {
                    if (res.errno !== 0) {
                        ElMessage.error('用户名或密码错误');
                        localStorage.setItem("token", null);
                        localStorage.setItem("isLoggedIn", 0);
                        return;
                    }
                    // console.log('发送数据成功:', res);
                    ElMessage.success('登录成功');
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("isLoggedIn", 1);
                    router.push("/home");
                })
                .catch(error => {
                    console.error('Login failed:', error);
                });
        }
        // 注册
        function register() {
            if (registerForm.confirmPassword !== registerForm.rPassword) {
                ElMessage.error("密码与确认密码不一致.");
                return;
            }
            const payload = {}
            payload.username = registerForm.rusername
            payload.password = registerForm.rPassword
            Register(payload)
                .then(res => {
                    if (res.errno !== 0) {
                        ElMessage.error('注册失败, 用户名已存在');
                        return;
                    }
                    ElMessage.success('注册成功');
                    router.push("/login");
                })
                .catch(error => {
                    console.error('Register failed:', error);
                });
            
        }
   
        return {
            ...toRefs(form),
            ...toRefs(registerForm),
            login,
            register,
        };
    },
};
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow-y: hidden;
    overflow-x: hidden;
    top: -1px;
    left: -1px;
}

.card {
    position: absolute;
    left: calc(50% - 300px);
    top: 20%;
    width: 600px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 25px;
}
.board{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
}
.title {
    position: relative;
    margin-top: 30px;
    text-align: center;
    font-size: 24px;

}

.layout {
    position: absolute;
    left: calc(50% - 200px);
    top: 25%;
    width: 400px;
}


.loginForm {
    text-align: center;
}

.inpWidth {
    width: 165px;
}
</style>
