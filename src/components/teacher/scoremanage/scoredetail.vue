<template>
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
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="scopde">
      <!--      查询条件区-->
      <el-row :gutter="0">
        <el-form
          ref="scoreFind"
          :model="scoreFind"
          :rules="rules"
          size="mini"
          label-width="100px"
          style="text-align: left"
        >
          <el-col :span="6">
            <el-form-item label="年级" prop="grade">
              <el-select
                v-model="scoreFind.grade"
                placeholder="请选择学生年级"
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
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="scoreFind.name"
                placeholder="请输入学生姓名"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学年" prop="scyear">
              <el-select
                v-model="scoreFind.scyear"
                placeholder="请选择课程学年"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in scyearOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学期" prop="semester">
              <el-select
                v-model="scoreFind.semester"
                placeholder="请选择课程学期"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in semesterOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="课程" prop="coursename">
              <el-input
                v-model="scoreFind.coursename"
                placeholder="请输入课程名"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="课程性质" prop="coursenature">
              <el-select
                v-model="scoreFind.coursenature"
                placeholder="请选择课程性质"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in coursenatureOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item size="large" style="text-align: left">
              <el-button
                size="small"
                type="primary"
                @click="submitForm"
                icon="el-icon-search"
                >查询</el-button
              >
              <span style="margin-left: 10%">
                <el-button
                  size="small"
                  @click="resetForm"
                  type="success"
                  icon="el-icon-refresh"
                  >重置</el-button
                >
              </span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <!--表格-->
      <el-table
        :data="stuscore"
        border
        stripe
        size="mini"
        max-height="465px"
        style="width: 100%; height: 465px; text-align: center"
      >
        <el-table-column label="年级" sortable width="70">
          <template slot-scope="scope">
            <div>{{ scope.row.stugrade }}级</div>
          </template>
        </el-table-column>
        <el-table-column prop="stuname" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="stuid" label="学号" width="100">
        </el-table-column>
        <el-table-column prop="scyear" label="学年" width="120" sortable>
        </el-table-column>
        <el-table-column label="学期" sortable width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.semester === 1">第一学期</div>
            <div v-if="scope.row.semester === 2">第二学期</div>
          </template>
        </el-table-column>
        <el-table-column prop="course" label="课程"> </el-table-column>
        <el-table-column prop="courna" label="课程性质" width="70">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.courna === 1" size="mini">必修</el-tag>
            <el-tag v-if="scope.row.courna === 2" type="warning" size="mini"
              >选修</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="courid" label="课程代码" width="90">
        </el-table-column>
        <el-table-column prop="credit" label="学分" sortable width="90">
        </el-table-column>
        <el-table-column prop="mark" label="分数" sortable width="90">
        </el-table-column>
        <el-table-column prop="gpa" label="绩点" sortable width="90">
        </el-table-column>
        <el-table-column prop="tea" label="任课老师" width="100">
        </el-table-column>
        <el-table-column prop="cregpa" label="学分绩点" sortable width="100">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { teagetscorelist } from "../../../api/studies";
import { stuperList } from "@/api/taekeoffice";
export default {
  name: "scoredetail",
  data() {
    return {
      stuscore: undefined,
      //     stuscore:[
      //       {
      //         stuname:"李华",
      //         stuid:"201824215",
      //         stugrade:"2018级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"数据结构",
      //         courna:"必修",
      //         courid:"bi001",
      //         credit:3,
      //         mark:89,
      //         gpa:3.9,
      //         tea:'浴帘王子',
      //         cregpa:11.7,
      //       },
      //       {
      //         stuname:"苏建敏",
      //         stuid:"201924215",
      //         stugrade:"2019级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"编译原理",
      //         courna:"必修",
      //         courid:"bi002",
      //         credit:4,
      //         mark:81,
      //         gpa:3.1,
      //         tea:'浴帘王子',
      //         cregpa:12.4,
      //       },
      //       {
      //         stuname:"俊杰",
      //         stuid:"202124215",
      //         stugrade:"2021级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"计算机体系结构",
      //         courna:"选修",
      //         courid:"xuan001",
      //         credit:3,
      //         mark:98,
      //         gpa:4.8,
      //         tea:'牛逼王子',
      //         cregpa:14.4,
      //       },
      //       {
      //         stuname:"明华",
      //         stuid:"202024215",
      //         stugrade:"2020级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"计算机网络",
      //         courna:"必修",
      //         courid:"bi005",
      //         credit:2,
      //         mark:80,
      //         gpa:3.0,
      //         tea:'唐华',
      //         cregpa:6.0,
      //       },
      //       {
      //         stuname:"李华",
      //         stuid:"201824215",
      //         stugrade:"2018级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"数据结构",
      //         courna:"必修",
      //         courid:"bi001",
      //         credit:3,
      //         mark:89,
      //         gpa:3.9,
      //         tea:'浴帘王子',
      //         cregpa:11.7,
      //       },
      //       {
      //         stuname:"苏建",
      //         stuid:"201924215",
      //         stugrade:"2019级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"编译原理",
      //         courna:"必修",
      //         courid:"bi002",
      //         credit:4,
      //         mark:81,
      //         gpa:3.1,
      //         tea:'浴帘王子',
      //         cregpa:12.4,
      //       },
      //       {
      //         stuname:"俊杰",
      //         stuid:"202124215",
      //         stugrade:"2021级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"计算机体系结构",
      //         courna:"选修",
      //         courid:"xuan001",
      //         credit:3,
      //         mark:98,
      //         gpa:4.8,
      //         tea:'牛逼王子',
      //         cregpa:14.4,
      //       },
      //       {
      //         stuname:"明华",
      //         stuid:"202024215",
      //         stugrade:"2020级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"计算机网络",
      //         courna:"必修",
      //         courid:"bi005",
      //         credit:2,
      //         mark:80,
      //         gpa:3.0,
      //         tea:'唐华',
      //         cregpa:6.0,
      //       },
      //       {
      //         stuname:"李华",
      //         stuid:"201824215",
      //         stugrade:"2018级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"数据结构",
      //         courna:"必修",
      //         courid:"bi001",
      //         credit:3,
      //         mark:89,
      //         gpa:3.9,
      //         tea:'浴帘王子',
      //         cregpa:11.7,
      //       },
      //       {
      //         stuname:"苏建",
      //         stuid:"201924215",
      //         stugrade:"2019级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"编译原理",
      //         courna:"必修",
      //         courid:"bi002",
      //         credit:4,
      //         mark:81,
      //         gpa:3.1,
      //         tea:'浴帘王子',
      //         cregpa:12.4,
      //       },
      //       {
      //         stuname:"俊杰",
      //         stuid:"202124215",
      //         stugrade:"2021级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"计算机体系结构",
      //         courna:"选修",
      //         courid:"xuan001",
      //         credit:3,
      //         mark:98,
      //         gpa:4.8,
      //         tea:'牛逼王子',
      //         cregpa:14.4,
      //       },
      //       {
      //         stuname:"明华",
      //         stuid:"202024215",
      //         stugrade:"2020级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"计算机网络",
      //         courna:"必修",
      //         courid:"bi005",
      //         credit:2,
      //         mark:80,
      //         gpa:3.0,
      //         tea:'唐华',
      //         cregpa:6.0,
      //       },
      //       {
      //         stuname:"李华",
      //         stuid:"201824215",
      //         stugrade:"2018级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"数据结构",
      //         courna:"必修",
      //         courid:"bi001",
      //         credit:3,
      //         mark:89,
      //         gpa:3.9,
      //         tea:'浴帘王子',
      //         cregpa:11.7,
      //       },
      //       {
      //         stuname:"苏建",
      //         stuid:"201924215",
      //         stugrade:"2019级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"编译原理",
      //         courna:"必修",
      //         courid:"bi002",
      //         credit:4,
      //         mark:81,
      //         gpa:3.1,
      //         tea:'浴帘王子',
      //         cregpa:12.4,
      //       },
      //       {
      //         stuname:"俊杰",
      //         stuid:"202124215",
      //         stugrade:"2021级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"计算机体系结构",
      //         courna:"选修",
      //         courid:"xuan001",
      //         credit:3,
      //         mark:98,
      //         gpa:4.8,
      //         tea:'牛逼王子',
      //         cregpa:14.4,
      //       },
      //       {
      //         stuname:"明华",
      //         stuid:"202024215",
      //         stugrade:"2020级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"计算机网络",
      //         courna:"必修",
      //         courid:"bi005",
      //         credit:2,
      //         mark:80,
      //         gpa:3.0,
      //         tea:'唐华',
      //         cregpa:6.0,
      //       },
      //       {
      //         stuname:"李华",
      //         stuid:"201824215",
      //         stugrade:"2018级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"数据结构",
      //         courna:"必修",
      //         courid:"bi001",
      //         credit:3,
      //         mark:89,
      //         gpa:3.9,
      //         tea:'浴帘王子',
      //         cregpa:11.7,
      //       },
      //       {
      //         stuname:"苏建",
      //         stuid:"201924215",
      //         stugrade:"2019级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"编译原理",
      //         courna:"必修",
      //         courid:"bi002",
      //         credit:4,
      //         mark:81,
      //         gpa:3.1,
      //         tea:'浴帘王子',
      //         cregpa:12.4,
      //       },
      //       {
      //         stuname:"俊杰",
      //         stuid:"202124215",
      //         stugrade:"2021级",
      //         scyear:'2021~2022学年',
      //         semester:'第一学期',
      //         course:"计算机体系结构",
      //         courna:"选修",
      //         courid:"xuan001",
      //         credit:3,
      //         mark:98,
      //         gpa:4.8,
      //         tea:'牛逼王子',
      //         cregpa:14.4,
      //       },
      //       {
      //         stuname:"明华",
      //         stuid:"202024215",
      //         stugrade:"2020级",
      //         scyear:'2020~2021学年',
      //         semester:'第二学期',
      //         course:"计算机网络",
      //         courna:"必修",
      //         courid:"bi005",
      //         credit:2,
      //         mark:80,
      //         gpa:3.0,
      //         tea:'唐华',
      //         cregpa:6.0,
      //       }
      // ],
      scoreFind: {
        grade: 0,
        name: undefined,
        scyear: "全部",
        semester: 0,
        coursename: undefined,
        coursenature: 0,
      },
      rules: {
        grade: [],
        name: [],
        scyear: [],
        semester: [],
        coursename: [],
        coursenature: [],
      },
      gradeOptions: [
        {
          label: "全部",
          value: 0,
        },
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
      scyearOptions: [
        {
          label: "全部",
          value: "全部",
        },
        {
          label: "2021~2022学年",
          value: "2021~2022学年",
        },
        {
          label: "2020~2021学年",
          value: "2020~2021学年",
        },
        {
          label: "2019~2020学年",
          value: "2019~2020学年",
        },
        {
          label: "2018~2019学年",
          value: "2018~2019学年",
        },
      ],
      semesterOptions: [
        {
          label: "全部",
          value: 0,
        },
        {
          label: "第一学期",
          value: 1,
        },
        {
          label: "第二学期",
          value: 2,
        },
      ],
      coursenatureOptions: [
        {
          label: "全部",
          value: 0,
        },
        {
          label: "必修",
          value: 1,
        },
        {
          label: "选修",
          value: 2,
        },
      ],
    };
  },
  created() {
    this.GetScoreList(this.scoreFind);
  },
  methods: {
    async GetScoreList(scoreFind) {
      const { data } = await teagetscorelist(scoreFind);
      if (data.code === 200) {
        this.stuscore = data.data.stuscore;
      } else
        this.$message({
          message: data.message,
          type: "error",
        });
    },
    submitForm() {
      this.$refs["scoreFind"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.GetScoreList(this.scoreFind);
      });
    },
    resetForm() {
      this.$refs["scoreFind"].resetFields();
    },
  },
};
</script>

<style>
.scopde {
  height: 100%;
  background: #fcfcfc url("../../../assets/bac/scorede.png") no-repeat top
    right/ 25% auto;
}
</style>
