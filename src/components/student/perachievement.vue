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
      <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学业表现</el-breadcrumb-item>
      <el-breadcrumb-item>个人成绩</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="height: 100%">
      <!--      查询条件区-->
      <el-container>
        <el-container>
          <el-row :gutter="0">
            <el-form
              ref="gradeFind"
              :model="gradeFind"
              :rules="rules"
              size="mini"
              label-width="100px"
            >
              <el-row>
                <el-col :span="7">
                  <el-form-item label-width="110px" label="学年" prop="scyear">
                    <el-select
                      v-model="gradeFind.scyear"
                      placeholder="请选择成绩查询学年"
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
                <el-col :span="7">
                  <el-form-item
                    label-width="110px"
                    label="学期"
                    prop="semester"
                  >
                    <el-select
                      v-model="gradeFind.semester"
                      placeholder="请选择成绩查询学期"
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
                <el-col :span="7">
                  <el-form-item label="课程" prop="cour">
                    <el-input
                      v-model="gradeFind.cour"
                      placeholder="请输入成绩查询课程"
                      clearable
                      prefix-icon="el-icon-edit-outline"
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="7">
                  <el-form-item label="课程性质" prop="courna">
                    <el-select
                      v-model="gradeFind.courna"
                      placeholder="请选择课程性质"
                      clearable
                      :style="{ width: '100%' }"
                    >
                      <el-option
                        v-for="(item, index) in cournaOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
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
              </el-row>
            </el-form>
          </el-row>
        </el-container>
        <el-container>
          <img
            src="../../assets/bac/achievement.png"
            style="height: 120px; width: 120px"
          />
        </el-container>
        <el-container>
          <el-descriptions
            size="medium"
            border
            direction="vertical"
            style="margin-left: 10%"
          >
            <el-descriptions-item
              label="综合绩点"
              label-class-name="my-label"
              content-class-name="my-content"
              >{{ Point }}</el-descriptions-item
            >
          </el-descriptions>
        </el-container>
      </el-container>
      <!--表格-->
      <el-table
        :data="pergrade"
        border
        stripe
        size="small"
        max-height="450px"
        style="width: 100%; height: 450px; text-align: center"
      >
        <el-table-column prop="scyear" label="学年" width="120" sortable>
        </el-table-column>
        <el-table-column label="学期" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.semester === 1">第一学期</div>
            <div v-if="scope.row.semester === 2">第二学期</div>
          </template>
        </el-table-column>
        <el-table-column prop="course" label="课程"> </el-table-column>
        <el-table-column prop="courna" label="课程性质" width="70">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.courna === '必修'" size="mini">必修</el-tag>
            <el-tag
              v-if="scope.row.courna === '选修'"
              type="warning"
              size="mini"
              >选修</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="courid" label="课程代码" width="120">
        </el-table-column>
        <el-table-column prop="credit" label="学分" sortable width="120">
        </el-table-column>
        <el-table-column prop="mark" label="分数" sortable width="120">
        </el-table-column>
        <el-table-column prop="gpa" label="绩点" sortable width="120">
        </el-table-column>
        <el-table-column prop="tea" label="任课老师" width="120">
        </el-table-column>
        <el-table-column prop="cregpa" label="学分绩点" sortable width="120">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { stugetscorelist } from "../../api/studies";

export default {
  name: "perachievement",
  data() {
    return {
      Point: undefined,
      pergrade: undefined,
      // pergrade:[
      //   {
      //     scyear:'2021~2022学年',
      //     semester:'第一学期',
      //     course:"数据结构",
      //     courna:"必修",
      //     courid:"bi001",
      //     credit:3,
      //     mark:89,
      //     gpa:3.9,
      //     tea:'浴帘王子',
      //     cregpa:11.7,
      //   },
      //   {
      //     scyear:'2021~2022学年',
      //     semester:'第一学期',
      //     course:"数据结构",
      //     courna:"必修",
      //     courid:"bi001",
      //     credit:3,
      //     mark:89,
      //     gpa:3.9,
      //     tea:'浴帘王子',
      //     cregpa:11.7,
      //   },
      //   {
      //     scyear:'2021~2022学年',
      //     semester:'第一学期',
      //     course:"数据结构",
      //     courna:"必修",
      //     courid:"bi001",
      //     credit:3,
      //     mark:89,
      //     gpa:3.9,
      //     tea:'浴帘王子',
      //     cregpa:11.7,
      //   },
      //   {
      //     scyear:'2021~2022学年',
      //     semester:'第一学期',
      //     course:"数据结构",
      //     courna:"必修",
      //     courid:"bi001",
      //     credit:3,
      //     mark:89,
      //     gpa:3.9,
      //     tea:'浴帘王子',
      //     cregpa:11.7,
      //   },{
      //     scyear:'2021~2022学年',
      //     semester:'第一学期',
      //     course:"数据结构",
      //     courna:"必修",
      //     courid:"bi001",
      //     credit:3,
      //     mark:89,
      //     gpa:3.9,
      //     tea:'浴帘王子',
      //     cregpa:11.7,
      //   },
      //   {
      //     scyear:'2021~2022学年',
      //     semester:'第一学期',
      //     course:"数据结构",
      //     courna:"必修",
      //     courid:"bi001",
      //     credit:3,
      //     mark:89,
      //     gpa:3.9,
      //     tea:'浴帘王子',
      //     cregpa:11.7,
      //   },
      //   {
      //     scyear:'2021~2022学年',
      //     semester:'第一学期',
      //     course:"数据结构",
      //     courna:"必修",
      //     courid:"bi001",
      //     credit:3,
      //     mark:89,
      //     gpa:3.9,
      //     tea:'浴帘王子',
      //     cregpa:11.7,
      //   },
      //   {
      //     scyear:'2021~2022学年',
      //     semester:'第一学期',
      //     course:"数据结构",
      //     courna:"必修",
      //     courid:"bi001",
      //     credit:3,
      //     mark:89,
      //     gpa:3.9,
      //     tea:'浴帘王子',
      //     cregpa:11.7,
      //   },
      //
      //   {
      //     scyear:'2021~2022学年',
      //     semester:'第一学期',
      //     course:"数据结构",
      //     courna:"必修",
      //     courid:"bi001",
      //     credit:3,
      //     mark:89,
      //     gpa:3.9,
      //     tea:'浴帘王子',
      //     cregpa:11.7,
      //   },
      //   {
      //     scyear:'2020~2021学年',
      //     semester:'第二学期',
      //     course:"编译原理",
      //     courna:"必修",
      //     courid:"bi002",
      //     credit:4,
      //     mark:81,
      //     gpa:3.1,
      //     tea:'浴帘王子',
      //     cregpa:12.4,
      //   },
      //   {
      //     scyear:'2019~2020学年',
      //     semester:'第一学期',
      //     course:"计算机体系结构",
      //     courna:"选修",
      //     courid:"xuan001",
      //     credit:3,
      //     mark:98,
      //     gpa:4.8,
      //     tea:'牛逼王子',
      //     cregpa:14.4,
      //   },
      //   {
      //     scyear:'2018~2019学年',
      //     semester:'第二学期',
      //     course:"计算机网络",
      //     courna:"必修",
      //     courid:"bi005",
      //     credit:2,
      //     mark:80,
      //     gpa:3.0,
      //     tea:'唐华',
      //     cregpa:6.0,
      //   }
      // ],
      gradeFind: {
        scyear: "全部",
        semester: 0,
        cour: "",
        courna: 0,
      },
      rules: {
        scyear: [],
        semester: [],
        cour: [],
        courna: [],
      },
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
      cournaOptions: [
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
    this.getscorelist();
  },
  methods: {
    async getscorelist() {
      const { data } = await stugetscorelist(
        this.$session.get("user").stunum,
        this.gradeFind
      );
      console.log(data);
      this.pergrade = data.data.pergrade;
      this.Point = data.data.Point.toFixed(2);
    },
    submitForm() {
      this.$refs["gradeFind"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.getscorelist();
      });
    },
    resetForm() {
      this.$refs["gradeFind"].resetFields();
    },
  },
};
</script>

<style>
.my-label {
  background-color: burlywood;
}

.my-content {
  background: #fde2e2;
}
</style>
