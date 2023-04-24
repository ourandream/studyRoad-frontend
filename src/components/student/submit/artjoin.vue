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
            <el-breadcrumb-item>艺体素养</el-breadcrumb-item>
            <el-breadcrumb-item>成果上报</el-breadcrumb-item>
            <el-breadcrumb-item>艺体参与成果上报</el-breadcrumb-item>
          </el-breadcrumb>
        </el-container>
        <el-container>
          <el-row>
            <el-button round @click="canyu">艺体参与加分</el-button>
            <el-button type="success" round @click="rongyu"
              >艺体荣誉加分</el-button
            >
            <el-button type="info" round @click="qita">其他艺体加分</el-button>
          </el-row>
        </el-container>
      </el-container>
    </div>
    <el-container>
      <el-container>
        <el-card class="artform">
          <el-row :gutter="0">
            <el-form
              ref="other"
              :model="join"
              :rules="rules"
              size="mini"
              label-width="100px"
            >
              <el-col :span="8">
                <el-form-item label="学年" prop="scyear">
                  <el-select
                    v-model="join.scyear"
                    placeholder="参与学年"
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
                    v-model="join.semester"
                    placeholder="参与学期"
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
                    v-model="join.time"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{ width: '100%' }"
                    placeholder="参与时间"
                    clearable
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="参与级别"
                  prop="level"
                  style="padding-top: 2%"
                >
                  <el-select
                    v-model="join.level"
                    placeholder="请选择参与级别"
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
                <el-form-item
                  label="项目类别"
                  prop="category"
                  style="padding-top: 2%"
                >
                  <el-select
                    v-model="join.category"
                    placeholder="请选择项目类别"
                    clearable
                    :style="{ width: '100%' }"
                  >
                    <el-option
                      v-for="(item, index) in categoryOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="活动名称"
                  prop="name"
                  style="padding-top: 2%"
                >
                  <el-input
                    v-model="join.name"
                    placeholder="请输入活动名称"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="活动描述"
                  prop="describe"
                  style="padding-top: 2%"
                >
                  <el-input
                    v-model="join.describe"
                    type="textarea"
                    placeholder="请输入活动描述"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="备注"
                  prop="remarks"
                  style="padding-top: 2%"
                >
                  <el-input
                    v-model="join.remarks"
                    type="textarea"
                    placeholder="请输入活动参与的其他加分备注"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="加分数"
                  prop="mark"
                  style="padding-top: 2%"
                >
                  <el-rate v-model="join.mark" :max="22" show-score></el-rate>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label-width="130px"
                  label="证明材料上传"
                  prop="prove"
                  style="padding-top: 2%"
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
          <h3>艺体参与加分标准</h3>
          <img
            src="../../../assets/img/artjoin.jpg"
            style="width: 400px; height: 500px"
          />
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { provedelete, setextrapoint } from "../../../api/yiti";
export default {
  name: "artjoin",
  data() {
    return {
      hideUpload: false,
      join: {
        scyear: "",
        semester: "",
        time: null,
        type: "艺体参与",
        level: undefined,
        category: undefined,
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
            message: "参与学年",
            trigger: "change",
          },
        ],
        semester: [
          {
            required: true,
            message: "参与学期",
            trigger: "change",
          },
        ],
        time: [
          {
            required: true,
            message: "参与时间",
            trigger: "change",
          },
        ],
        level: [
          {
            required: true,
            message: "请选择参与级别",
            trigger: "change",
          },
        ],
        category: [
          {
            required: true,
            message: "请选择项目类别",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        describe: [
          {
            required: true,
            message: "请输入活动描述",
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
      proveAction: "http://localhost:8082/ZongCe/yiti/proveupload",
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
          label: "国家级",
          value: "国家级",
        },
        {
          label: "省级",
          value: "省级",
        },
        {
          label: "校级",
          value: "校级",
        },
        {
          label: "院级",
          value: "院级",
        },
      ],
      categoryOptions: [
        {
          label: "参与各类型比赛队伍并完成训练",
          value: "参与各类型比赛队伍并完成训练",
        },
        {
          label: "参加体育竞赛",
          value: "参加体育竞赛",
        },
        {
          label: "担任体育竞赛活动裁判",
          value: "担任体育竞赛活动裁判",
        },
        {
          label: "主持或参与文娱表演",
          value: "主持或参与文娱表演",
        },
        {
          label: "指导文娱活动节目",
          value: "指导文娱活动节目",
        },
        {
          label: "文娱活动服务工作者",
          value: "文娱活动服务工作者",
        },
        {
          label: "参与艺术团并训练满一年",
          value: "参与艺术团并训练满一年",
        },
      ],
    };
  },
  methods: {
    async setextrapoint(stunum, yitiobject) {
      const { data } = await setextrapoint(stunum, yitiobject);
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
      var oldprove = this.join.prove;
      this.join.prove = null;
      this.proveDelete(oldprove);
    },
    submitsuccess(data) {
      console.log(data);
      this.join.prove = data.data.url;
      console.log("证明材料链接：" + this.join.prove + "牛逼");
    },
    canyu() {
      this.$router.push("/artjoin");
    },
    rongyu() {
      this.$router.push("/arthonor");
    },
    qita() {
      this.$router.push("/artother");
    },
    submitForm() {
      this.$refs["other"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        var stunum = this.$session.get("user").stunum;
        this.setextrapoint(stunum, this.join);
        var that = this;
        setTimeout(function () {
          that.$router.go(0);
        }, 800);
      });
    },
    resetForm() {
      this.$refs["other"].resetFields();
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
.artform {
  width: 800px;
  height: 590px;
  margin-top: 2%;
  margin-left: 2%;
  text-align: left;
  /*background-image: url("../../../assets/submitaction.png") ;*/
  /*backdrop-filter: inherit;*/
  background: #fcfcfc url("../../../assets/bac/endeavor.png") no-repeat bottom
    right/ 45% auto;
  /*background-size: cover;*/
  /*background: #fff url("../../../assets/submitaction.png") no-repeat;*/
}
</style>
