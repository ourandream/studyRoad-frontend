<template>
  <el-dialog
    title="基本信息修改"
    :visible.sync="dialogFormVisible"
    class="modifyinfo"
    center
    @close="Close"
  >
    <el-row :gutter="15">
      <el-form ref="Student" :model="stu" size="small" label-width="80px">
        <el-col :span="12">
          <el-form-item label="学号" prop="number">
            <el-input
              v-model="stu.number"
              placeholder="请输入学号"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="stu.name"
              placeholder="请输入姓名"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="stu.sex" size="medium">
              <el-radio
                v-for="(item, index) in sexOptions"
                :key="index"
                :label="item.value"
                :disabled="item.disabled"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年级" prop="grade">
            <el-input
              v-model="stu.grade"
              placeholder="请输入年级"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="班级" prop="class">
            <el-input
              v-model="stu.class"
              placeholder="请输入班级"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业" prop="major">
            <el-input
              v-model="stu.major"
              placeholder="请输入专业"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宿舍" prop="dorm">
            <el-input
              v-model="stu.dorm"
              placeholder="请输入宿舍"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idcard">
            <el-input
              v-model="stu.idcard"
              placeholder="请输入身份证号"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="民族" prop="nation">
            <el-input
              v-model="stu.nation"
              placeholder="请输入民族"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker
              v-model="stu.birthDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '100%' }"
              placeholder="请选择出生日期"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="naPlace">
            <el-input
              v-model="stu.naPlace"
              placeholder="请输入籍贯"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="政治面貌" prop="poLook">
            <el-input
              v-model="stu.poLook"
              placeholder="请输入政治面貌"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input
              v-model="stu.phone"
              placeholder="请输入电话"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="stu.email"
              placeholder="请输入邮箱"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信" prop="wechat">
            <el-input
              v-model="stu.wechat"
              placeholder="请输入微信"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="辅导员" prop="teacher">
            <el-input
              v-model="stu.teacher"
              placeholder="请输入辅导员"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="教师电话" prop="teaphone">
            <el-input
              v-model="stu.teaphone"
              placeholder="请输入辅导员电话"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学籍状态" prop="state">
            <el-input
              v-model="stu.state"
              placeholder="请输入学籍状态"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <span style="padding-left: 37%"
              ><el-button type="primary" @click="submit"
                >提交保存</el-button
              ></span
            >
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
import { changeStuinfo } from "../../api/Users";

export default {
  name: "modifyinfo",
  props: ["dialogFormVisible", "Student", "getinfo"],
  data() {
    return {
      stu: {
        number: undefined,
        name: undefined,
        sex: undefined,
        grade: undefined,
        class: undefined,
        major: undefined,
        dorm: undefined,
        idcard: undefined,
        nation: undefined,
        naPlace: undefined,
        poLook: undefined,
        birthDate: undefined,
        phone: undefined,
        email: undefined,
        wechat: undefined,
        teacher: undefined,
        teaphone: undefined,
        state: undefined,
      },

      sexOptions: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 2,
        },
      ],
    };
  },
  created() {
    this.stu.number = this.$session.get("user").stunum;
    this.stu.name = this.$session.get("user").stuname;
    this.stu.grade = this.$session.get("user").stugrade + "级";
    this.stu.idcard = this.$session.get("user").stuidcard;
    this.stu.class = this.$session.get("user").stuclass;
    this.stu.major = this.$session.get("user").stumajor;
    this.stu.sex = this.$session.get("user").stusex;
    this.stu.dorm = this.$session.get("user").studormitory;
    this.stu.nation = this.$session.get("user").stunation;
    this.stu.naPlace = this.$session.get("user").stunativeplace;
    this.stu.poLook = this.$session.get("user").stupoliticaloutlook;
    this.stu.birthDate = this.$session.get("user").stubirthdate;
    this.stu.phone = this.$session.get("user").stuphone;
    this.stu.email = this.$session.get("user").stuemail;
    this.stu.wechat = this.$session.get("user").stuwechat;
    this.stu.teacher = this.$session.get("user").stuinstructor;
    this.stu.teaphone = this.$session.get("user").stuinstructorphone;
    if (this.$session.get("user").stustate === 1) this.stu.state = "在读";
    if (this.$session.get("user").stustate === 2) this.stu.state = "休学";
    if (this.$session.get("user").stustate === 3) this.stu.state = "保留学籍";
    if (this.$session.get("user").stustate === 4) this.stu.state = "待审核";
  },
  methods: {
    async channgeinfo(student) {
      const { data } = await changeStuinfo(student);
      console.log(data);
    },
    submit() {
      this.channgeinfo(this.stu);
      var user = this.$session.get("user");
      user.stusex = this.stu.sex;
      user.stuidcard = this.stu.idcard;
      user.stunation = this.stu.nation;
      user.stunativeplace = this.stu.naPlace;
      user.stubirthdate = this.stu.birthDate;
      user.stupoliticaloutlook = this.stu.poLook;
      user.stuphone = this.stu.phone;
      user.stuemail = this.stu.email;
      user.stuwechat = this.stu.wechat;
      this.$session.set("user", user);
      this.Close();
      this.$emit("getinfo");
      this.$message({
        message: "信息修改成功！",
        type: "success",
      });
    },
    Close() {
      this.dialogFormVisible = false;
      this.$emit("ChangedialogstuFormVisible");
    },
  },
};
</script>
<style></style>
