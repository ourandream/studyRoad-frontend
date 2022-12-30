<template>
    <ElRow justify="center">
        <div class="graphItem">
            <VChart :option="gpaOption"></VChart>
        </div>
    </ElRow>
    <ElRow justify="center">
        <div class="graphItem--large">
            <VChart :option="perCourseOption"></VChart>
        </div>
    </ElRow>
    <ElRow justify="center">
        <h3 style="position: absolute; left:0">学分情况</h3>
        <VueTree :dataset="treeData" :config="treeConfig" style="width: 80vw;height:50vh;margin-bottom: 5vh;">
            <template v-slot:node="{ node, collapsed }">
                {{ node.name }}
            </template>
        </VueTree>
    </ElRow>
</template>

<script lang="ts" setup>
import { EChartsOption } from 'echarts'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, PieChart } from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    ToolboxComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";
import axios from "@/axios";
import VueTree from "@ssthouse/vue3-tree-chart";
import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";
import { AllSituation, CourseGPA, Situation } from '@/types';

use([
    CanvasRenderer,
    LineChart,
    PieChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent
]);

let xAxis: string[] = []
for (let i of ['一', '二', '三', '四']) {
    for (let j of ['上', '下']) {
        xAxis.push(`大${i}${j}`)
    }
}

let gpaOption = ref<EChartsOption>({
    title: {
        text: '绩点'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.data.toFixed(2)
        },
        show: true
    },
    xAxis: {
        type: 'category',
        data: xAxis
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [],
            type: 'line'
        }
    ]
})

let situationData = ref<AllSituation>()
interface TreeData {
    [index: string]: any,
    children?: TreeData[]
}
let treeData = ref<TreeData>({})
let treeConfig = { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }



axios.get('/student/performance/state/allgpa').then(res => {
    gpaOption.value.series[0].data = res.data
})

let chineseMap = {
    common: '通识教育',
    major: '大类教育',
    professional: '专业教育',
    practical: '实践教育'
} as { [index: string]: string }
axios.get('/student/performance/state/situation').then(res => {
    situationData.value = res.data
    treeData.value = { 'name': '主修', 'children': [] }
    for (let firstEdge of Object.keys(situationData.value.main)) {
        console.log(firstEdge)
        let situationItem = situationData.value.main[firstEdge] as Situation
        treeData.value.children.push({
            name: chineseMap[firstEdge],
            children: [{
                name: `必修(${situationItem.compulsory.current}/${situationItem.compulsory.require})`

            },
            {
                name: `选修(${situationItem.elective.current}/${situationItem.elective.require})`
            }
            ]
        })
    }
})

let perCourseData:CourseGPA[]=[]
let perCourseOption = ref<EChartsOption>({
    title: {
        text: '各课程绩点占比'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            let datum =  perCourseData.find(d => d.name == params.name)
            return datum.gpa.toFixed(2)
        },
        show: true
    },
    series: [
        {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
            ]
        }
    ]
})
axios.get('/student/performance/state/perCourse').then(res => {
    perCourseData=res.data
    let perCourse: CourseGPA
    for (perCourse of perCourseData) {
        perCourseOption.value.series[0].data.push({
            name: perCourse.name,
            value: perCourse.gpa
        })
    }
})
</script>

<style>
.graphItem {
    height: 50vh;
    width: 80vw;
}

.graphItem--large {
    height: 60vw;
    width: 80vw;
}
</style>