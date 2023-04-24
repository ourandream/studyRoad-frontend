<template>
  <div>
    <div>
      <el-container>
        <el-container style="width: 50%">
          <el-breadcrumb separator="》" style="padding-left:10px;font-size:15px;">
            <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>艺体素养</el-breadcrumb-item>
            <el-breadcrumb-item>成果上报</el-breadcrumb-item>
            <el-breadcrumb-item>艺体荣誉成果上报</el-breadcrumb-item>
          </el-breadcrumb>
        </el-container>
        <el-container>
          <el-row>
            <el-button round @click="canyu">艺体参与加分</el-button>
            <el-button type="success" round @click="rongyu">艺体荣誉加分</el-button>
            <el-button type="info" round @click="qita">其他艺体加分</el-button>
          </el-row>
        </el-container>
      </el-container>
    </div>
    <el-container>
      <el-container>
        <el-card class="artform">
          <el-row :gutter="0">
            <el-form ref="honor" :model="honor" :rules="rules" size="mini" label-width="100px">
              <el-col :span="8">
                <el-form-item label="获奖学年" prop="scyear">
                  <el-select v-model="honor.scyear" placeholder="获奖学年" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in scyearOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="获奖学期" prop="semester">
                  <el-select v-model="honor.semester" placeholder="获奖学期" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in semesterOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="获奖时间" prop="time">
                  <el-date-picker v-model="honor.time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  :style="{width: '100%'}" placeholder="获奖时间" clearable></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="获奖级别" prop="level"style="padding-top: 2%">
                  <el-select v-model="honor.level" placeholder="请选择获奖级别" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in levelOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="等次" prop="order"style="padding-top: 2%">
                  <el-select v-model="honor.order" placeholder="请选择获奖等次" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in orderOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="竞赛名称" prop="name"style="padding-top: 2%">
                  <el-input v-model="honor.name" placeholder="请输入竞赛名称" clearable :style="{width: '100%'}">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="获奖描述" prop="describe"style="padding-top: 2%">
                  <el-input v-model="honor.describe" type="textarea" placeholder="请输入获奖描述"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注" prop="remarks"style="padding-top: 2%">
                  <el-input v-model="honor.remarks" type="textarea" placeholder="请输入获奖另加分事项"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="加分数" prop="mark"style="padding-top: 2%">
                  <el-rate v-model="honor.mark" :max='51' show-score></el-rate>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="130px" label="证明材料上传" prop="prove" style="padding-top: 3%">

                  <el-upload ref="prove" :file-list="provefileList" :action="proveAction"
                             :on-success="submitsuccess"
                             :class="{hide:hideUpload}"
                             :on-remove="removeimage"
                             :on-change="handleChange"
                             :before-upload="proveBeforeUpload" list-type="picture-card" accept="image/*">
                    <i class="el-icon-plus"></i>
                  </el-upload>

                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item size="medium" style="padding-top: 5%" >
                  <span style="padding-left: 20%">
                  <el-button type="primary" @click="submitForm">上报申请</el-button>
                  </span>
                  <span style="padding-left: 10%">
                  <el-button @click="resetForm">重置数据</el-button>
                  </span>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-card>
      </el-container>


      <el-container>
        <el-card style="width: 500px;height: 590px;margin-top: 3%;margin-left: 6%">
          <h3>艺体荣誉加分标准</h3>
          <img src="../../../assets/img/arthonor.jpg" style="width: 400px;height: 500px">
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {provedelete,setextrapoint} from '../../../api/yiti'

  export default {
    name: 'arthonor',
    data() {
      return {
        hideUpload: false,
        honor: {
          scyear: "",
          semester: "",
          time: null,
          type:"艺体荣誉",
          level: undefined,
          order: undefined,
          name: undefined,
          describe: undefined,
          remarks: null,
          mark: 0,
          prove: null,
        },
        rules: {
          scyear: [{
            required: true,
            message: '获奖学年',
            trigger: 'change'
          }],
          semester: [{
            required: true,
            message: '获奖学期',
            trigger: 'change'
          }],
          time: [{
            required: true,
            message: '获奖时间',
            trigger: 'change'
          }],
          level: [{
            required: true,
            message: '请选择获奖级别',
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
            message: '请输入获奖描述',
            trigger: 'blur'
          }],
          remarks: [],
          mark: [{
            required: true,
            message: '加分数不能为空',
            trigger: 'change'
          }],
        },
        proveAction: "http://localhost:8082/ZongCe/yiti/proveupload",
        provefileList: [],
        scyearOptions: [
          {
            "label": "2021年~2022年",
            "value": "2021年~2022年"
          }, {
            "label": "2020年~2021年",
            "value": "2020年~2021年"
          }, {
            "label": "2019年~2020年",
            "value": "2019年~2020年"
          }, {
            "label": "2018年~2019年",
            "value":"2018年~2019年"
          }],
        semesterOptions: [
          {
          "label": "第一学期",
          "value": 1
        }, {
          "label": "第二学期",
          "value": 2
        }],
        levelOptions: [
          {
          "label": "国家级",
          "value": "国家级"
        }, {
          "label": "省级",
          "value":"省级",
        }, {
          "label": "校级",
          "value": "校级",
        }, {
          "label": "院级",
          "value": "院级",
        }],
        orderOptions: [
          {
          "label": "第1名",
          "value": "第1名",
        }, {
          "label": "第2名",
          "value": "第2名",
        }, {
          "label": "第3名",
          "value": "第3名",
        }, {
          "label": "第4名",
          "value": "第4名",
        }, {
          "label": "第5名",
          "value": "第5名",
        }, {
          "label": "第6、7、8名",
          "value": "第6、7、8名",
        }, {
          "label": "一等奖",
          "value": "一等奖",
        }, {
          "label": "二等奖",
          "value": "二等奖",
        }, {
          "label": "三等奖",
          "value": "三等奖",
        }, {
          "label": "优胜奖",
          "value": "优胜奖",
        }, {
          "label": "优秀个人及先进个人",
          "value": "优秀个人及先进个人",
        }],
      }
    },
    methods:{
      async setextrapoint(stunum,yitiobject){
        const { data }=await setextrapoint(stunum,yitiobject)
        console.log(data)
        if(data.code===200)this.$message({
          message: "成果上报成功！",
          type: 'success'
        });
        else this.$message({
          message: "成果上报失败！",
          type: 'error'
        });
      },
      async proveDelete(file){
        const { data }=await provedelete(file)
        console.log(data)
      },
      handleChange(file,fileList) {
        this.hideUpload = fileList.length>=1;
      },
      removeimage(fileList){
        this.hideUpload = fileList.length >= 1;
        var oldprove=this.honor.prove
        this.honor.prove=null
        this.proveDelete(oldprove)

      },
      submitsuccess(data){
        console.log(data)
        this.honor.prove=data.data.url
        console.log( "证明材料链接："+this.honor.prove+"牛逼")
      },

      canyu(){
        this.$router.push('/artjoin')
      },
      rongyu(){
        this.$router.push('/arthonor')
      },
      qita(){
        this.$router.push('/artother')
      },
      submitForm() {
        this.$refs['honor'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          var stunum=this.$session.get("user").stunum
          this.setextrapoint(stunum,this. honor)
          var that = this;
          setTimeout(function(){
            that.$router.go(0)
          },800)
        })
      },
      resetForm() {
        this.$refs['honor'].resetFields()
      },
      proveBeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 10
        if (!isRightSize) {
          this.$message.error('文件大小超过 10MB')
        }
        let isAccept = new RegExp('image/*').test(file.type)
        if (!isAccept) {
          this.$message.error('应该选择image/*类型的文件')
        }
        return isRightSize && isAccept
      },

    }
  }
</script>

<style >
  .artform{
    width: 800px;
    height: 590px;
    margin-top: 2%;
    margin-left: 2%;
    text-align: left;
    /*background-image: url("../../../assets/submitaction.png") ;*/
    /*backdrop-filter: inherit;*/
    background: #fcfcfc url('../../../assets/bac/endeavor.png') no-repeat bottom right/ 45% auto;
    /*background-size: cover;*/
    /*background: #fff url("../../../assets/submitaction.png") no-repeat;*/
  }
</style>
