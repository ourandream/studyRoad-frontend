<template>
  <div>
    <div>
      <el-breadcrumb
        separator="》"
        style="
          padding-left: 10px;
          padding-bottom: 1%;
          font-size: 15px;
          padding-top: 0.5%;
        "
      >
        <el-breadcrumb-item :to="{ path: '/TeaHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>学生列表</el-breadcrumb-item>
        <el-breadcrumb-item>学生添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-card>
        <div>
          <span style="padding-left: 90%"
            ><el-button type="primary" plain @click="goOff"
              >返回</el-button
            ></span
          >
        </div>
        <el-form
          ref="stuUseradd"
          :model="stuUseradd"
          :rules="rules"
          size="small"
          label-width="100px"
          style="width: 400px; padding-left: 33%"
        >
          <el-form-item label="学号" prop="num">
            <el-input
              v-model="stuUseradd.num"
              placeholder="请输入添加学生学号"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="stuUseradd.name"
              placeholder="请输入添加学生姓名"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="年级" prop="grade">
            <el-select
              v-model="stuUseradd.grade"
              placeholder="请输入选择学生年级"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in gradeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="班级" prop="class">
            <el-input
              v-model="stuUseradd.class"
              placeholder="请输入添加学生班级"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="专业" prop="major">
            <el-input
              v-model="stuUseradd.major"
              placeholder="请输入添加学生专业"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="宿舍" prop="dorm">
            <el-input
              v-model="stuUseradd.dorm"
              placeholder="请输入添加学生宿舍"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="辅导员" prop="teacher">
            <el-input
              v-model="stuUseradd.teacher"
              placeholder="请输入添加学生辅导员"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="辅导员电话" prop="teaphone">
            <el-input
              v-model="stuUseradd.teaphone"
              placeholder="请输入添加学生辅导员电话"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>

          <el-form-item label="学籍状态" prop="state">
            <el-select
              v-model="stuUseradd.state"
              placeholder="请选择添加学生学籍状态"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in stateOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item size="large" style="padding-top: 3%">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { teaaddStu } from "../../api/Users";
export default {
  name: "stuadd",
  data() {
    return {
      stuUseradd: {
        num: undefined,
        name: undefined,
        grade: undefined,
        class: undefined,
        major: undefined,
        dorm: undefined,
        teacher: undefined,
        teaphone: undefined,
        state: undefined,
      },
      rules: {
        num: [
          {
            required: true,
            message: "请输入添加学生学号",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入添加学生姓名",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择添加学生学籍状态",
            trigger: "change",
          },
        ],
      },
      gradeOptions: [
        {
          label: "2021级",
          value: 2021,
        },
        {
          label: "2020级",
          value: 2020,
        },
        {
          label: "2019级",
          value: 2019,
        },
        {
          label: "2018级",
          value: 2018,
        },
      ],
      stateOptions: [
        {
          label: "在读",
          value: 1,
        },
        {
          label: "休学",
          value: 2,
        },
        {
          label: "保留学籍",
          value: 3,
        },
        {
          label: "待审核",
          value: 4,
        },
      ],
    };
  },
  methods: {
    async addStu(stuadd) {
      const { data } = await teaaddStu(stuadd);
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: "success",
        });
        this.$refs["stuUseradd"].resetFields();
      } else
        this.$message({
          message: data.message,
          type: "error",
        });
    },
    submitForm() {
      this.$refs["stuUseradd"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.addStu(this.stuUseradd);
      });
    },
    resetForm() {
      this.$refs["stuUseradd"].resetFields();
    },
    goOff() {
      this.$router.push("/stuManage");
    },
  },
};
</script>

<style scoped></style>
