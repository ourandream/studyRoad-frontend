<template>
    <div>
      <div>
        <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
          <el-breadcrumb-item :to="{ path: '/TeaHome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>学生列表</el-breadcrumb-item>
          <el-breadcrumb-item>信息修改</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-card class="box-card"style="margin-top: 1%;" >
        <div>
         <span style="padding-left: 90%"><el-button type="primary" plain @click="goOff" >返回</el-button></span>
        </div>
        <el-row :gutter="39">
        <el-form ref="stuUser" :model="stuUser"  :rules="rules" size="small" label-width="100px" style="padding-left: 15%">
          <el-col :span="9">
            <el-form-item label="学号" prop="number">
              <el-input v-model="stuUser.number" placeholder="请输入学号" readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="stuUser.name" placeholder="请输入姓名" readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="stuUser.sex" size="medium" :disabled='true'>
                <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                          :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="年级" prop="grade">
              <el-input v-model="stuUser.grade"  clearable prefix-icon='el-icon-s-help'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="班级" prop="class">
              <el-input v-model="stuUser.class"clearable prefix-icon='el-icon-s-help'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="专业" prop="major">
              <el-input v-model="stuUser.major"  clearable prefix-icon='el-icon-s-help'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="宿舍" prop="dorm">
              <el-input v-model="stuUser.dorm" clearable prefix-icon='el-icon-s-help'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="身份证号" prop="idcard">
              <el-input v-model="stuUser.idcard"  readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="民族" prop="nation">
              <el-input v-model="stuUser.nation"  readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="籍贯" prop="naPlace">
              <el-input v-model="stuUser.naPlace"  readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="政治面貌" prop="poLook">
              <el-input v-model="stuUser.poLook" readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="出生日期" prop="birthDate">
              <el-input v-model="stuUser.birthDate"  readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="stuUser.phone" readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="stuUser.email"  readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="微信" prop="wechat">
              <el-input v-model="stuUser.wechat"  readonly :disabled='true' clearable
                        prefix-icon='el-icon-s-help' :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="辅导员" prop="teacher">
              <el-input v-model="stuUser.teacher"  clearable prefix-icon='el-icon-s-help'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="辅导员电话" prop="teaphone">
              <el-input v-model="stuUser.teaphone"clearable prefix-icon='el-icon-s-help'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="学籍状态" prop="state">
              <el-select v-model="stuUser.state" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in stateOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large">
              <span style="padding-right: 35%"><el-button type="primary" @click="submitForm" >提交保存</el-button></span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      </el-card>
    </div>
</template>

<script>
  import {  modifyStu } from '../../api/Users'
  export default {
    name: 'modifystu',
  data(){
    return {
      stuInfo: this.$route.query.stuinfo,
      stuUser:{
        number: undefined,
        name: undefined,
        sex:undefined,
        grade:undefined,
        class:undefined,
        major:undefined,
        dorm:undefined,
        idcard:undefined,
        nation:undefined,
        naPlace:undefined,
        poLook:undefined,
        birthDate:undefined,
        phone:undefined,
        email:undefined,
        wechat:undefined,
        teacher:undefined,
        teaphone:undefined,
        state:undefined,
      },
      rules: {

      },
      sexOptions: [
        {
        "label": "男",
        "value": 1
      }, {
        "label": "女",
        "value": 2
      }],
      stateOptions: [
        {
        "label": "在读",
        "value": 1
      }, {
        "label": "休学",
        "value": 2
      }, {
        "label": "保留学籍",
        "value": 3
      }, {
        "label": "待审核",
        "value": 4
      }],

    }
    },
    created () {
      this.stuUser.number=this.stuInfo.stunum
      this.stuUser.name=this.stuInfo.stuname
      this.stuUser.sex=this.stuInfo.stusex
      this.stuUser.grade=this.stuInfo.stugrade
      this.stuUser.class=this.stuInfo.stuclass
      this.stuUser.major=this.stuInfo.stumajor
      this.stuUser.dorm=this.stuInfo.studormitory
      this.stuUser.idcard=this.stuInfo.stuidcard
      this.stuUser.nation=this.stuInfo.stunation
      this.stuUser.naPlace=this.stuInfo.stunativeplace
      this.stuUser.poLook=this.stuInfo.stupoliticaloutlook
      this.stuUser.birthDate=this.stuInfo.stubirthdate
      this.stuUser.phone=this.stuInfo.stuphone
      this.stuUser.email=this.stuInfo.stuemail
      this.stuUser.wechat=this.stuInfo.stuwechat
      this.stuUser.teacher=this.stuInfo.stuinstructor
      this.stuUser.teaphone=this.stuInfo.stuinstructorphone
      this.stuUser.state=this.stuInfo.stustate
    },
    methods:{
      async modifyStu(stu) {
        const { data } = await modifyStu(stu)
        if(data.code===200)
        {
          this.$message({
            message: '学生信息已经成功修改！',
            type: 'success'
          });
         }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      goOff(){ this.$router.push('/stuManage') },
      submitForm()
      {
        this.modifyStu(this.stuUser)
      },
    }
  }
</script>

<style scoped>

</style>
