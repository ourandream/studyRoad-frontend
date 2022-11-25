<template>
    <ElRow>
        <ElCol :span="18">
            <YearTermWeekSelects v-model:year="year" v-model:term="term" @change="getData" />
        </ElCol>
        <div>
            <ElContainer>
                <img src="../../assets/student/achievement.png" style="height: 120px;width: 120px;">
                <el-descriptions size="default" border direction="vertical" style="margin-left: 10%">
                    <el-descriptions-item label="综合绩点" label-class-name="my-label" content-class-name="my-content">
                        {{ termGPA }}</el-descriptions-item>
                </el-descriptions>
            </ElContainer>
        </div>
    </ElRow>
    <!--表格-->
    <el-scrollbar>
        <ElTable :data="data" border>
            <ElTableColumn v-for="i in Object.keys(propToChinese)" :prop="i" :label="propToChinese[i]"
                :sortable="['GPA', 'credit'].indexOf(i) != -1" />

            <ElTableColumn prop="result" label="成绩">
                <template #default="scope">
                    <ElLink type="primary" @click="showCourseResult(scope.row.id)">{{ scope.row.result }}</ElLink>
                </template>
            </ElTableColumn>
        </ElTable>
    </el-scrollbar>

    <ElDialog v-model="showCourseResultDialog" title="具体成绩">
        <ElDescriptions border direction="vertical">
            <ElDescriptionsItem :label="`平时(${courseResult.usual.rate.toFixed(2)}%)`">{{ courseResult.usual.score }}
            </ElDescriptionsItem>
            <ElDescriptionsItem :label="`平时(${courseResult.final.rate.toFixed(2)}%)`">{{ courseResult.final.score }}
            </ElDescriptionsItem>
            <ElDescriptionsItem label="总分">{{ courseTotalResult }}</ElDescriptionsItem>
        </ElDescriptions>
    </ElDialog>
</template>

<script lang="ts" setup>
import axios from '@/axios';
import { useUserInfo } from '@/stores/store';
import { CourseResult, TermResults } from '@/types';

let userInfo = useUserInfo()
let year = ref(userInfo.firstSchoolYear)
let term = ref(1)
let propToChinese = {
    name: '课程名',
    type: '课程性质',
    teacher: '老师',
    credit: '学分',
    GPA: '绩点',
}
let data = ref<TermResults[]>([])
async function getData() {
    let res = await axios.get('/student/results/termResults', {
        params: { year, term }
    })
    data.value = res.data
}
getData()

let termGPA = computed(() => {
    if (data.value.length == 0) {
        return 0
    }
    else {
        let totalCredits = 0
        let totalGPA = 0
        for (let i of data.value) {
            totalCredits += i.credit
            totalGPA += i.credit * i.GPA
        }
        return (totalGPA / totalCredits).toFixed(2)
    }
})

let showCourseResultDialog = ref(false)
let courseResult = ref<CourseResult>({
    usual: { score: 0, rate: 30 },
    final: { score: 0, rate: 70 }
})
let courseTotalResult = computed(() => {
    let usual = courseResult.value.usual
    let final = courseResult.value.final
    return (usual.score * usual.rate / 100 + final.score * final.rate / 100).toFixed(2)
})
async function showCourseResult(id: string) {
    let res = await axios.get('/student/results/courseResult', { params: { id } })
    courseResult.value = res.data
    showCourseResultDialog.value = true
} 
</script>
