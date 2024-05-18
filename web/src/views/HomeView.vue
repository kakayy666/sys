<template>
    <div class="header">
        S2Vulhub漏洞复现平台
    </div>
    <div class="databoard">
        <div class="leftboard">
            <div class="searchbox">
                <div class="name">CVE编号:</div>
                <div class="nameinput">
                    <Search @on-click="handleSearch" :cveid="CVE.value"></Search>
                </div>
            </div>

            <div class="datamsg">
                <el-card class="custom-card">
                    <div slot="header">
                        漏洞信息
                    </div>
                    <div class="card-content">
                        <el-row>
                            <el-col>CVE编号:</el-col>
                            <el-col>{{ cvemsg.id }}</el-col>
                        </el-row>
                        <el-row>
                            <el-col>漏洞类别:</el-col>
                            <el-col>{{ cvemsg.category }}</el-col>
                        </el-row>
                        <el-row>
                            <el-col>漏洞版本:</el-col>
                            <el-col>{{ cvemsg.version }}</el-col>
                        </el-row>
                        <el-row>
                            <el-col>漏洞证明:</el-col>
                            <el-col><a :href="poc" target="_blank">{{ poc }}</a></el-col>
                        </el-row>
                        <el-row>
                            <el-col>漏洞复现:</el-col>
                            <el-col>{{ guide }}</el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>

        </div>
        <div class="rightboard">
            <div class="server" v-show="openssh">
                <Terminal :CVE="CVE"></Terminal>
            </div>
            <!-- <el-button class="btn1" type="success" @click="sshserver">连接服务</el-button>
            <br />
            <el-button class="btn2" type="danger" @click="exitbtn">退出登录</el-button> -->
        </div>
    </div>
</template>
<!-- lhkp-ksq74e0e -->
<script setup>
import Search from "../components/search.vue";
// import SSHlinux from "../components/sshlinux.vue"
import Terminal from "../components/terminal.vue"
import { ElMessage } from "element-plus";
import { ElButton } from 'element-plus';
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
// localStorage.setItem("isLoggedIn", 0);
const router = useRouter();
const cvemsg = ref({});
const poc = ref('')
const guide = ref('')
const CVE = ref('')
const openssh = ref(true)
function handleSearch(e) {
    console.log('传递成功', e)
    CVE.value = e
    // fetch('/user_cve/CVE-2019-19391.json')
    fetch(`/S2VulnHub/user_cve/${e}.json`)
        .then(res => {
            if (!res.ok) {
                ElMessage.error('未查询到该编号的漏洞信息');
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            ElMessage.success('查询成功');
            console.log(data);
            cvemsg.value = data;
            poc.value = cvemsg.value.trigger.poc;
            guide.value = atob(cvemsg.value.trigger.guide);
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}

const exitbtn = () => {
    router.push('/login');
    localStorage.setItem("isLoggedIn", 0);
}
onMounted(() => {
    CVE.value = router.currentRoute.value.query.CVE
   console.log(router.currentRoute.value.query.CVE)
   handleSearch(CVE.value)
})
</script>

<style scoped>
.header {
    position: absolute;
    left: 0;
    width: 100vw;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    margin-top: -10px;
    background-color: #409EFF;
    color: #fff;
}

.databoard {
    position: absolute;
    top: 50px;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: calc(100vh - 50px);
}

.leftboard {
    flex: 3;
    height: 100%;
    background-color: #f0f0f0;
}

.searchbox {
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.datamsg {
    margin-top: 20px;
    width: 90%;
    margin-left:5%;
    /* height: 100%; */
    /* background-color: red; */
}

.name {
    font-size: 16px;
    flex: 2;
}

.nameinput {
    flex: 8;
    width: 100%;
}

.rightboard {
    flex: 8;
    height: 100%;
    /* background-color: yellow; */
}

.btn1{
    margin-top: 10px;
    margin-left: 10px;
    width: auto;
    height: 40px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transition: .3s;
}
.btn2 {
    margin-top: 10px;
    margin-left: 10px;
    right:0;
    width: auto;
    height: 40px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transition: .3s;
}

.server{
    position: absolute;
    width: calc(70%);
    height: calc(100% - 50px);
    /* background-color:  #f0f0f0; */
    /* border: 1px solid #ccc; */
    border-radius: 5px;

}


.custom-card {
    width: 90%;
    margin: auto;
}

.card-content {
    padding: 20px;
}

.el-row {
    margin-bottom: 10px;
}

.el-col {
    width: 200px;
    word-wrap: break-word;
    border-bottom: 1px solid #eee;
    padding: 2px 0;
}
</style>