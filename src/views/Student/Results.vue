<template>
    <div style="padding:5% 3%;">
        <el-container>
            <el-container>
                
            </el-container>
            <el-container>
                <img src="../../assets/student/achievement.png" style="height: 120px;width: 120px;">
            </el-container>
            <el-container>
                <el-descriptions size="default" border direction="vertical" style="margin-left: 10%">
                    <el-descriptions-item label="综合绩点" label-class-name="my-label" content-class-name="my-content">
                        {{ Point }}</el-descriptions-item>
                </el-descriptions>
            </el-container>
        </el-container>
        <!--表格-->
        <el-scrollbar>
            <el-table :data="pergrade" border stripe size="small" max-height="450px"
                style="width: 100%;height: 450px;text-align: center">
                <el-table-column prop="scyear" label="学年" width="120" sortable>
                </el-table-column>
                <el-table-column prop="semester" label="学期" width="120">
                </el-table-column>
                <el-table-column prop="course" label="课程">
                </el-table-column>
                <el-table-column prop="courna" label="课程性质" width="70">
                    <template #default="scope">
                        <el-tag v-if="scope.row.courna === '必修'" size="small">必修</el-tag>
                        <el-tag v-if="scope.row.courna === '选修'" type="warning" size="small">选修</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="courid" label="课程代码" width="120">
                </el-table-column>
                <el-table-column prop="credit" label="学分" sortable width="120">
                </el-table-column>
                <el-table-column prop="mark" label="分数" sortable width="120">
                </el-table-column>
                <el-table-column prop="gpa" label="绩点" sortable width="120">
                </el-table-column>
                <el-table-column prop="tea" label="任课老师" width="120">
                </el-table-column>
                <el-table-column prop="cregpa" label="学分绩点" sortable width="120">
                </el-table-column>
            </el-table>

        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { Search, Refresh, Edit } from '@element-plus/icons-vue'

let data = reactive({
    Point: 3.0,
    pergrade: undefined,
    gradeFind: {
        scyear: "全部",
        semester: 0,
        cour: "",
        courna: 0,
    },
    rules: {
        scyear: [],
        semester: [],
        cour: [],
        courna: [],
    },
    scyearOptions: [
        {
            "label": "全部",
            "value": "全部"
        }, {
            "label": "2021~2022学年",
            "value": "2021~2022学年"
        }, {
            "label": "2020~2021学年",
            "value": "2020~2021学年"
        }, {
            "label": "2019~2020学年",
            "value": "2019~2020学年"
        }, {
            "label": "2018~2019学年",
            "value": "2018~2019学年"
        }],
    semesterOptions: [
        {
            "label": "全部",
            "value": 0
        }, {
            "label": "第一学期",
            "value": 1
        }, {
            "label": "第二学期",
            "value": 2
        }],
    cournaOptions: [
        {
            "label": "全部",
            "value": 0
        }, {
            "label": "必修",
            "value": 1
        }, {
            "label": "选修",
            "value": 2
        }],

})
const { Point, pergrade, gradeFind, rules, scyearOptions, semesterOptions, cournaOptions } = toRefs(data)


async function getscorelist() {
}

function submitForm() {
}

function resetForm() {
}


</script>

<style >
.my-label {
    background-color: burlywood;
}

.my-content {
    background: #FDE2E2;
}
</style>

