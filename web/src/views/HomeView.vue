<template>
    <div class="header">
        S2Vulhub漏洞复现平台
    </div>
    <div class="databoard">
        <div class="leftboard">
            <div class="searchbox">
                <div class="name">CVE编号:</div>
                <div class="nameinput"><Search @on-click="handleSearch"></Search></div>
               
            </div>

            <div class="datamsg">

            </div>

        </div>
        <div class="rightboard">

        </div>
    </div>
</template>

<script setup>
import Search from "../components/search.vue";

function handleSearch(e) {
    console.log('传递成功', e)
   
}
</script>

<style scoped>
    .header{
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
    .databoard{
        position: absolute;
        top:50px;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: calc(95vh - 50px);
    }
    .leftboard{
        width: 20%;
        height: 100%;
        background-color: #f0f0f0;
    }
    .searchbox{
        margin-left: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .name{
        font-size: 16px;
        flex:3;
    }
    .nameinput{
        flex: 7;
        width: 100%;
    }
    .rightboard{
        width: 80%;
        height: 100%;
        background-color: yellow;
    }
</style>