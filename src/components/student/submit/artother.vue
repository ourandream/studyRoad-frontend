<template>
  <div>
    <div>
      <el-container>
        <el-container style="width: 50%">
          <el-breadcrumb separator="》" style="padding-left:10px;font-size:15px;">
            <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>艺体素养</el-breadcrumb-item>
            <el-breadcrumb-item>成果上报</el-breadcrumb-item>
            <el-breadcrumb-item>其他艺体成果上报</el-breadcrumb-item>
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
            <el-form ref="artother" :model="artother" :rules="rules" size="mini" label-width="100px">
              <el-col :span="8">
                <el-form-item label="加分学年" prop="scyear">
                  <el-select v-model="artother.scyear" placeholder="加分学年" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in scyearOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="加分学期" prop="semester">
                  <el-select v-model="artother.semester" placeholder="加分学期" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in semesterOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="加分时间" prop="time">
                  <el-date-picker v-model="artother.time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  :style="{width: '100%'}" placeholder="加分时间" clearable></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="加分事项" prop="describe" style="padding-top: 2%">
                  <el-input v-model="artother.describe" type="textarea" placeholder="请输入加分具体事项"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注" prop="remarks" style="padding-top: 2%">
                  <el-input v-model="artother.remarks" type="textarea" placeholder="请输入其他艺体加分备注事项"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="加分数" prop="mark" style="padding-top: 2%">
                  <el-rate v-model="artother.mark" :max='20' show-score></el-rate>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="130px" label="证明材料上传" prop="prove" style="padding-top: 2%">

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
          <h3>其他艺体加分标准</h3>
          <img src="../../../assets/img/artother.jpg" style="width: 400px;height: 500px">
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {provedelete,setextrapoint} from '../../../api/yiti'

  export default {
    name: 'artother',
    data() {
      return {
        hideUpload: false,
        artother: {
          scyear: "",
          semester: "",
          type:"其他艺体",
          time: null,
          describe: undefined,
          remarks: null,
          mark: 0,
          prove: null,
        },
        rules: {
          scyear: [{
            required: true,
            message: '加分学年',
            trigger: 'change'
          }],
          semester: [{
            required: true,
            message: '加分学期',
            trigger: 'change'
          }],
          time: [{
            required: true,
            message: '加分时间',
            trigger: 'change'
          }],
          describe: [{
            required: true,
            message: '请输入加分具体事项',
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
        semesterOptions: [{
          "label": "第一学期",
          "value": 1
        }, {
          "label": "第二学期",
          "value": 2
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
        var oldprove=this.artother.prove
        this.artother.prove=null
        this.proveDelete(oldprove)

      },
      submitsuccess(data){
        console.log(data)
        this.artother.prove=data.data.url
        console.log( "证明材料链接："+this.artother.prove+"牛逼")
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
        this.$refs['artother'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          var stunum=this.$session.get("user").stunum
          this.setextrapoint(stunum,this.artother)
          var that = this;
          setTimeout(function(){
            that.$router.go(0)
          },800)
        })
      },
      resetForm() {
        this.$refs['artother'].resetFields()
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
