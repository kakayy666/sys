<template>
    <div class="title">提交生成CVE_DockerFile</div>
    <div class="mainbody">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>

            <el-form-item label="schema_version" prop="schema_version">
                <el-input v-model="ruleForm.schema_version" />
            </el-form-item>

            <el-form-item label="CVEid" prop="id">
                <el-input v-model="ruleForm.id" />
            </el-form-item>

            <el-form-item label="category" prop="category">
                <el-input v-model="ruleForm.category" />
            </el-form-item>

            <el-form-item label="version" prop="version">
                <el-input v-model="ruleForm.version" />
            </el-form-item>

            <el-form-item label="poc" prop="poc">
                <el-input v-model="ruleForm.poc" type="textarea" />
            </el-form-item>

            <el-form-item label="guide" prop="guide">
                <el-input v-model="ruleForm.guide" type="textarea" />
            </el-form-item>

            <div class="btn">
            <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { SendForm } from '../utils/api';
const formSize = ref('default');
const ruleFormRef = ref(null);
const ruleForm = reactive({
    schema_version: '',
    id: '',
    category: '',
    version: '',
    poc: '',
    guide: '',
});

const rules = reactive({
    id: [
        { required: true, message: 'Please input CVE id', trigger: 'change' },
    ],
    category: [
        {
            required: true,
            message: 'Please input category',
            trigger: 'change',
        },
    ],
    schema_version: [
        {
            required: true,
            message: 'Please input Schema_Version',
            trigger: 'change',
        },
    ],
   poc: [
        {
            required: true,
            message: 'Please input poc',
            trigger: 'change',
        },
    ],
    guide: [
        {
            required: true,
            message: 'Please input guide',
            trigger: 'change',
        },
    ],
   
});

const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            console.log('submit!');
            console.log(ruleForm);
            const status = await SendForm(ruleForm);
            console.log('s', status)
            if (status.data === 'success') {
                ElMessage.success('提交成功');
            } else {
                ElMessage.error('提交失败');
            }
        } else {
            console.log('error submit!', fields);
        }
    });
};


const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
};

</script>
<style scoped>
.title {
    position: relative;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    margin-top: 20px;
}
.mainbody {
    margin: 20px auto;
    padding: 20px;
    max-width: 600px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-heading {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.rule-form .el-form-item {
    margin-bottom: 20px;
}

.rule-form .el-input,
.rule-form .el-textarea {
    width: 100%;
}

.rule-form .el-button {
    margin-right: 10px;
}
.btn{
    text-align: center;
    margin-top: 20px;
}
</style>