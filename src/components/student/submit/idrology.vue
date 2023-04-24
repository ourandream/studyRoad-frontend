<template>
  <div>
  <div>
    <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
      <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>思想品德</el-breadcrumb-item>
      <el-breadcrumb-item>行为纪实加分上报</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
    <el-container>
      <el-container>
        <el-card class="Forma">
          <el-row :gutter="0">
            <el-form ref="behavior" :model="behavior" :rules="rules" size="mini" label-width="100px">
              <el-col :span="8">
                <el-form-item label-width="110px" label="学年" prop="scyear">
                  <el-select v-model="behavior.scyear" placeholder="请选择加分学年" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in scyearOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="110px" label="学期" prop="semester">
                  <el-select v-model="behavior.semester" placeholder="请选择加分学期" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in semesterOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="120px" label="加分事项时间" prop="time">
                  <el-date-picker v-model="behavior.time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  :style="{width: '100%'}" placeholder="请选择时间" clearable></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="110px" label="加分类型" prop="type">
                  <el-select v-model="behavior.type" placeholder="请选择加分类型" clearable :style="{width: '100%'}"
                             @change="select">
                    <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="110px" label="加分事项" prop="matter">
                  <el-input v-model="behavior.matter" placeholder="请输入加分事项" clearable :style="{width: '100%'}">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="behavior.type!='荣誉奖项'"  label-width="110px" label="级别" prop="level">
                  <el-select v-model="behavior.level2" placeholder="请选择奖项荣誉级别" clearable :style="{width: '100%'}"
                             :disabled="true">
                    <el-option v-for="(item, index) in levelOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-else label-width="110px" label="级别" prop="level">
                  <el-select v-model="behavior.level" placeholder="请选择奖项荣誉级别" clearable :style="{width: '100%'}"
                  >
                    <el-option v-for="(item, index) in levelOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="behavior.type!='荣誉奖项'"  label-width="110px" label="等次" prop="order">
                  <el-select v-model="behavior.order2" placeholder="请选择奖项荣誉等次" clearable :style="{width: '100%'}"
                                :disabled="true">
                    <el-option v-for="(item, index) in orderOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-else label-width="110px" label="等次" prop="order">
                  <el-select v-model="behavior.order" placeholder="请选择奖项荣誉等次" clearable :style="{width: '100%'}"
                             >
                    <el-option v-for="(item, index) in orderOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="具体描述" prop="describe">
                  <el-input v-model="behavior.describe" type="textarea" placeholder="请输入加分具体描述"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="110px" label="备注" prop="remarks">
                  <el-input v-model="behavior.remarks" type="textarea" placeholder="请输入备注"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="110px" label="申请加分数" prop="mark">
                  <el-rate v-model="behavior.mark" :max='25' show-score></el-rate>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="120px" label="证明材料上传" prop="upload" >
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
                <el-form-item size="medium" style="padding-top: 5%">
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
        <el-card style="width: 500px;height: 590px;margin-top: 3%;margin-left: 6%;overflow: scroll;">
          <h3>评分标准</h3>
          <img src="../../../assets/img/behavior.jpg" style="width: 100%">
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {provedelete,setextrapoint} from '../../../api/sixiang'

  export default {
    name: 'idrology',
    components: {},
    props: [],
    data() {
      return {

        hideUpload: false,
        proveAction: "http://localhost:8082/ZongCe/sixiang/proveupload",
        provefileList: [],
        behavior: {
          scyear: undefined,
          semester: undefined,
          time: undefined,
          type: undefined,
          level:undefined,
          level2: undefined,
          order: undefined,
          order2:undefined,
          matter:undefined,
          describe: undefined,
          mark: undefined,
          remarks:null,
          upload:null,
        },
        rules: {
          scyear: [{
            required: true,
            message: '请选择加分学年',
            trigger: 'change'
          }],
          semester: [{
            required: true,
            message: '请选择加分学期',
            trigger: 'change'
          }],
          type: [{
            required: true,
            message: '请选择加分类型',
            trigger: 'change'
          }],
          level: [{
            required: true,
            message: '请选择奖项荣誉级别',
            trigger: 'change'
          }],
          order: [{
            required: true,
            message: '请选择奖项荣誉等次',
            trigger: 'change'
          }],
          matter: [{
            required: true,
            message: '请输入加分事项',
            trigger: 'blur'
          }],
          time: [{
            required: true,
            message: '请选择加分事项时间',
            trigger: 'change'
          }],
          describe: [{
            required: true,
            message: '请输入加分具体描述',
            trigger: 'blur'
          }],
          mark: [{
            required: true,
            message: '申请加分数不能为空',
            trigger: 'change'
          }],
          remarks: [],
        },
        uploadAction: 'https://jsonplaceholder.typicode.com/posts/',
        uploadfileList: [],
        scyearOptions: [
          {
          "label": "2021年~2022年",
          "value":"2021年~2022年"
        }, {
          "label": "2020年~2021年",
          "value": "2020年~2021年"
        }, {
          "label": "2019年~2020年",
          "value": "2019年~2020年"
        }, {
          "label": "2018年~2019年",
          "value": "2018年~2019年"
        }],
        semesterOptions: [
          {
          "label": "第一学期",
          "value": 1
        }, {
          "label": "第二学期",
          "value": 2
        }],
        typeOptions: [
          {
          "label": "通报表扬",
          "value": "通报表扬"
        }, {
          "label": "活动参与",
          "value": "活动参与"
        }, {
          "label": "荣誉奖项",
          "value": "荣誉奖项"
        }],
        levelOptions: [
          {
          "label": "国家级",
          "value": "国家级"
        }, {
          "label": "省级",
          "value": "省级"
        }, {
          "label": "市级",
          "value": "市级"
        }, {
          "label": "校级",
          "value": "校级"
        }, {
          "label": "院级",
          "value": "院级"
        }],
        orderOptions: [
         {
          "label": "一等奖",
          "value": "一等奖"
        }, {
          "label": "二等奖",
          "value": "二等奖"
        }, {
          "label": "三等奖",
          "value": "三等奖"
        }, {
          "label": "一类立项",
          "value": "一类立项"
        }, {
          "label": "二类立项",
          "value": "二类立项"
        }, {
          "label": "荣誉称号",
          "value": "荣誉称号"
        }],
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {

      async setextrapoint(stunum,behavior){
        const { data }=await setextrapoint(stunum,behavior)
        console.log(data)
        if(data.code===200)this.$message({
          message: "加分上报成功！",
          type: 'success'
        });
        else this.$message({
          message: "加分上报失败！",
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
        var oldprove=this.behavior.upload
        this.behavior.upload=null
        this.proveDelete(oldprove)
      },
      submitsuccess(data){
        console.log(data)
        this.behavior.upload=data.data.url
      },
      submitForm() {
        this.$refs['behavior'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          var stunum=this.$session.get("user").stunum
          this.setextrapoint(stunum,this.behavior)
          var that = this;
          setTimeout(function(){
            that.$router.go(0)
          },800)
        })
      },
      resetForm() {
        this.$refs['behavior'].resetFields()
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
      select(){
        if(this.behavior.type=="通报表扬")
        {this.behavior.level="国家级";
        this.behavior.order="一等奖";}
        if(this.behavior.type=="活动参与"){
          this.behavior.level="国家级";
          this.behavior.order="一等奖";}

      }
    }
  }

</script>
<style>
  .hide .el-upload--picture-card {
    display: none;
  }
  .el-rate {
    display: inline-block;
    vertical-align: text-top;
  }

  .el-upload__tip {
    line-height: 1.2;
  }

  .Forma{
   width: 800px;
    height: 590px;
    margin-top: 2%;
    margin-left: 2%;
    text-align:left;
    /*background-image: url("../../../assets/submitaction.png") ;*/
    /*backdrop-filter: inherit;*/
    background: #fcfcfc url('../../../assets/bac/endeavor.png') no-repeat bottom right/ 45% auto;
    /*background-size: cover;*/
    /*background: #fff url("../../../assets/submitaction.png") no-repeat;*/
  }

</style>
