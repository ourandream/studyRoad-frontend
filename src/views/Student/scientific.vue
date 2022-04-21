<template>
    <div class="Forma">
        <el-container>
            <el-container>
                <el-form ref="science" :model="science" :rules="rules" size="small" label-width="100px">
                    <el-row :gutter="0">
                        <el-col :span="8">
                            <el-form-item label="学年" prop="scyear">
                                <el-select v-model="science.scyear" placeholder="科研立项学年" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in scyearOptions" :key="index" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="学期" prop="semester">
                                <el-select v-model="science.semester" placeholder="科研立项学期" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in semesterOptions" :key="index" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="立项时间" prop="time">
                                <el-date-picker v-model="science.time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                    :style="{ width: '100%' }" placeholder="请选择立项时间" clearable></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="级别" prop="level">
                                <el-select v-model="science.level" placeholder="请选择立项级别" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in levelOptions" :key="index" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="立项情况" prop="situation">
                                <el-select v-model="science.situation" placeholder="请选择立项情况" clearable
                                    :style="{ width: '100%' }">
                                    <el-option v-for="(item, index) in situationOptions" :key="index"
                                        :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="项目名称" prop="name">
                                <el-input v-model="science.name" placeholder="请输入项目名称" clearable :prefix-icon='Tickets'
                                    :style="{ width: '100%' }"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="项目描述" prop="describe">
                                <el-input v-model="science.describe" type="textarea" placeholder="请输入项目描述"
                                    :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="备注" prop="remarks">
                                <el-input v-model="science.remarks" type="textarea" placeholder="请输入备注（如项目负责人）"
                                    :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label-width="130px" label="证明材料上传" prop="prove">

                                <el-upload ref="prove" :file-list="provefileList" :action="proveAction"
                                    :on-success="submitsuccess" :class="{ hide: hideUpload }" :on-remove="removeimage"
                                    :on-change="handleChange" :before-upload="proveBeforeUpload"
                                    list-type="picture-card" accept="image/*">
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
let data = {
    hideUpload: false,
    science: {
        scyear: "",
        semester: "",
        time: null,
        level: undefined,
        situation: undefined,
        name: undefined,
        describe: undefined,
        remarks: undefined,
        mark: 0,
        prove: null,
    },
    rules: {
        scyear: [{
            required: true,
            message: '请选择科研立项学年',
            trigger: 'change'
        }],
        semester: [{
            required: true,
            message: '请选择科研立项学期',
            trigger: 'change'
        }],
        time: [{
            required: true,
            message: '请选择立项时间',
            trigger: 'change'
        }],
        level: [{
            required: true,
            message: '请选择立项级别',
            trigger: 'change'
        }],
        situation: [{
            required: true,
            message: '请选择立项情况',
            trigger: 'change'
        }],
        name: [{
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
        }],
        describe: [{
            required: true,
            message: '请输入项目描述',
            trigger: 'blur'
        }],
        remarks: [{
            required: false,
            message: '请输入备注（如项目负责人）',
            trigger: 'blur'
        }],
        mark: [{
            required: true,
            message: '加分数不能为空',
            trigger: 'change'
        }],
    },
    proveAction: "http://localhost:8082/ZongCe/student/modifyHead",
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
        "label": "国家级",
        "value": 1
    }, {
        "label": "省级",
        "value": 2
    }, {
        "label": "校级",
        "value": 3
    }, {
        "label": "院级",
        "value": 4
    }],
    situationOptions: [{
        "label": "完成报名",
        "value": 1
    }, {
        "label": "通过结题审查",
        "value": 2
    }, {
        "label": "结题评价良好",
        "value": 3
    }, {
        "label": "结题评价优秀",
        "value": 4
    }],
}

const { science, rules, proveAction, situationOptions, provefileList, scyearOptions, levelOptions, semesterOptions, hideUpload } = toRefs(data)
let submitScientific = ref(false)
function handleChange(file, fileList) {
    this.hideUpload = fileList.length >= 1;
}
function removeimage(fileList) {
    this.hideUpload = fileList.length >= 1;
}
function submitsuccess(data) {
    console.log(data)

}
function submitForm() {
}
function resetForm() {
    this.$refs['science'].resetFields()
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
.hide .el-upload--picture-card {
    display: none;
}
</style>
