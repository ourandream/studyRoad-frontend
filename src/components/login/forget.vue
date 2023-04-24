<template>
<el-dialog title="找回密码" :visible.sync="dialogFormVisible" class="findPs" center @close="Close">
    <el-form ref="forgetForm" :model="forgetData" :rules="rules" size="medium" label-width="100px"
             style="padding-right: 20px">
        <el-form-item label="用户账号" prop="id">
          <el-input v-model="forgetData.id" placeholder="请输入账号用户账号" clearable
                    prefix-icon='el-icon-user-solid' :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="验证信息①" prop="provePhone">
          <el-input v-model="forgetData.provePhone" placeholder="请输入电话号码" clearable
                    prefix-icon='el-icon-phone' :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="验证信息②" prop="proveEmail">
          <el-input v-model="forgetData.proveEmail" placeholder="请输入邮箱号" clearable
                    prefix-icon='el-icon-message' :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPs">
          <el-input v-model="forgetData.newPs" placeholder="请输入新密码" clearable prefix-icon='el-icon-lock'
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPs2">
          <el-input v-model="forgetData.newPs2" placeholder="请再次输入新密码" clearable prefix-icon='el-icon-lock'
                    :style="{width: '100%'}"></el-input>
        </el-form-item>
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="Close">取 消</el-button>
    <el-button type="primary" @click="Submit">提交</el-button>
  </div>
 </el-dialog>

</template>

<script>
  import '../../assets/alert.js'
  import {stuforgetpa,teaforgetpa} from '../../api/Users'
  export default {
    props:['dialogFormVisible'],
    data() {
      return {
        forgetData: {
          id: undefined,
          provePhone: undefined,
          proveEmail: undefined,
          newPs: undefined,
          newPs2: undefined,
        },
        rules: {
          id: [{
            required: true,
            message: '请输入账号用户账号',
            trigger: 'blur'
          }],
          provePhone: [{
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          }],
          proveEmail: [{
            required: true,
            message: '请输入邮箱号',
            trigger: 'blur'
          }],
          newPs: [{ required: true, message: '请输入密码', transform: value => value, trigger: 'blur' },
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
          newPs2: [{ required: true, message: '请输入密码', transform: value => value, trigger: 'blur' },
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
        },
        formLabelWidth: '120px'
      };
    },
    methods: {
      async ForgetPa(forgetdata)
      {
        const { data }=await stuforgetpa(forgetdata)
        if(data.code===3010)
          this.ForgetPa2(forgetdata)
        else
        {
          if(data.code===200)
          {this.$message({
            showClose: true,
            message: data.message,
            type: 'success'
          });
          this.Close()}
          else this.$message({
            showClose: true,
            message: data.message,
            type: 'error'
          });
        }
      },
      async ForgetPa2(forgetdata)
      {
        const { data }=await teaforgetpa(forgetdata)
          if(data.code===200)
          {this.$message({
            showClose: true,
            message: data.message,
            type: 'success'
          });
          this.Close()}
          else this.$message({
            showClose: true,
            message: data.message,
            type: 'error'
          });
      },
      Submit(){
    this.ForgetPa(this.forgetData)
        // this.$refs['forgetForm'].resetFields()
      },
      Close () {
        this.dialogFormVisible = false;
        this.$refs['forgetForm'].resetFields()
        this.$emit("ChangedialogFormVisible");
      },
      }

  };
</script>


<style lang="less" scoped>
  .findPs{
    width: 800px;
    height: 1200px;
    position: center;
    padding-left: 370px;
    padding-top: 50px;

  }
  </style>
