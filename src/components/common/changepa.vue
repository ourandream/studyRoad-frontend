<template>
  <div>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
             select="handleSelect"
             router=true
             default-active="/changePa"
             background-color="#E9EEF3">
      <el-menu-item index="/TeaInfo">基本信息</el-menu-item>
      <el-menu-item index="/changePa" >修改密码</el-menu-item>
    </el-menu>
  </div>
  <div style="width:100%;text-align:center">
    <el-card style="margin-top: 2%;">
      <el-container>
        <el-container>
          <img src="../../assets/password.png" style="height: 300px;width: 300px;padding-left: 10%;padding-top: 5%">
        </el-container>
        <el-container>
      <el-form ref="changePs" :model="changePs" :rules="rules" size="medium" label-width="100px"
               style="width: 500px;padding-top: 5%">
          <el-form-item label="账号" prop="id" style="padding-top: 3%">
            <el-input v-model="changePs.id" placeholder="请输入您的账号"   disabled clearable prefix-icon='el-icon-user-solid'
                      :style="{width: '100%'}"></el-input>
          </el-form-item >
          <el-form-item label="原密码" prop="oldPs" style="padding-top: 3%">
            <el-input v-model="changePs.oldPs" placeholder="请输入原密码" clearable prefix-icon='el-icon-key'
                      :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPs" style="padding-top: 3%">
            <el-input v-model="changePs.newPs" placeholder="请输入新密码" clearable prefix-icon='el-icon-lock'
                      :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="newPs2" style="padding-top: 3%">
            <el-input v-model="changePs.newPs2" placeholder="请再次输入确认新密码" clearable prefix-icon='el-icon-lock'
                      :style="{width: '100%'}"></el-input>
          </el-form-item>
          <el-form-item size="large" style="padding-top: 3%">
            <el-button type="primary" @click="submitForm" >提交保存</el-button>
            <span style="padding-right: 50px"></span>
            <el-button @click="resetForm">重置数据</el-button>
          </el-form-item>
      </el-form>
        </el-container>
      </el-container>
    </el-card>
  </div>
  </div>
</template>

<script>
  import {  changeTeapa } from '../../api/Users'
  export default {
    name: 'changepa',
    data() {
      return {
        changePs: {
          id: undefined,
          oldPs: undefined,
          newPs: undefined,
          newPs2: undefined,
        },
        rules: {
          id: [{
            required: true,
            message: '请输入您的账号',
            trigger: 'blur'
          }],
          oldPs: [{ required: true, message: '请输入原密码', transform: value => value, trigger: 'blur' },
            {
              type: 'string',
              message: '请输入不包含空格的字符',
              trigger: 'blur',
              transform(value) {
                if (value && value.indexOf(' ') === -1) {
                  return value
                } else {
                  return false
                }
              }
            },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
                if (!passwordreg.test(value)) {
                  callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
                }else{
                  callback()
                }
              } }],
          newPs: [
            { required: true, message: '请输入新密码', transform: value => value, trigger: 'blur' },
            {
              type: 'string',
              message: '请输入不包含空格的字符',
              trigger: 'blur',
              transform(value) {
                if (value && value.indexOf(' ') === -1) {
                  return value
                } else {
                  return false
                }
              }
            },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
                if (!passwordreg.test(value)) {
                  callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
                }else{
                  callback()
                }
              } }
          ],
          newPs2: [{ required: true, message: '请再次输入确认新密码', transform: value => value, trigger: 'blur' },
            {
              type: 'string',
              message: '请输入不包含空格的字符',
              trigger: 'blur',
              transform(value) {
                if (value && value.indexOf(' ') === -1) {
                  return value
                } else {
                  return false
                }
              }
            },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/
                if (!passwordreg.test(value)) {
                  callback(new Error('密码必须由数字、字母、特殊字符组合,请输入6-16位'))
                }else{
                  callback()
                }
              } }],
        },}},
    created () {
      this.changePs.id=this.$session.get("user").teanum
    },
    methods:{
      async changeTeaPa(painfo){
        const { data }=await changeTeapa(painfo)
        var code=data.code
        var message=data.message
        console.log(data)
        if(code===200)
        {
          this.$message({
            message: "密码修改成功！",
            type: 'success'
          });
          this.$refs['changePs'].resetFields()}
        else  this.$message({
          message: message,
          type: 'error'
        });
      },
      resetForm(){
        this.$refs['changePs'].resetFields()
      },
  submitForm(){
    this.$refs['changePs'].validate(valid => {
      if (!valid) return
      // TODO 提交表单
      this.changeTeaPa(this.changePs)

    })

    },}
  }
</script>

<style scoped>

</style>
