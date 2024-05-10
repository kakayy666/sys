<template>
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

                    <el-button  type="primary" class="loginBtn" @click="login">
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
                        <el-input type="password" v-model="confirmPassword" @blur="confirmFunc" />
                    </el-form-item>

                    <el-button  type="primary" class="loginBtn" @click="register">
                        注册
                    </el-button>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from 'vue-router';
import { ElMessage } from "element-plus";
export default {
    setup() {
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
            console.log(form);
            localStorage.setItem("isLoggedIn", "true")
            router.push("/");
        }
        // 注册
        function register() {
            console.log("注册", registerForm);
        }
        // 获取验证码
        function getIdentifyCode() {
            console.log("获取验证码");
        }
        // 确认密码
        // function confirmFunc() {
        //   if (registerForm.confirmPassword !== registerForm.rPassword)
        //     alert("密码与确认密码不一致");
        // }
        const confirmFunc = () => {
            if (registerForm.confirmPassword !== registerForm.rPassword)
                ElMessage.error("密码与确认密码不一致.");
        };
        return {
            ...toRefs(form),
            ...toRefs(registerForm),
            login,
            register,
            getIdentifyCode,
            confirmFunc,
        };
    },
};
</script>

<style scoped>
.layout {
    position: absolute;
    left: calc(50% - 200px);
    top: 20%;
    width: 400px;
}

.loginBtn {
    width: 100px;
}

.loginForm {
    text-align: center;
}

.checkBox {
    margin-left: 7px;
}

.inpWidth {
    width: 165px;
}
</style>
