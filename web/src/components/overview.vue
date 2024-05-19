<template>
    <div class="title">CVE漏洞统计</div>
    <hr>
    <div class="container">
        <div class="category">
            <div class="header">漏洞相关软件</div>
            <div id="kindSel"></div>
        </div>
        <div class="category">
            <div class="header">漏洞记录时间</div>
            <div id="yearSel"></div>
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref,reactive, onBeforeMount, onBeforeUnmount,onMounted} from 'vue';
import { GetShow, GetYear } from "../utils/api";
const kindlist = ref()
const yearlist = ref()
let kindChart
let yearChart
//饼图配置
let optionPie = reactive({
    tooltip: {
        trigger: 'item'
    },
    legend: {
        right: '-1',
        orient: 'vertical',
        //设置itemweight后，图形和字体间距会起飞，导致字体离开视野不可见，不知原因 --zjh
        // itemWidth:'50',
        itemHeight: '10',
        textStyle: {
            fontWeight: 'bold',
            fontSize: '16',
            lineHeight: '16'
        }
    },
    series: [
        {
            type: 'pie',
            center: ['40%', '50%'],
            radius: ['70%', '95%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 24,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [],
        },
    ]
})
//加载饼状图
function initPie() {
    // console.log('开始加载饼状图')
    const seriesData = [];
    // console.log('seriesData0', seriesData)
    for (let key in kindlist.value) {
        seriesData.push({ value: kindlist.value[key], name: key });
    }
    optionPie.series[0].data = (seriesData);
    kindChart = echarts.init(document.getElementById('kindSel'));
    kindChart.setOption(optionPie);
}
function initYear() {
    // console.log('开始加载饼状图')
    const seriesData = [];
    // console.log('seriesData0', seriesData)
    for (let key in yearlist.value) {
        seriesData.push({ value: yearlist.value[key], name: key });
    }
    optionPie.series[0].data = (seriesData);
    yearChart = echarts.init(document.getElementById('yearSel'));
    yearChart.setOption(optionPie);
}

onBeforeUnmount(() => {
    // 移除窗口大小变化的监听器
    window.removeEventListener('resize', resizeHandler);
    // 销毁ECharts实例
    kindChart.dispose();
    yearChart.dispose();
});

// 窗口大小变化事件处理函数
function resizeHandler() {
    kindChart.resize();
    yearChart.resize();
}

onMounted(() => {
    GetShow().then((res) => {
        kindlist.value = res.data;
    }).then(() => {
        initPie();
    });

    GetYear().then((res) => {
        yearlist.value = res.data;
        // console.log('yyyy',yearlist.value)
    }).then(() => {
        initYear();
    });
    // 添加窗口大小变化的监听器
    window.addEventListener('resize', resizeHandler);
});

</script>

<style scoped>
.title {
    position: relative;
    font-size: 24px;
    font-weight: bold;
    width: 200px;
    height: 30px;
    margin: 10px auto;
    text-align: center;
    color: #333;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    /* background-color: yellow; */
    height: 500px;
    gap:20px;
}
/* 内部容器样式 */
.category {
    position: relative;
    flex:1;
    display: flex;
    flex-direction: column;
    height: 500px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
}
.header {
    position: relative;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}
/* 图表容器样式 */
#kindSel {
    width: 100%;
    height: 80%;
}

#yearSel {
    width: 100%;
    height: 80%;
}
</style>
