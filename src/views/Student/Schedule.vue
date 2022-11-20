<template>
    <div class="selects">
        <ElSelect v-model="currentSchoolYear" @change="getSchedule">
            <ElOption v-for="i in schoolYears" :value="i" :label="i"></ElOption>
        </ElSelect>
        <ElSelect v-model="currentTerm" @change="getSchedule">
            <ElOption v-for="i in [1, 2]" :value="i" :label="`第${i}学期`" />
        </ElSelect>
        <ElSelect v-model="currentWeek" @change="getWeekSchedule">
            <ElOption v-for="i in weeksNum" :value="i" :label="`第${i + 1}周`" />
        </ElSelect>
    </div>
    <div style="padding:2% 0;">

        <ElTable :data="schedule[currentWeek] ? schedule[currentWeek].withoutTime : []" border
            style="margin-bottom:3vh">
            <ElTableColumn prop="name" label="课程名"></ElTableColumn>
            <ElTableColumn prop="teacher" label="教师名"></ElTableColumn>
            <ElTableColumn label="签到状态">
                <template #default="scope">
                    <div v-if="scope.row.signIn === 'yes'">
                        <ElTag type="success">是</ElTag>
                    </div>
                    <div v-else-if="scope.row.signIn === 'no'">
                        <ElTag type="danger">否</ElTag>
                    </div>
                    <div v-else>
                        <ElTag type="warning">未知</ElTag>
                    </div>
                </template>
            </ElTableColumn>

        </ElTable>
        <ElTable :data="scheduleInTable" border :span-method="scheduleSpanMethod" :cell-style="{ height: '130px' }"
            height="95vh">
            <ElTableColumn prop="section" />
            <ElTableColumn v-for="i in Array(7).keys()" :prop="i.toString()" :label="`周${chineseNum[i]}`">
                <template #default="scope: { row: { [index: string]: WithTime } }">
                    <div v-if="scope.row[i]"
                        :class="{ courseCell: true, 'courseCell--success': scope.row[i].signIn == 'yes', 
                        'courseCell--error': scope.row[i].signIn == 'no' ,
                        'courseCell--warning': scope.row[i].signIn == 'unknow' ,
                        }"
                        @click="()=>{courseTitle=scope.row[i].name;showCourseSignInInfo=true}" 
                        >
                        {{ scope.row[i] ? scope.row[i].name : undefined }}
                        <p>{{ scope.row[i] ? scope.row[i].teacher : undefined }}</p>
                        <p>{{ scope.row[i] ? scope.row[i].place : undefined }}</p>
                        <div v-if="scope.row[i].signIn==='yes'" class="courseCell__icon">
                            <ElIcon><Check></Check></ElIcon>
                        </div>
                        <div v-else-if="scope.row[i].signIn==='no'" class="courseCell__icon">
                            <ElIcon><Close></Close></ElIcon>
                        </div>

                        <div v-else-if="scope.row[i].signIn==='unknow'" class="courseCell__icon">
                            <ElIcon><Edit></Edit></ElIcon>
                        </div>
                    </div>

                </template>
            </ElTableColumn>>
        </ElTable>
    </div>
    <ElDialog v-model="showCourseSignInInfo" :title="`${courseTitle}考勤情况`" width="43vw">
        <div class="signInInfo">
            <div v-for="(value,index) in courseSignInInfo" :class="`signInInfo--${value} signInInfo__item`">{{index}}</div>
        </div>
    </ElDialog>
</template>

<script lang="ts" setup>
import axios from '@/axios';
import { SchedulePerWeek, WithTime } from '@/types';
import { useUserInfo } from '@/stores/store'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import {Check,Close,Edit} from '@element-plus/icons-vue'


const { schoolYear } = useUserInfo()
let schoolYears: string[] = []
for (let i = 0; i < 4; ++i) {
    schoolYears.push(`${schoolYear + i}-${schoolYear + i + 1}`)
}

let schedule = ref<SchedulePerWeek[]>([])
let weeksNum = computed(() => {
    if (schedule.value.length == 0) {
        return [0]
    }
    else {
        return [...Array(schedule.value.length).keys()]
    }
})

function getSchedule() {
    axios.get('/performance/schedule', {
        params: {
            year: currentSchoolYear.value,
            term: currentTerm.value
        }
    }).then(responese => {
        currentWeek.value = 0
        schedule.value = responese.data
    })
}
watch(schedule, () => {
    for (let i = 0; i < 11; ++i) {
        scheduleInTable.value[i] = { section: i + 1 }
    }
    for (let i of schedule.value[0].withTime) {
        scheduleInTable.value[Number(i.sections[0]) - 1][i.timeInWeek.toString()] = i
    }
})


let currentSchoolYear = ref(schoolYears[0])
let currentTerm = ref(1)
let currentWeek = ref(0)

let scheduleInTable = ref<{ section: number, [index: string]: WithTime | number }[]>([])
for (let i = 0; i < 11; ++i) {
    scheduleInTable.value.push({ section: i + 1 })
}
let chineseNum = ['一', '二', '三', '四', '五', '六', '日']
type spanMethod = (data: {
    row: { [index: string]: WithTime };
    rowIndex: number;
    column: TableColumnCtx<WithTime>;
    columnIndex: number;
}) => number[] | {
    rowspan: number;
    colspan: number;
}
let spanTable = computed(() => {
    let matchTable: { rowspan: number, colspan: number }[][] = []
    for (let i = 0; i < 12; ++i) {
        matchTable.push([])
        for (let j = 0; j < 7; ++j) {
            matchTable[i].push({ rowspan: 1, colspan: 1 })
        }
    }

    if (schedule.value.length != 0) {
        for (let i of schedule.value[currentWeek.value].withTime) {
            let start = Number(i.sections.split('-')[0]) - 1
            let end = Number(i.sections.split('-')[1]) - 1
            matchTable[start][i.timeInWeek] = { colspan: 1, rowspan: end - start + 1 }
            for (let j = start + 1; j <= end; ++j) {
                matchTable[j][i.timeInWeek] = { colspan: 1, rowspan: 0 }
            }
        }
    }

    return matchTable
})
const scheduleSpanMethod: spanMethod = (data) => {
    return spanTable.value[data.rowIndex][data.columnIndex - 1]
}

let randomColor = [{ backgroundColor: 'rgb(229, 244, 255)', color: 'rgb(0, 166, 242)' },
{ backgroundColor: 'rgb(222, 251, 248)', color: 'rgb(60, 179, 200)' }, {
    color: 'rgb(125, 122, 234)',
    backgroundColor: 'rgb(237, 237, 255)'
},
{ color: 'rgb(91, 142, 255)', backgroundColor: 'rgb(234, 241, 255)' },
{ color: 'rgb(239, 91, 117)', backgroundColor: 'rgb(255, 239, 240)' }
]

getSchedule()
function getWeekSchedule() {
    for (let i = 0; i < 11; ++i) {
        scheduleInTable.value[i] = { section: i + 1 }
    }
    for (let i of schedule.value[currentWeek.value].withTime) {
        scheduleInTable.value[Number(i.sections[0]) - 1][i.timeInWeek.toString()] = i
    }
}

let courseTitle=ref('')
let showCourseSignInInfo=ref(false)
let courseSignInInfo=ref<'yes'|'no'|'unknow'|'undefined'[]>([])
watch(courseTitle,async ()=>{
    let res=await axios.get('/performance/signInInfo',{
        params:{
            courseTitle
        }
    })
    courseSignInInfo.value=res.data
})
</script>

<style lang="scss">
.selects {
    display: flex;
    justify-content: space-around;
    margin-top: 3vh;
}

.cell {
    height: 100%;
}

.courseCell {
    height: 100%;
    border-radius: 10px;
    padding: 3vh 0;
    padding-left: 1vw;
    cursor: pointer;

    &--success {
        background-color: #e1f3d8;
        color: #95d475;
    }

    &--error {
        background-color: #fde2e2;
        color: #f89898;
    }

    &--warning {
        background-color: #faecd8;
        color: #b88230
    }

    &__icon{
        position: absolute;
        bottom: 5vh;
        font-size: 40px;
    }
}

.signInInfo{
    display: flex;
    flex-wrap: wrap;
    gap: 1vw;
    &__item{
        width: 7vw;
        font-size: 20px;
        text-align: center;
        padding: 3vw 0;
        margin-bottom: 2vh;
    }
    &--yes {
        background-color: #e1f3d8;
        color: #95d475;
    }

    &--no {
        background-color: #fde2e2;
        color: #f89898;
    }

    &--unknow {
        background-color: #faecd8;
        color: #b88230
    }

    &--undefined{
        background-color:  #e9e9eb;
        color:  #b1b3b8;
    }
}
</style>
