<template>
  <div class="home">
    <FSvgIcon name="logo" />
    <FSvgIcon name="arrow-left" size="100" />
    <FButton type="primary" loading>Button</FButton>
    <div class="p-4 pt-2">
      <div class="chart" ref="chartRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const chartRef = ref<HTMLDivElement>()
const { setOptions } = useECharts(chartRef)

const initChart = () => {
  setOptions({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '1%',
      left: 'center',
    },
    series: [
      {
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        name: '访问来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '搜索引擎' },
          { value: 735, name: '直接访问' },
          { value: 580, name: '邮件营销' },
          { value: 484, name: '联盟广告' },
        ],
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 100
        },
      },
    ],
  })
}
initChart()
</script>

<style>
.chart {
  width: 300px;
  height: 320px;
}
</style>
