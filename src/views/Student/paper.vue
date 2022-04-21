<template>
    <div class="Forma">
        <el-container>
            <el-container>
                <el-form ref="paper" :model="paper" :rules="rules" size="small" label-width="100px">
                    <el-row :gutter="0">
                        <el-col :span="8">
                            <el-form-item label="学年" prop="scyear">
                                <el-select v-model="paper.scyear" placeholder="论文专利发表学年" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in scyearOptions" :key="index" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="学期" prop="semester">
                                <el-select v-model="paper.semester" placeholder="论文专利发表学期" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in semesterOptions" :key="index" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="时间" prop="time">
                                <el-date-picker v-model="paper.time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                    :style="{ width: '100%' }" placeholder="论文专利发表时间" clearable></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="级别" prop="level">
                                <el-select v-model="paper.level" placeholder="论文专利级别" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in levelOptions" :key="index" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="作者次别" prop="order">
                                <el-select v-model="paper.order" placeholder="请选择作者次别" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in orderOptions" :key="index" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="paper.name" placeholder="论文专利名称" clearable :prefix-icon='Tickets'
                                    :style="{ width: '100%' }"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="描述" prop="describe">
                                <el-input v-model="paper.describe" type="textarea" placeholder="请输入论文专利相关描述"
                                    :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注" prop="remarks">
                                <el-input v-model="paper.remarks" type="textarea" placeholder="请输入论文专利相关备注"
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
</template>

<script lang="ts" setup>
import { Plus, Tickets } from '@element-plus/icons-vue'
let data = reactive({
    paper: {
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
            message: '论文专利发表学年',
            trigger: 'change'
        }],
        semester: [{
            required: true,
            message: '论文专利发表学期',
            trigger: 'change'
        }],
        time: [{
            required: true,
            message: '论文专利发表时间',
            trigger: 'change'
        }],
        level: [{
            required: true,
            message: '论文专利级别',
            trigger: 'change'
        }],
        order: [{
            required: true,
            message: '请选择作者次别',
            trigger: 'change'
        }],
        name: [{
            required: true,
            message: '论文专利名称',
            trigger: 'blur'
        }],
        describe: [{
            required: true,
            message: '请输入论文专利相关描述',
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
        "label": "SCI",
        "value": 1
    }, {
        "label": "EI",
        "value": 2
    }, {
        "label": "核心刊物会议",
        "value": 3
    }, {
        "label": "其他刊物会议",
        "value": 4
    }, {
        "label": "国家软件著作权",
        "value": 5
    }, {
        "label": "发明专利",
        "value": 6
    }, {
        "label": "实用新型专利",
        "value": 7
    }, {
        "label": "外观设计专利",
        "value": 8
    }, {
        "label": "其他文章",
        "value": 9
    }],
    orderOptions: [{
        "label": "第一作者",
        "value": 1
    }, {
        "label": "第二作者",
        "value": 2
    }, {
        "label": "第三作者",
        "value": 3
    }, {
        "label": "第四作者",
        "value": 4
    }, {
        "label": "第五作者",
        "value": 5
    }, {
        "label": "第六作者",
        "value": 6
    }],
})

const { paper, rules, proveAction, provefileList, scyearOptions, levelOptions, semesterOptions, orderOptions } = toRefs(data)
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