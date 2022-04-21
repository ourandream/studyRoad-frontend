<template>
    <div>
        <div style="margin:3%  2%;">
            <el-button @click="showInput = true" type="primary">上传记录</el-button>
        </div>
        <el-row justify="space-around">
            <el-col :span="11">
                <el-card class="sclist">
                    <div slot="header" class="clearfix">
                        <span>待审核</span>
                    </div>
                    <el-table :data="technology.unreviewed" border stripe max-height="510px" size="small"
                        style="width: 100%;text-align: center;">
                        <el-table-column prop="scyear" label="学年" sortable width="120">
                        </el-table-column>
                        <el-table-column prop="type" label="加分类型" width="120">
                        </el-table-column>
                        <el-table-column prop="describe" label="科研竞赛成果简介">
                        </el-table-column>
                        <el-table-column prop="mark" label="加分数" width="70">
                        </el-table-column>

                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="11">
                <el-card class="sclist">
                    <div slot="header" class="clearfix">
                        <span>已审核</span>
                    </div>
                    <el-table :data="technology.reviewed" border stripe size="small" max-height="510px"
                        style="width: 100%;text-align: center;">
                        <el-table-column prop="scyear" label="学年" sortable width="120">
                        </el-table-column>
                        <el-table-column prop="type" label="加分类型" width="120">
                        </el-table-column>
                        <el-table-column prop="describe" label="科研竞赛成果简介">
                        </el-table-column>
                        <el-table-column prop="mark" label="加分数" width="70">
                        </el-table-column>

                        <el-table-column label="审核状态" width="80">
                            <template #default="scope">
                                <div>
                                    <el-tag v-if="scope.row.sign === 1" type="success" size="small">通过</el-tag>
                                </div>
                                <div>
                                    <el-tag v-if="scope.row.sign === 2" type="danger" size="small">未通过</el-tag>
                                </div>

                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>

        </el-row>
    </div>
    <el-dialog v-model="showInput" title="上传记录">
        <div class="Forma">
            <el-container>
                <el-container>
                    <el-form ref="competition" :model="competition" :rules="rules" size="small" label-width="100px">
                        <el-row :gutter="0">
                            <el-col :span="12">
                                <el-form-item label="学年" prop="scyear">
                                    <el-select v-model="competition.scyear" placeholder="请选获奖学年" clearable
                                        :style="{ width: '100%' }">
                                        <el-option v-for="(item, index) in scyearOptions" :key="index"
                                            :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label-width="110px" label="学期" prop="semester">
                                    <el-select v-model="competition.semester" placeholder="请选择获奖学期" clearable
                                        :style="{ width: '100%' }">
                                        <el-option v-for="(item, index) in semesterOptions" :key="index"
                                            :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="获奖时间" prop="time">
                                    <el-date-picker v-model="competition.time" format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd" :style="{ width: '100%' }" placeholder="请选择获奖时间"
                                        clearable></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="奖项级别" prop="level">
                                    <el-select v-model="competition.level" placeholder="请选择奖项级别" clearable
                                        :style="{ width: '100%' }">
                                        <el-option v-for="(item, index) in levelOptions" :key="index"
                                            :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="获奖等次" prop="order">
                                    <el-select v-model="competition.order" placeholder="请选择获奖等次" clearable
                                        :style="{ width: '100%' }">
                                        <el-option v-for="(item, index) in orderOptions" :key="index"
                                            :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="竞赛名称" prop="name">
                                    <el-input v-model="competition.name" placeholder="请输入竞赛名称" clearable
                                        :prefix-icon='Tickets' :style="{ width: '100%' }"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="竞赛描述" prop="describe">
                                    <el-input v-model="competition.describe" type="textarea" placeholder="请输入竞赛描述"
                                        :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="备注" prop="remarks">
                                    <el-input v-model="competition.remarks" type="textarea" placeholder="请输入备注"
                                        :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label-width="130px" label="证明材料上传" prop="prove" style="padding-top: 3%">
                                    <el-upload ref="prove" :file-list="provefileList" :action="proveAction"
                                        :before-upload="proveBeforeUpload" list-type="picture-card" accept="image/*">
                                        <el-icon>
                                            <plus />
                                        </el-icon>
                                    </el-upload>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item size="default" style="padding-top: 5%">
                                    <span style="padding-left: 20%">
                                        <el-button type="primary" @click="submitForm">上报申请</el-button>
                                    </span>
                                    <span style="padding-left: 10%">
                                        <el-button @click="resetForm">重置数据</el-button>
                                    </span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-container>
            </el-container>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { Plus, Tickets } from '@element-plus/icons-vue'
let technology = {
    unreviewed: [
        {
            id: 123,
            scyear: "2021~2022学年",
            semester: "第二学期",
            time: 2021 - 10 - 8,
            type: "科研立项",
            level: "国家级",
            order: "优秀结题",
            name: "学路系统",
            describe: "致力于学生工作的系统",
            remarks: "是项目负责人",
            mark: 15,
            prove: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            sc: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            sign: 0,
            reason: "tql",
        },
        {
            id: 123,
            scyear: "2020~2021学年",
            semester: "第一学期",
            time: 2020 - 12 - 18,
            type: "学术竞赛",
            level: "校级",
            order: "一等奖",
            name: "数学建模大赛",
            describe: "数学建模大赛牛逼",
            remarks: "我很强",
            mark: 10,
            prove: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            sign: 0,
            reason: "tql",
        },
        {
            id: 123,
            scyear: "2019~2020学年",
            semester: "第一学期",
            time: 2020 - 1 - 28,
            type: "论文专利",
            level: "实用性专利",
            order: "第二作者",
            name: "系统",
            describe: "系统牛逼",
            remarks: "我很强",
            mark: 20,
            prove: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            sign: 0,
            reason: "tql",
        },
        {
            id: 123,
            scyear: "2019~2020学年",
            semester: "第一学期",
            time: 2020 - 1 - 28,
            type: "论文专利",
            level: "实用性专利",
            order: "第二作者",
            name: "系统",
            describe: "系统牛逼",
            remarks: "我很强",
            mark: 20,
            prove: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            sign: 0,
            reason: "tql",
        },
        {
            id: 123,
            scyear: "2019~2020学年",
            semester: "第一学期",
            time: 2020 - 1 - 28,
            type: "论文专利",
            level: "实用性专利",
            order: "第二作者",
            name: "系统",
            describe: "系统牛逼",
            remarks: "我很强",
            mark: 20,
            prove: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            sign: 0,
            reason: "tql",
        },
        {
            id: 123,
            scyear: "2019~2020学年",
            semester: "第一学期",
            time: 2020 - 1 - 28,
            type: "论文专利",
            level: "实用性专利",
            order: "第二作者",
            name: "系统",
            describe: "系统牛逼",
            remarks: "我很强",
            mark: 20,
            prove: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            sign: 0,
            reason: "tql",
        },

    ],
    reviewed: [
        {
            id: 222,
            scyear: "2019~2020学年",
            semester: "第二学期",
            time: 2020 - 9 - 28,
            type: "其他成果",
            level: "",
            order: " ",
            name: " ",
            describe: "通过六级",
            remarks: "我很强",
            mark: 4,
            prove: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            sign: 1,
            reason: "tql",
        },
        {
            id: 123,
            scyear: "2019~2020学年",
            semester: "第一学期",
            time: 2020 - 1 - 28,
            type: "论文专利",
            level: "实用性专利",
            order: "第二作者",
            name: "系统",
            describe: "系统牛逼",
            remarks: "我很强",
            mark: 20,
            prove: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            sign: 2,
            reason: "tql",
        }
    ]
}

let data = reactive({
    competition: {
        scyear: "",
        semester: "",
        time: null,
        level: undefined,
        order: undefined,
        name: undefined,
        describe: undefined,
        remarks: undefined,
        mark: 0,
        prove: null,
    },
    rules: {
        scyear: [{
            required: true,
            message: '请选获奖学年',
            trigger: 'change'
        }],
        semester: [{
            required: true,
            message: '请选择获奖学期',
            trigger: 'change'
        }],
        time: [{
            required: true,
            message: '请选择获奖时间',
            trigger: 'change'
        }],
        level: [{
            required: true,
            message: '请选择奖项级别',
            trigger: 'change'
        }],
        order: [{
            required: true,
            message: '请选择获奖等次',
            trigger: 'change'
        }],
        name: [{
            required: true,
            message: '请输入竞赛名称',
            trigger: 'blur'
        }],
        describe: [{
            required: true,
            message: '请输入竞赛描述',
            trigger: 'blur'
        }],
        remarks: [],
        mark: [{
            required: true,
            message: '加分数不能为空',
            trigger: 'change'
        }],
    },
    proveAction: 'https://jsonplaceholder.typicode.com/posts/',
    provefileList: [],
    scyearOptions: [{
        "label": "2021年~2022年",
        "value": 20212022
    }, {
        "label": "2020年~2021年",
        "value": 20202021
    }, {
        "label": "2019年~2020年",
        "value": 20192020
    }, {
        "label": "2018年~2019年",
        "value": 20182019
    }],
    semesterOptions: [{
        "label": "第一学期",
        "value": 1
    }, {
        "label": "第二学期",
        "value": 2
    }],
    levelOptions: [{
        "label": "国际级",
        "value": 1
    }, {
        "label": "国家级",
        "value": 2
    }, {
        "label": "省级",
        "value": 3
    }, {
        "label": "校级",
        "value": 4
    }, {
        "label": "院级",
        "value": 5
    }],
    orderOptions: [{
        "label": "参赛加分",
        "value": 0
    }, {
        "label": "金奖",
        "value": 1
    }, {
        "label": "银奖",
        "value": 2
    }, {
        "label": "铜奖",
        "value": 3
    }, {
        "label": "特等奖",
        "value": 4
    }, {
        "label": "一等奖",
        "value": 5
    }, {
        "label": "二等奖",
        "value": 6
    }, {
        "label": "三等奖",
        "value": 7
    }, {
        "label": "优秀奖和单项奖",
        "value": 8
    }],
})
const { competition, rules, proveAction, provefileList, scyearOptions, orderOptions, levelOptions, semesterOptions } = toRefs(data)

let showInput = ref(false)
function submitForm() {
}
function resetForm() {
}
function proveBeforeUpload(file) {
    let isRightSize = file.size / 1024 / 1024 < 10
    if (!isRightSize) {
        this.$message.error('文件大小超过 10MB')
    }
    let isAccept = new RegExp('image/*').test(file.type)
    if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
    }
    return isRightSize && isAccept
}

</script>
<style>
.Forma {
    /*background-image: url("../../../assets/submitaction.png") ;*/
    /*backdrop-filter: inherit;*/
    background: url('../../assets/student/endeavor.png') no-repeat bottom right/ 20% auto;
    /*background-size: cover;*/
    /*background: #fff url("../../../assets/submitaction.png") no-repeat;*/
}

.clearfix{
    margin-bottom: 5%;
}
</style>

