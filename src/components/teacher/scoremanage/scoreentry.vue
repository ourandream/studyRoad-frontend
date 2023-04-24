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
        <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
        <el-breadcrumb-item>成绩录入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-container>
        <el-container>
          <el-card style="width: 500px; height: 610px">
            <h4>学生列表</h4>
            <el-row :gutter="0">
              <el-form
                ref="scoreStu"
                :model="scoreStu"
                size="mini"
                label-width="50px"
              >
                <el-col :span="12">
                  <el-form-item label="学号" prop="number">
                    <el-input
                      v-model="scoreStu.number"
                      placeholder="请输入学号"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item label="年级" prop="grade">
                    <el-select
                      v-model="scoreStu.stugrade"
                      placeholder="请选择年级"
                      clearable
                      :style="{ width: '100%' }"
                    >
                      <el-option
                        v-for="(item, index) in graOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="scoreStu.stuname"
                      placeholder="请输入姓名"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item size="large">
                    <el-button
                      size="mini"
                      type="primary"
                      @click="searchstu"
                      icon="el-icon-search"
                    ></el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <el-table
              :data="stu"
              border
              stripe
              @row-click="openDetails"
              size="mini"
              height="400"
              style="width: 100%; text-align: center"
            >
              <el-table-column prop="num" label="学号" width="110">
              </el-table-column>
              <el-table-column prop="grade" label="年级" sortable width="110">
              </el-table-column>
              <el-table-column prop="name" label="姓名"> </el-table-column>
            </el-table>
          </el-card>
        </el-container>
        <el-container style="width: 50vw">
          <el-card class="scoreForm">
            <h4>课程成绩录入</h4>
            <el-row :gutter="0">
              <el-form
                ref="scoreform"
                :model="scoreform"
                :rules="rules"
                size="small"
                label-width="100px"
                style="padding-left: 10%"
              >
                <el-col :span="24">
                  <el-form-item
                    label="姓名"
                    prop="name"
                    style="padding-top: 1%"
                  >
                    <el-input
                      v-model="scoreform.name"
                      placeholder="请输入学生姓名"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学号" prop="num" style="padding-top: 1%">
                    <el-input
                      v-model="scoreform.num"
                      placeholder="请输入学生学号"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="年级"
                    prop="grade"
                    style="padding-top: 1%"
                  >
                    <el-input
                      v-model="scoreform.grade"
                      placeholder="请输入学生年级"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="学年"
                    prop="scyear"
                    style="padding-top: 1%"
                  >
                    <el-select
                      v-model="scoreform.scyear"
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
                <el-col :span="12">
                  <el-form-item
                    label="学期"
                    prop="semester"
                    style="padding-top: 1%"
                  >
                    <el-select
                      v-model="scoreform.semester"
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
                <el-col :span="12">
                  <el-form-item
                    label="课程"
                    prop="coursename"
                    style="padding-top: 1%"
                  >
                    <el-input
                      v-model="scoreform.coursename"
                      placeholder="请输入课程名"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="任课老师"
                    prop="coursetea"
                    style="padding-top: 1%"
                  >
                    <el-input
                      v-model="scoreform.coursetea"
                      placeholder="请输入任课老师名"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="课程性质"
                    prop="coursenature"
                    style="padding-top: 1%"
                  >
                    <el-select
                      v-model="scoreform.coursenature"
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
                  <el-form-item
                    label="课程代码"
                    prop="courseid"
                    style="padding-top: 1%"
                  >
                    <el-input
                      v-model="scoreform.courseid"
                      placeholder="请输入课程代码"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="学分"
                    prop="credit"
                    style="padding-top: 1%"
                  >
                    <el-input
                      v-model="scoreform.credit"
                      placeholder="请输入课程学分"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="成绩"
                    prop="score"
                    style="padding-top: 1%"
                  >
                    <el-input
                      v-model="scoreform.score"
                      placeholder="请输入课程成绩"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="绩点"
                    prop="point"
                    style="padding-top: 1%"
                  >
                    <el-input
                      v-model="scoreform.point"
                      placeholder="请输入课程绩点"
                      clearable
                      :style="{ width: '100%' }"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="学分绩点"
                    prop="creditpoint"
                    style="padding-top: 1%"
                  >
                    <el-input
                      v-model="scoreform.creditpoint"
                      placeholder="请输入学分绩点"
                      clearable
                      :style="{ width: '100%' }"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item size="large" style="padding-top: 1%">
                    <span style="padding-right: 10%"
                      ><el-button type="primary" @click="submitForm"
                        >提交</el-button
                      >
                    </span>
                    <el-button @click="resetForm">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </el-card>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { getstulist } from "../../../api/Users";
import { setscore } from "../../../api/studies";
export default {
  name: "scoreentry",
  data() {
    return {
      scoreStu: {
        number: "",
        stuname: "",
        stugrade: 2018,
      },
      stu: undefined,
      // stu: [
      //   {
      //     num: '202152414',
      //     name: '徐强',
      //     grade:'2021级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202158714',
      //     name: '张伟',
      //     grade:'2020级',
      //     experience:''
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      //   {
      //     num: '202152544',
      //     name: '胡兰',
      //     grade:'2019级',
      //     experience:'学习委员  党支部书记'
      //   },
      // ],

      scoreform: {
        name: undefined,
        num: undefined,
        grade: undefined,
        scyear: undefined,
        semester: undefined,
        coursename: undefined,
        coursenature: 1,
        courseid: undefined,
        credit: undefined,
        score: undefined,
        point: undefined,
        creditpoint: undefined,
        coursetea: undefined,
      },
      rules: {
        coursetea: [
          {
            required: true,
            message: "请输入任课老师名",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入学生姓名",
            trigger: "blur",
          },
        ],
        num: [
          {
            required: true,
            message: "请输入学生学号",
            trigger: "blur",
          },
        ],
        grade: [
          {
            required: true,
            message: "请输入学生年级",
            trigger: "blur",
          },
        ],
        scyear: [
          {
            required: true,
            message: "请选择课程学年",
            trigger: "change",
          },
        ],
        semester: [
          {
            required: true,
            message: "请选择课程学期",
            trigger: "change",
          },
        ],
        coursename: [
          {
            required: true,
            message: "请输入课程名",
            trigger: "blur",
          },
        ],
        coursenature: [
          {
            required: true,
            message: "请选择课程性质",
            trigger: "change",
          },
        ],
        courseid: [
          {
            required: true,
            message: "请输入课程代码",
            trigger: "blur",
          },
        ],
        credit: [
          {
            required: true,
            message: "请输入课程学分",
            trigger: "blur",
          },
        ],
        score: [
          {
            required: true,
            message: "请输入课程成绩",
            trigger: "blur",
          },
        ],
        point: [
          {
            required: true,
            message: "请输入课程绩点",
            trigger: "blur",
          },
        ],
        creditpoint: [
          {
            required: true,
            message: "请输入学分绩点",
            trigger: "blur",
          },
        ],
      },
      graOptions: [
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
  computed: {
    changeData() {
      const { score, credit } = this.scoreform;
      return {
        score,
        credit,
      };
    },
  },
  watch: {
    changeData: {
      handler(newValue, oldValue) {
        if (newValue.score) {
          var sco = this.scoreform.score;
          var po = sco / 10 - 5;
          po = po.toFixed(2);
          if (po > 0) this.scoreform.point = po;
          else this.scoreform.point = 0;
        }
        if (newValue.score & newValue.credit) {
          this.scoreform.creditpoint = (
            this.scoreform.point * this.scoreform.credit
          ).toFixed(3);
        }
      },
    },
  },
  created() {
    var stunum = this.scoreStu.number;
    var stuname = this.scoreStu.stuname;
    var stugrade = this.scoreStu.stugrade;
    this.getStuList(stunum, stuname, stugrade);
  },
  methods: {
    async getStuList(stunum, stuname, stugrade) {
      const { data } = await getstulist(stunum, stuname, stugrade);
      console.log(data);
      this.stu = data.data.stu;
    },
    async setScore(scoreForm) {
      const { data } = await setscore(scoreForm);
      console.log(data);
      var code = data.code;
      if (code === 200)
        this.$message({
          showClose: true,
          message: "成绩录入成功！",
          type: "success",
        });
      else
        this.$message({
          showClose: true,
          message: "成绩录入失败！",
          type: "error",
        });
    },
    searchstu() {
      var stunum = this.scoreStu.number;
      var stuname = this.scoreStu.stuname;
      var stugrade = this.scoreStu.stugrade;
      this.getStuList(stunum, stuname, stugrade);
    },
    submitForm() {
      this.$refs["scoreform"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.setScore(this.scoreform);
      });
    },
    resetForm() {
      this.$refs["scoreform"].resetFields();
    },

    openDetails(row, event, column) {
      this.scoreform.name = row.name;
      this.scoreform.grade = row.grade;
      this.scoreform.num = row.num;
    },
  },
};
</script>

<style>
.scoreForm {
  width: 1000px;
  height: 610px;
  background: #fcfcfc url("../../../assets/bac/score.png") no-repeat bottom
    left/ 30% auto;
}
</style>
