<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {  BarChart ,FunnelChart} from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    ToolboxComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";
import axios from "@/axios";
import { AllCourseContention, SignInSummary } from "@/types";

use([
    CanvasRenderer,
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    FunnelChart,
    ToolboxComponent
]);

const option = ref({
    title: {
        text: '课程考勤情况'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
    },
    series: [
        {
            name: '2011',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230],
            itemStyle: {
                color: ''
            }
        },
        {
            name: '2012',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
    ]
});

let year = ref('2020-2021')
let term = ref(1)
let height = ref('500px')

function getData() {
    axios.get('/student/attendance/allcourses', { params: { year, term } }).then(res => {
        let data: AllCourseContention = res.data
        option.value.yAxis.data = data.courseNames
        height.value = `${data.signIn.length * 150}px`
        option.value.series = [
            { name: '已签到', type: 'bar', data: data.signIn, itemStyle: { color: ' #95d475' } },
            { name: '未签到', type: 'bar', data: data.notSignIn, itemStyle: { color: ' #f89898' } },
            { name: '未上课', type: 'bar', data: data.unknow, itemStyle: { color: '#eebe77' } },
        ]
    })
    axios.get('/student/attendance/all',{params:{year,term}}).then(res=>{
        let data:SignInSummary=res.data
        summaryOption.value.series[0].data[0].value=data.signIn
        summaryOption.value.series[0].data[1].value=data.notSignIn
        summaryOption.value.series[0].data[2].value=data.unknow
    })
}
getData()

let summaryOption = ref({
  title: {
    text: '总体考勤情况'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  legend: {
    data: ['已签到','未签到','未上课']
  },

  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      
      data: [
        { value: 60, name: '已签到',itemStyle:{color:'#95d475'} },
        { value: 40, name: '未签到' ,itemStyle:{color:'#f89898'}},
        { value: 20, name: '未上课' ,itemStyle:{color:'#eebe77'}},
      ]
    }
  ]
});
</script>

<template>
    <YearTermWeekSelects v-model:year="year" v-model:term="term" @change="getData" />
    <v-chart style="height:300px" :option="summaryOption"/>
    <v-chart :style="{ height }" :option="option" autoresize />
</template>

<style scoped>

</style>