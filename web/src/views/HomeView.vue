<template>
    <div class="header">
        S2Vulhub漏洞复现平台
    </div>
    <div class="databoard">
        <div class="leftboard">
            <div class="searchbox">
                <div class="name">CVE编号:</div>
                <div class="nameinput">
                    <Search @on-click="handleSearch"></Search>
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

        </div>
    </div>
</template>

<script setup>
import Search from "../components/search.vue";
import { ElMessage } from "element-plus";
import { ref } from "vue";
const cvemsg = ref({});
const poc = ref('')
const guide = ref('')
function handleSearch(e) {
    console.log('传递成功', e)
    // fetch(`/user_cve/${e}.json`)
    fetch('/user_cve/CVE-2019-19391.json')
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
    height: calc(95vh - 50px);
}

.leftboard {
    flex: 2;
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
    background-color: yellow;
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