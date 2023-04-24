<template>
  <div>
    <div>
      <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
        <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>思想品德</el-breadcrumb-item>
        <el-breadcrumb-item>民主测评</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-container>
      <el-container>
        <el-card  class="bac">
          <el-form ref="democratic" :model="democratic" :rules="rules" size="medium"
                   label-width="100px"
                   style="width: 35vw;padding-left: 8%;padding-top: 2%">
            <el-form-item label="学年" prop="scyear">
              <el-input v-model="democratic.scyear" readonly :disabled='true' clearable
                        prefix-icon='el-icon-time' :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="打分同学" prop="stu">
              <el-select v-model="democratic.stu" placeholder="请选择打分同学" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in stuOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治表现" prop="politics">
              <el-rate v-model="democratic.politics" :max='15' allow-half show-score></el-rate>
            </el-form-item>
            <el-form-item label="道德素养" prop="morality">
              <el-rate v-model="democratic.morality" :max='15' allow-half show-score></el-rate>
            </el-form-item>
            <el-form-item label="集体观念" prop="collective">
              <el-rate v-model="democratic.collective" :max='5' allow-half show-score></el-rate>
            </el-form-item>
            <el-form-item label="学习精神" prop="study">
              <el-rate v-model="democratic.study" :max='5' allow-half show-score></el-rate>
            </el-form-item>
            <el-form-item label="劳动观念" prop="work">
              <el-rate v-model="democratic.work" :max='5' allow-half show-score></el-rate>
            </el-form-item>
            <el-form-item label="体育精神" prop="pe">
              <el-rate v-model="democratic.pe" :max='5' allow-half show-score></el-rate>
            </el-form-item>
            <el-form-item size="medium">
              <span >
              <el-button type="primary" @click="submitForm">提交评分</el-button></span>
              <span style="padding-left: 20%">
              <el-button @click="resetForm" icon="el-icon-refresh">重置数据</el-button>
              </span>
            </el-form-item>
          </el-form>
        </el-card>
      </el-container>
      <el-container>
        <el-card style="width: 500px;height: 590px;margin-top: 3%;margin-left: 6%">
          <h3>评分标准</h3>
          <img src="../../assets/img/Democraticappraisal.jpg" style="width: 100%">
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {getClassmate,setDemocratic} from "../../api/Democratic"

  export default {
    name: 'deappraisal',
    data() {
      return {
        democratic: {
          scyear: "2021",
          stu: "",
          politics: 0,
          morality: 0,
          collective: 0,
          study: 0,
          work: 0,
          pe: 0,
        },
        rules: {
          scyear: [{
            required: true,
            message: '',
            trigger: 'blur'
          }],
          stu: [{
            required: true,
            message: '请选择打分同学',
            trigger: 'change'
          }],
          politics: [{
            required: true,
            message: '政治表现不能为空',
            trigger: 'change'
          }],
          morality: [{
            required: true,
            message: '道德素养不能为空',
            trigger: 'change'
          }],
          collective: [{
            required: true,
            message: '集体观念不能为空',
            trigger: 'change'
          }],
          study: [{
            required: true,
            message: '学习精神不能为空',
            trigger: 'change'
          }],
          work: [{
            required: true,
            message: '劳动观念不能为空',
            trigger: 'change'
          }],
          pe: [{
            required: true,
            message: '体育精神不能为空',
            trigger: 'change'
          }],
        },
        stuOptions:undefined
      }},
    created () {
      var stugrade=this.$session.get("user").stugrade
      var stuclass=this.$session.get("user").stuclass
      var stuname=this.$session.get("user").stuname
      this.getClassmate(stugrade,stuclass,stuname)
    },
    methods: {
      async getClassmate(stugrade,stuclass,stuname){
        const { data }=await getClassmate(stugrade,stuclass,stuname)
        console.log(data)
        this.stuOptions=data.data.stuOptions
      },
      async setdemocratic(score,scoreed,de){
        const { data }=await setDemocratic(score,scoreed,de)
        console.log(data)
        var code=data.code
        var message=data.message
        if(code===3009)
          this.$message.error(message);
        else  if(code==200)this.$message({
          message: "打分提交成功！",
          type: 'success'
        });
        else this.$message.error("打分提交失败！");
      },
      submitForm() {
        this.$refs['democratic'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          var score=this.$session.get("user").stunum
          var scoreed=this.democratic.stu
          this.setdemocratic(score,scoreed,this.democratic)
          var that = this;
          setTimeout(function(){
            that.$router.go(0)
          },800)
        })
      },
      resetForm() {
        this.$refs['democratic'].resetFields()
      },
    }
  }
</script>

<style scoped>
.bac{
  width: 800px;
  height: 590px;
  margin-top: 2%;
  margin-left: 2%;
  background: #fcfcfc url('../../assets/com.png') no-repeat center/ 80% auto;
  /*background: url('../../assets/comment.png');*/
  /*float: left;*/
  /*background-repeat: no-repeat;*/
  /*background-position: center;*/
  /*background-size: cover;*/
  /*filter: blur(19px);*/
}
</style>
