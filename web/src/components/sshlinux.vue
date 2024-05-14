<template>
    <div class="container">
        <iframe class="iframe-style" :src="externalUrl" frameborder="0"></iframe>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const externalUrl = ref('http://47.100.180.85:5032/');
        return {
            externalUrl
        };
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
    /* 设置容器高度为视口的 100% */
    padding: 20px;
    box-sizing: border-box;
}

.iframe-style {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>