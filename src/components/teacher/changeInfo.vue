<template>
  <el-dialog
    title="基本信息修改"
    :visible.sync="dialogFormVisible"
    class="changeInfo"
    center
    @close="Close"
  >
    <el-row :gutter="15">
      <el-form
        ref="teaUser"
        :model="tea"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-col :span="11">
          <el-form-item label="工号" prop="id">
            <el-input
              v-model="tea.id"
              placeholder="请输入工号"
              readonly
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="tea.name"
              placeholder="请输入姓名"
              :disabled="true"
              clearable
              prefix-icon="el-icon-s-help"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="tea.sex" size="medium">
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
        <el-col :span="11">
          <el-form-item label="民族" prop="nation">
            <el-input
              v-model="tea.nation"
              placeholder="请输入民族"
              clearable
              prefix-icon="el-icon-lock"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="籍贯" prop="naPlace">
            <el-input
              v-model="tea.naPlace"
              placeholder="请输入籍贯"
              clearable
              prefix-icon="el-icon-lock"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="政治面貌" prop="poLook">
            <el-input
              v-model="tea.poLook"
              placeholder="请输入政治面貌"
              clearable
              prefix-icon="el-icon-lock"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="身份证号" prop="idCard">
            <el-input
              v-model="tea.idCard"
              placeholder="请输入身份证号"
              clearable
              prefix-icon="el-icon-lock"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker
              v-model="tea.birthDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :style="{ width: '100%' }"
              placeholder="请选择出生日期"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="电话" prop="phone">
            <el-input
              v-model="tea.phone"
              placeholder="请输入电话"
              clearable
              prefix-icon="el-icon-lock"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="tea.email"
              placeholder="请输入邮箱"
              clearable
              prefix-icon="el-icon-lock"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="微信号" prop="wechat">
            <el-input
              v-model="tea.wechat"
              placeholder="请输入微信号"
              clearable
              prefix-icon="el-icon-lock"
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20" style="text-align: center">
          <el-form-item size="large">
            <el-button type="primary" @click="submit">提交保存</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
import { changeTeainfo } from "../../api/Users";

export default {
  name: "changeInfo",
  props: ["dialogFormVisible", "teaUser", "getinfo"],
  data() {
    return {
      tea: {
        id: undefined,
        name: undefined,
        sex: undefined,
        idCard: undefined,
        nation: undefined,
        naPlace: undefined,
        poLook: undefined,
        birthDate: undefined,
        phone: undefined,
        email: undefined,
        wechat: undefined,
      },
      rules: {
        id: [
          {
            required: true,
            message: "请输入您的账号",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
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
    this.tea.id = this.$session.get("user").teanum;
    this.tea.name = this.$session.get("user").teaname;
    this.tea.sex = this.$session.get("user").teasex;
    this.tea.nation = this.$session.get("user").teanation;
    this.tea.idCard = this.$session.get("user").teaidcard;
    this.tea.naPlace = this.$session.get("user").teanativeplace;
    this.tea.poLook = this.$session.get("user").teapoliticaloutlook;
    this.tea.birthDate = this.$session.get("user").teabirthdate;
    this.tea.phone = this.$session.get("user").teaphone;
    this.tea.email = this.$session.get("user").teaemail;
    this.tea.wechat = this.$session.get("user").teawechat;
  },
  methods: {
    async channgeinfo(teacher) {
      const { data } = await changeTeainfo(teacher);
      console.log(data);
      if (data.code === 200) {
        var user = this.$session.get("user");
        user.teasex = this.tea.sex;
        user.teaidcard = this.tea.idCard;
        user.teanation = this.tea.nation;
        user.teanativeplace = this.tea.naPlace;
        user.teabirthdate = this.tea.birthDate;
        user.teapoliticaloutlook = this.tea.poLook;
        user.teaphone = this.tea.phone;
        user.teaemail = this.tea.email;
        user.teawechat = this.tea.wechat;
        this.$session.set("user", user);
        this.Close();
        this.$emit("getinfo");
        this.$message({
          message: "信息修改成功！",
          type: "success",
        });
      } else {
        this.$message({
          message: "信息修改失败！",
          type: "error",
        });
      }
    },
    submit() {
      this.channgeinfo(this.tea);
    },
    Close() {
      this.dialogFormVisible = false;
      this.$emit("ChangedialogFormVisible");
    },
  },
};
</script>

<style scoped></style>
