<template>
  <div>
    <div>
      <el-container>
        <el-container style="width: 50%">
          <el-breadcrumb
            separator="》"
            style="padding-left: 10px; font-size: 15px"
          >
            <el-breadcrumb-item :to="{ path: '/StuHome' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>科研竞赛</el-breadcrumb-item>
            <el-breadcrumb-item>成果上报</el-breadcrumb-item>
            <el-breadcrumb-item>论文专利成果上报</el-breadcrumb-item>
          </el-breadcrumb>
        </el-container>
        <el-container>
          <el-row>
            <el-button round @click="keyan">科研立项加分</el-button>
            <el-button type="success" round @click="jinsai"
              >学术竞赛加分</el-button
            >
            <el-button type="info" round @click="lunwen"
              >论文专利加分</el-button
            >
            <el-button type="warning" round @click="other"
              >其他成果加分</el-button
            >
          </el-row>
        </el-container>
      </el-container>
    </div>
    <el-container>
      <el-container>
        <el-card class="Forma">
          <el-row :gutter="0">
            <el-form
              ref="paper"
              :model="paper"
              :rules="rules"
              size="mini"
              label-width="100px"
            >
              <el-col :span="8">
                <el-form-item label="学年" prop="scyear">
                  <el-select
                    v-model="paper.scyear"
                    placeholder="论文专利发表学年"
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
              <el-col :span="8">
                <el-form-item label="学期" prop="semester">
                  <el-select
                    v-model="paper.semester"
                    placeholder="论文专利发表学期"
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
              <el-col :span="8">
                <el-form-item label="时间" prop="time">
                  <el-date-picker
                    v-model="paper.time"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{ width: '100%' }"
                    placeholder="论文专利发表时间"
                    clearable
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="级别" prop="level">
                  <el-select
                    v-model="paper.level"
                    placeholder="论文专利级别"
                    clearable
                    :style="{ width: '100%' }"
                  >
                    <el-option
                      v-for="(item, index) in levelOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="作者次别" prop="order">
                  <el-select
                    v-model="paper.order"
                    placeholder="请选择作者次别"
                    clearable
                    :style="{ width: '100%' }"
                  >
                    <el-option
                      v-for="(item, index) in orderOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="名称" prop="name">
                  <el-input
                    v-model="paper.name"
                    placeholder="论文专利名称"
                    clearable
                    prefix-icon="el-icon-tickets"
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="描述" prop="describe">
                  <el-input
                    v-model="paper.describe"
                    type="textarea"
                    placeholder="请输入论文专利相关描述"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注" prop="remarks">
                  <el-input
                    v-model="paper.remarks"
                    type="textarea"
                    placeholder="请输入论文专利相关备注"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="加分数" prop="mark">
                  <el-rate v-model="paper.mark" :max="50" show-score></el-rate>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="130px"
                  label="证明材料上传"
                  prop="prove"
                  style="padding-top: 3%"
                >
                  <el-upload
                    ref="prove"
                    :file-list="provefileList"
                    :action="proveAction"
                    :on-success="submitsuccess"
                    :class="{ hide: hideUpload }"
                    :on-remove="removeimage"
                    :on-change="handleChange"
                    :before-upload="proveBeforeUpload"
                    list-type="picture-card"
                    accept="image/*"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item size="medium" style="padding-top: 5%">
                  <span style="padding-left: 20%">
                    <el-button type="primary" @click="submitForm"
                      >上报申请</el-button
                    >
                  </span>
                  <span style="padding-left: 10%">
                    <el-button @click="resetForm">重置数据</el-button>
                  </span>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-card>
      </el-container>

      <el-container>
        <el-card
          style="width: 500px; height: 590px; margin-top: 3%; margin-left: 6%"
        >
          <h3>论文专利评分标准</h3>
          <img
            src="../../../assets/img/lubwenzhuanli.jpg"
            style="width: 400px; height: 500px"
          />
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { provedelete, setextrapoint } from "../../../api/keyan";

export default {
  name: "paper",
  data() {
    return {
      hideUpload: false,
      paper: {
        scyear: "",
        semester: "",
        type: "论文专利",
        time: null,
        level: undefined,
        order: undefined,
        name: undefined,
        describe: undefined,
        remarks: null,
        mark: 0,
        prove: null,
      },
      rules: {
        scyear: [
          {
            required: true,
            message: "论文专利发表学年",
            trigger: "change",
          },
        ],
        semester: [
          {
            required: true,
            message: "论文专利发表学期",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            message: "论文专利发表时间",
            trigger: "change",
          },
        ],
        level: [
          {
            required: true,
            message: "论文专利级别",
            trigger: "change",
          },
        ],
        order: [
          {
            required: true,
            message: "请选择作者次别",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "论文专利名称",
            trigger: "blur",
          },
        ],
        describe: [
          {
            required: true,
            message: "请输入论文专利相关描述",
            trigger: "blur",
          },
        ],
        remarks: [],
        mark: [
          {
            required: true,
            message: "加分数不能为空",
            trigger: "change",
          },
        ],
      },
      proveAction: "http://localhost:8082/ZongCe/keyan/proveupload",
      provefileList: [],
      scyearOptions: [
        {
          label: "2021年~2022年",
          value: "2021年~2022年",
        },
        {
          label: "2020年~2021年",
          value: "2020年~2021年",
        },
        {
          label: "2019年~2020年",
          value: "2019年~2020年",
        },
        {
          label: "2018年~2019年",
          value: "2018年~2019年",
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
      levelOptions: [
        {
          label: "SCI",
          value: "SCI",
        },
        {
          label: "EI",
          value: "EI",
        },
        {
          label: "核心刊物会议",
          value: "核心刊物会议",
        },
        {
          label: "其他刊物会议",
          value: "其他刊物会议",
        },
        {
          label: "国家软件著作权",
          value: "国家软件著作权",
        },
        {
          label: "发明专利",
          value: "发明专利",
        },
        {
          label: "实用新型专利",
          value: "实用新型专利",
        },
        {
          label: "外观设计专利",
          value: "外观设计专利",
        },
        {
          label: "其他文章",
          value: "其他文章",
        },
      ],
      orderOptions: [
        {
          label: "第一作者",
          value: "第一作者",
        },
        {
          label: "第二作者",
          value: "第二作者",
        },
        {
          label: "第三作者",
          value: "第三作者",
        },
        {
          label: "第四作者",
          value: "第四作者",
        },
        {
          label: "第五作者",
          value: "第五作者",
        },
        {
          label: "第六作者",
          value: "第六作者",
        },
      ],
    };
  },
  methods: {
    async setextrapoint(stunum, keyanobject) {
      const { data } = await setextrapoint(stunum, keyanobject);
      console.log(data);
      if (data.code === 200)
        this.$message({
          message: "成果上报成功！",
          type: "success",
        });
      else
        this.$message({
          message: "成果上报失败！",
          type: "error",
        });
    },
    async proveDelete(file) {
      const { data } = await provedelete(file);
      console.log(data);
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= 1;
    },
    removeimage(fileList) {
      this.hideUpload = fileList.length >= 1;
      var oldprove = this.paper.prove;
      this.paper.prove = null;
      this.proveDelete(oldprove);
    },
    submitsuccess(data) {
      console.log(data);
      this.paper.prove = data.data.url;
      console.log("证明材料链接：" + this.paper.prove);
    },
    keyan() {
      this.$router.push("/scientific");
    },
    jinsai() {
      this.$router.push("/competition");
    },
    lunwen() {
      this.$router.push("/paper");
    },
    other() {
      this.$router.push("/otherach");
    },
    submitForm() {
      this.$refs["paper"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        var stunum = this.$session.get("user").stunum;
        this.setextrapoint(stunum, this.paper);
        var that = this;
        setTimeout(function () {
          that.$router.go(0);
        }, 800);
      });
    },
    resetForm() {
      this.$refs["paper"].resetFields();
    },
    proveBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 10;
      if (!isRightSize) {
        this.$message.error("文件大小超过 10MB");
      }
      let isAccept = new RegExp("image/*").test(file.type);
      if (!isAccept) {
        this.$message.error("应该选择image/*类型的文件");
      }
      return isRightSize && isAccept;
    },
  },
};
</script>
<style>
.Forma {
  width: 800px;
  height: 590px;
  margin-top: 2%;
  margin-left: 2%;
  /*background-image: url("../../../assets/submitaction.png") ;*/
  /*backdrop-filter: inherit;*/
  background: #fcfcfc url("../../../assets/bac/endeavor.png") no-repeat bottom
    right/ 45% auto;
  /*background-size: cover;*/
  /*background: #fff url("../../../assets/submitaction.png") no-repeat;*/
}
</style>
