<template>
        <div class="manages">
            <el-table :data="user" style="width: 100% ; " >
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="username" label="Username"></el-table-column>
                <el-table-column prop="password" label="Password"></el-table-column>
                <el-table-column label="Level">
                    <template #default="{ row }">
                        <template v-if="row.level === 'admin'">
                            {{ row.level }}
                        </template>
                        <template v-else>
                            <el-select v-model="row.level" :disabled="row.level === 'admin'" class="custom-select">
                                <el-option label="User" value="user"></el-option>
                                <el-option label="Developer" value="developer"></el-option>
                            </el-select>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="dip"><hr></div>
        <div class="btn">
            <el-button type="primary" @click="handleSubmit">确认设置</el-button>
        </div>
</template>

<script setup>
import { ref,onBeforeMount ,onMounted } from 'vue';
import { GetUserInfo, ChangeUser } from "../utils/api";
import { ElMessage } from "element-plus";
const user = ref([]);
const handleSubmit = () => {
    // console.log('Submitting user data:', user.value);
    ChangeUser(user.value).then(response => {
        // console.log('Data submitted successfully:', response);
        if (response.data === 'success') {
            ElMessage.success('用户权限设置成功');
        } else {
            ElMessage.error('用户权限设置失败');
        }
    }).catch(error => {
        console.error('Error submitting data:', error);
    });
};
onBeforeMount(() => {
    // console.log('mounted')
    GetUserInfo().then(res => {
        user.value = res.data
    }).catch(error => {
        console.error('Error fetching user data:', error);
    });
})
</script>

<style scoped>
.manages {
    position:absolute;
    width: 100%;
    height: 80%;
    overflow: auto;
}
.btn{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;

}
.dip{
    position: absolute;
    bottom: 60px;
    width: 100%;

}
.el-table {
    width: 100%;
}

.el-table th {
    background-color: #f5f7fa;
    color: #333;
    font-weight: bold;
    text-align: center;
}

.el-table tr:nth-child(even) {
    background-color: #f0f0f0;
}

.el-table tr:nth-child(odd) {
    background-color: #fff;
}
.el-table-column{
position: fixed;
}
/* 自定义单元格样式 */
.el-table td {
    padding: 10px;
    text-align: center;
}
 .el-select {
    width: 120px;
}
</style>
