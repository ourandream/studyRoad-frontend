<template>
  <el-dialog
    title="快速注册"
    :visible.sync="dialogFormVisible"
    class="registerUser"
    center
    @close="Close"
  >
    <el-form
      ref="registerForm"
      :model="registerData"
      :rules="rules"
      size="medium"
      label-width="100px"
    >
      <el-form-item label="学号" prop="userId">
        <el-input
          v-model="registerData.userId"
          placeholder="请输入学号"
          clearable
          prefix-icon="el-icon-postcard"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input
          v-model="registerData.userName"
          placeholder="请输入姓名"
          clearable
          prefix-icon="el-icon-s-custom"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="辅导员" prop="userTea">
        <el-input
          v-model="registerData.userTea"
          placeholder="请输入你的辅导员姓名"
          clearable
          prefix-icon="el-icon-user"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="userPhone">
        <el-input
          v-model="registerData.userPhone"
          placeholder="请输入你的电话号码"
          clearable
          prefix-icon="el-icon-phone"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input
          v-model="registerData.userEmail"
          placeholder="请输入你的邮箱"
          clearable
          prefix-icon="el-icon-message"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPs">
        <el-input
          v-model="registerData.userPs"
          placeholder="请设置你的账户密码"
          clearable
          prefix-icon="el-icon-lock"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="Close">取 消</el-button>
      <el-button type="primary" @click="Submit">快速注册</el-button>
    </div>
  </el-dialog>
</template>

<script>
import "../../assets/alert.js";
import { registerstu } from "../../api/Users";
export default {
  props: ["dialogFormVisible"],
  data() {
    return {
      registerData: {
        userId: undefined,
        userName: undefined,
        userTea: undefined,
        userPhone: undefined,
        userEmail: undefined,
        userPs: undefined,
      },
      rules: {
        userId: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        userTea: [
          {
            required: true,
            message: "请输入你的辅导员姓名",
            trigger: "blur",
          },
        ],
        userPhone: [
          {
            required: true,
            message: "请输入你的电话号码",
            trigger: "blur",
          },
        ],
        userEmail: [
          {
            required: true,
            message: "请输入你的邮箱",
            trigger: "blur",
          },
        ],
        userPs: [
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
      formLabelWidth: "120px",
    };
  },
  methods: {
    async RegisterStu(registerData) {
      const { data } = await registerstu(registerData);
      console.log(data);
      if (data.code === 200) {
        this.$message({
          message: "用户注册成功！",
          type: "success",
        });
        this.Close();
      } else
        this.$message({
          message: data.message,
          type: "error",
        });
    },
    Submit() {
      this.RegisterStu(this.registerData);
    },
    Close() {
      this.dialogFormVisible = false;
      this.$refs["registerForm"].resetFields();
      this.$emit("ChangedialogFormVisible2");
    },
  },
};
</script>

<style lang="less" scoped></style>
