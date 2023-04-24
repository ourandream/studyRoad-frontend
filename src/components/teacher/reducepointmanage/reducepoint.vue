<template>
<div>
  <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
    <el-breadcrumb-item :to="{ path: '/TeaHome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>扣分管理</el-breadcrumb-item>
    <el-breadcrumb-item>扣分录入</el-breadcrumb-item>
  </el-breadcrumb>
  <el-container>
    <el-container>
      <el-card class="reCard">
        <el-row :gutter="0">
          <el-form ref="deductForm" :model="deductForm" :rules="rules" size="small" label-width="100px">
            <el-col :span="12">
              <el-form-item label="姓名" prop="dename" style="padding-top: 6%">
                <el-input v-model="deductForm.dename" placeholder="请输入扣分学生姓名" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学号" prop="denum" style="padding-top: 6%">
                <el-input v-model="deductForm.denum" placeholder="请输入扣分学生学号" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年级" prop="degrade" style="padding-top: 2%">
                <el-select v-model="deductForm.degrade" placeholder="请选择扣分学生年级" clearable
                           :style="{width: '100%'}">
                  <el-option v-for="(item, index) in degradeOptions" :key="index" :label="item.label"
                             :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学年" prop="descyear" style="padding-top: 2%">
                <el-select v-model="deductForm.descyear" placeholder="请选择扣分学年" clearable :style="{width: '100%'}">
                  <el-option v-for="(item, index) in descyearOptions" :key="index" :label="item.label"
                             :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学期" prop="desemester" style="padding-top: 2%">
                <el-select v-model="deductForm.desemester" placeholder="请选择扣分学期" clearable
                           :style="{width: '100%'}">
                  <el-option v-for="(item, index) in desemesterOptions" :key="index" :label="item.label"
                             :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期" prop="detime" style="padding-top: 2%">
                <el-date-picker v-model="deductForm.detime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                :style="{width: '100%'}" placeholder="请选择扣分日期" clearable></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣分模块" prop="demodule" style="padding-top: 2%">
                <el-select v-model="deductForm.demodule" placeholder="请选择扣分模块" clearable :style="{width: '100%'}">
                  <el-option v-for="(item, index) in demoduleOptions" :key="index" :label="item.label"
                             :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣分事项" prop="dematter" style="padding-top: 2%">
                <el-input v-model="deductForm.dematter" placeholder="请输入扣分事项" clearable :style="{width: '100%'}">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣分简介" prop="dedescripe" style="padding-top: 2%">
                <el-input v-model="deductForm.dedescripe" type="textarea" placeholder="请输入扣分简介"
                          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扣分备注" prop="deremark" style="padding-top: 2%">
                <el-input v-model="deductForm.deremark" type="textarea" placeholder="请输入扣分备注"
                          :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="扣分数" prop="depoint" style="padding-top: 2%">
                <el-rate v-model="deductForm.depoint" :max='20' show-score></el-rate>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item size="large"  style="padding-top: 3%">
                <span style="padding-right: 5%">
                <el-button type="primary" @click="submitForm">提交</el-button>
                  </span>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-card>
    </el-container>


    <el-container>
      <el-card style="width: 500px;height: 590px;margin-top: 3%;margin-left: 6%">
        <h3>扣分标准</h3>
        <img src="../../../assets/img/koufen.jpg" style="width: 400px;height: 500px">
      </el-card>
    </el-container>
  </el-container>
</div>
</template>

<script>
  import {reducePoint} from '../../../api/Users'
  export default {
    name: 'reducepoint',
    data() {
      return {
        deductForm: {
          dename: undefined,
          denum: undefined,
          degrade: undefined,
          descyear: undefined,
          desemester: undefined,
          demodule: undefined,
          detime: null,
          dematter: undefined,
          dedescripe: undefined,
          deremark: undefined,
          depoint: 0,
        },
        rules: {
          dename: [{
            required: true,
            message: '请输入扣分学生姓名',
            trigger: 'blur'
          }],
          denum: [{
            required: true,
            message: '请输入扣分学生学号',
            trigger: 'blur'
          }],
          degrade: [{
            required: true,
            message: '请选择扣分学生年级',
            trigger: 'change'
          }],
          descyear: [{
            required: true,
            message: '请选择扣分学年',
            trigger: 'change'
          }],
          desemester: [{
            required: true,
            message: '请选择扣分学期',
            trigger: 'change'
          }],
          demodule: [{
            required: true,
            message: '请选择扣分模块',
            trigger: 'change'
          }],
          detime: [{
            required: true,
            message: '请选择扣分日期',
            trigger: 'change'
          }],
          dematter: [{
            required: true,
            message: '请输入扣分事项',
            trigger: 'blur'
          }],
          dedescripe: [{
            required: true,
            message: '请输入扣分简介',
            trigger: 'blur'
          }],
          depoint: [{
            required: true,
            message: '扣分数不能为空',
            trigger: 'change'
          }],
        },
        degradeOptions: [{
          "label": "2021级",
          "value": 2021,
        }, {
          "label": "2020级",
          "value": 2020,
        }, {
          "label": "2019级",
          "value": 2019,
        }, {
          "label": "2018级",
          "value": 2018,
        }],
        descyearOptions: [{
          "label": "2021~2022学年",
          "value": "2021~2022学年"
        }, {
          "label": "2020~2021学年",
          "value":"2020~2021学年",
        }, {
          "label": "2019~2020学年",
          "value": "2019~2020学年",
        }, {
          "label": "2018~2019学年",
          "value": "2018~2019学年",
        }],
        desemesterOptions: [{
          "label": "第一学期",
          "value": 1
        }, {
          "label": "第二学期",
          "value": 2
        }],
        demoduleOptions: [{
          "label": "思想品德",
          "value": 1
        }, {
          "label": "艺体素养",
          "value": 2
        }, {
          "label": "实践创业",
          "value": 3
        }],
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      async ReducePoint(teauser,deductForm) {
        const { data } = await reducePoint(teauser,deductForm)
        if(data.code===200)
        {
          this.$message({
            message: data.message,
            type: 'success'
          });
          this.$refs['deductForm'].resetFields()
        }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      submitForm() {
        this.$refs['deductForm'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          this.ReducePoint(this.$session.get("user"),this.deductForm)
        })
      },
      resetForm() {
        this.$refs['deductForm'].resetFields()
      },
    }
  }
</script>

<style>

  .reCard{
    width: 800px;
    height: 590px;
    margin-top: 2%;
    margin-left: 2%;
    /*background-image: url("../../../assets/submitaction.png") ;*/
    /*backdrop-filter: inherit;*/
    background: #fcfcfc url('../../../assets/bac/reducepoint.png') no-repeat bottom right/ 30% auto;
    /*background-size: cover;*/
    /*background: #fff url("../../../assets/submitaction.png") no-repeat;*/
  }
  .el-rate {
    display: inline-block;
    vertical-align: text-top;
  }
</style>
