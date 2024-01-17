<template>
  <div style="height: 100%; width: 100%">
    <div class="bg-blur"></div>
    <div class="head_box">
      <h1>学路系统</h1>
    </div>
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../../assets/huashi.jpg" />
      </div>
      <h3 style="padding-left: 190px; padding-top: 65px">用户登录</h3>
      <div>
        <el-form
          ref="elForm"
          :model="Users"
          :rules="rules"
          size="medium"
          label-width="50px"
          style="padding-right: 50px; padding-top: 10px"
        >
          <el-form-item label="" prop="id">
            <el-input
              v-model="Users.id"
              placeholder="请输入账号"
              clearable
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="Users.password"
              placeholder="请输入密码"
              clearable
              show-password
              prefix-icon="el-icon-lock"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
          <el-form-item size="large" style="padding-left: 90px">
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm" style="margin-left: 20px"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <div style="padding-left: 300px">
          <el-link
            target="_blank"
            :underline="false"
            style="padding-right: 20px"
            @click="forgetps"
            >忘记密码?</el-link
          >
          <el-link target="_blank" :underline="false" @click="register"
            >快速注册</el-link
          >
        </div>
      </div>
    </div>
    <ForgetPs
      :dialogFormVisible="this.dialogFormVisible"
      @ChangedialogFormVisible="ChangedialogFormVisible"
    ></ForgetPs>
    <Register
      :dialogFormVisible="this.dialogFormVisible2"
      @ChangedialogFormVisible2="ChangedialogFormVisible2"
    ></Register>

    <!--    <el-dialog-->
    <!--      title=提示-->
    <!--      :visible.sync="dialogVisible2"-->
    <!--      width="30%"-->
    <!--      center>-->
    <!--      <span>{{msg}}</span>-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>-->
    <!--  </span>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
import { Findbooks } from "@/api/test";
import { Findstudent } from "@/api/Users";
import { Findteacher } from "@/api/Users";

import ForgetPs from "../../components/login/forget.vue";
import "../../assets/alert.js";
import Register from "../../components/login/register";

export default {
  name: "Login",

  components: {
    ForgetPs,
    Register,
  },
  data() {
    return {
      userdata: {
        stu: {
          id: "20182131130",
          password: "@lihao520123",
        },
        tea: {
          id: "2010523",
          password: "@Li12345",
        },
      },
      dialogVisible2: false,
      dialogFormVisible2: false,
      msg: " ",
      Users: {
        id: "",
        password: "",
      },
      dialogFormVisible: false,
      rules: {
        id: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            transform: (value) => value,
            trigger: "blur",
          },
          {
            type: "string",
            message: "请输入不包含空格的字符",
            trigger: "blur",
            transform(value) {
              if (value && value.indexOf(" ") === -1) {
                return value;
              } else {
                return false;
              }
            },
          },
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              var passwordreg =
                /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,16}/;
              if (!passwordreg.test(value)) {
                callback(
                  new Error("密码必须由数字、字母、特殊字符组合,请输入6-16位")
                );
              } else {
                callback();
              }
            },
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    async verification(user) {
      const { data } = await Findstudent(user);
      const studata = data;
      console.log(studata.code);
      if (studata.code === 200) {
        // console.log(studata.data)
        // console.log(studata.data.student.stupassword)
        if (user.password === studata.data.student.stupassword) {
          this.$message({
            message: "登录成功！",
            type: "success",
          });
          this.$session.set("user", studata.data.student);
          this.$session.set("login", 1);
          this.$router.push("/StuHome");
        } else {
          this.$message({
            message: "密码有误！",
            type: "error",
          });
        }
      }
      if (studata.code === 3010) {
        const { data } = await Findteacher(user);
        const teadata = data;
        console.log(teadata);
        if (teadata.code === 200) {
          if (user.password === teadata.data.teacher.teapassword) {
            this.$message({
              message: "登录成功！",
              type: "success",
            });
            this.$session.set("user", teadata.data.teacher);
            this.$session.set("login", 1);
            this.$router.push("/TeaHome");
          } else {
            this.$message({
              message: "密码有误！",
              type: "error",
            });
          }
        }
        if (teadata.code === 3010) {
          this.$message({
            message: "该账户不存在！",
            type: "error",
          });
        }
      }
    },
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        this.verification(this.Users);
        // TODO 提交表单
        // if(this.Users.id===this.userdata.stu.id && this.Users.password===this.userdata.stu.password)
        // {        this.$message({
        //   message: '登录成功！',
        //   type: 'success'
        // });
        // this.$session.set("power",1);
        //   this.$router.push('/StuHome');}
        // else  if(this.Users.id===this.userdata.tea.id && this.Users.password===this.userdata.tea.password)
        // {        this.$message({
        //   message: '登录成功！',
        //   type: 'success'
        // });
        //
        //   this.$router.push('/TeaHome');}
        // else   this.$message.error('登录失败！账户或密码错误！');
      });
    },
    async test(user) {
      const { data } = await Findstudent(user);
      if (data.code === 200) console.log(data.code);
      else console.log(data);
    },

    resetForm() {
      this.$refs["elForm"].resetFields();

      // this.Users={
      //   id: "",
      //   password:"",
      // }
      // console.log(this.Users);
      // this.test(this.Users)
    },
    forgetps() {
      this.dialogFormVisible = true;
    },
    register() {
      this.dialogFormVisible2 = true;
    },
    ChangedialogFormVisible() {
      this.dialogFormVisible = false;
    },
    ChangedialogFormVisible2() {
      this.dialogFormVisible2 = false;
    },
    Success() {
      this.dialogVisible2 = true;
      this.msg = "密码修改成功！";
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.bg-blur {
  background: url("../../assets/LoginBg.jpg");
  height: 100%;
  width: 100%;
  float: left;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(19px);
}
.head_box {
  position: absolute;
  color: #fff;
  left: 50%;
  transform: translateX(-50%);
  top: 30px;
}
.login_box {
  width: 450px;
  height: 380px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: -65px auto;
    background-color: #ffffff;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eeeeee;
  position: center;
}
</style>
