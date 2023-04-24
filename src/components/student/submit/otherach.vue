<template>
  <div>
    <div>
      <el-container>
        <el-container style="width: 50%">
          <el-breadcrumb separator="》" style="padding-left:10px;font-size:15px;">
            <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>科研竞赛</el-breadcrumb-item>
            <el-breadcrumb-item>加分上报</el-breadcrumb-item>
            <el-breadcrumb-item>其他成果加分上报</el-breadcrumb-item>
          </el-breadcrumb>
        </el-container>
        <el-container>
          <el-row>
            <el-button round @click="keyan">科研立项加分</el-button>
            <el-button type="success" round @click="jinsai">学术竞赛加分</el-button>
            <el-button type="info" round @click="lunwen">论文专利加分</el-button>
            <el-button type="warning" round @click="other">其他成果加分</el-button>
          </el-row>
        </el-container>
      </el-container>
    </div>
    <el-container>
      <el-container>
        <el-card class="Forma">
          <el-row :gutter="0">
            <el-form ref="otherky" :model="otherky" :rules="rules" size="mini" label-width="100px">
              <el-col :span="8">
                <el-form-item label="学年" prop="scyear">
                  <el-select v-model="otherky.scyear" placeholder="成果获得学年" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in scyearOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="学期" prop="semester">
                  <el-select v-model="otherky.semester" placeholder="成果获得学期" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in semesterOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="时间" prop="time">
                  <el-date-picker v-model="otherky.time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  :style="{width: '100%'}" placeholder="成果获得时间" clearable></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="加分事项" prop="describe"style="padding-top: 3%">
                  <el-input v-model="otherky.describe" type="textarea" placeholder="请输入成果获得相关加分事项"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注" prop="remarks"style="padding-top: 3%">
                  <el-input v-model="otherky.remarks" type="textarea" placeholder="请输入成果获得相关加分备注"
                            :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="加分数" prop="mark" style="padding-top: 3%">
                  <el-rate v-model="otherky.mark" :max='25' show-score></el-rate>
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
        <el-card style="width: 500px;height: 590px;margin-top: 3%;margin-left: 6%">
          <h3>其他成果评分标准</h3>
          <img src="../../../assets/img/qitakeyan.jpg" style="width: 400px;height: 500px">
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {provedelete,setextrapoint} from '../../../api/keyan'

  export default {
    name: 'otherach',
    data() {
      return {
        hideUpload: false,
        otherky: {
          scyear: "",
          semester: "",
          type:'其他成果',
          time: null,
          describe: undefined,
          remarks: null,
          mark: 0,
          prove: null,
        },
        rules: {
          scyear: [{
            required: true,
            message: '成果获得学年',
            trigger: 'change'
          }],
          semester: [{
            required: true,
            message: '成果获得学期',
            trigger: 'change'
          }],
          time: [{
            required: true,
            message: '成果获得时间',
            trigger: 'change'
          }],
          describe: [{
            required: true,
            message: '请输入成果获得相关加分事项',
            trigger: 'blur'
          }],
          remarks: [],
          mark: [{
            required: true,
            message: '加分数不能为空',
            trigger: 'change'
          }],
        },
        proveAction: "http://localhost:8082/ZongCe/keyan/proveupload",
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
      async setextrapoint(stunum,keyanobject){
        const { data }=await setextrapoint(stunum,keyanobject)
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
        var oldprove=this.otherky.prove
        this.otherky.prove=null
        this.proveDelete(oldprove)
      },
      submitsuccess(data){
        console.log(data)
        this.otherky.prove=data.data.url
        console.log( "证明材料链接："+this.otherky.prove)
      },

      keyan(){
        this.$router.push('/scientific')
      },
      jinsai(){
        this.$router.push('/competition')
      },
      lunwen(){
        this.$router.push('/paper')
      },
      other(){
        this.$router.push('/otherach')
      },
      submitForm() {
        this.$refs['otherky'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          var stunum=this.$session.get("user").stunum
          this.setextrapoint(stunum,this.otherky)
          var that = this;
          setTimeout(function(){
            that.$router.go(0)
          },800)
        })
      },
      resetForm() {
        this.$refs['otherky'].resetFields()
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
      }

    }

  }

</script>
<style>

  .Forma{
    width: 800px;
    height: 590px;
    margin-top: 2%;
    margin-left: 2%;
    /*background-image: url("../../../assets/submitaction.png") ;*/
    /*backdrop-filter: inherit;*/
    background: #fcfcfc url('../../../assets/bac/endeavor.png') no-repeat bottom right/ 45% auto;
    /*background-size: cover;*/
    /*background: #fff url("../../../assets/submitaction.png") no-repeat;*/
  }

</style>
