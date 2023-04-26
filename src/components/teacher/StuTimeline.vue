<template>
  <div style="text-align: start">
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
      <el-breadcrumb-item>学路看板</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-bottom: 3vh" v-if="Student">
      <el-descriptions
        class="margin-top"
        title="学生基本信息"
        :column="3"
        border
      >
        <template slot="extra">
          <el-button
            icon="el-icon-search"
            circle
            type="primary"
            @click="stuNameInputVisible = true"
          ></el-button>
        </template>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconyonghu"></i>
              学号</span
            >
          </template>
          {{ Student.stunum }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconxingming"></i>
              姓名</span
            >
          </template>
          {{ Student.stuname }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconxingbie"></i>
              性别</span
            >
          </template>
          <span v-if="Student.stusex === 1">男</span>
          <span v-if="Student.stusex === 2">女</span>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconyonghu"></i>
              年级</span
            >
          </template>
          <div v-if="Student.stugrade != null">{{ Student.stugrade }}级</div>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconyonghu"></i>
              班级</span
            >
          </template>
          {{ Student.stuclass }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconyonghu"></i>
              专业</span
            >
          </template>
          {{ Student.stumajor }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconminzu"></i>
              民族</span
            >
          </template>
          {{ Student.stustunation }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconjia"></i>
              籍贯</span
            >
          </template>
          {{ Student.stunativeplace }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconzhengzhi"></i>
              政治面貌</span
            >
          </template>
          {{ Student.stupoliticaloutlook }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconidcard"></i>
              身份证</span
            >
          </template>
          {{ Student.stuidcard }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="el-icon-user"></i>
              出生日期</span
            >
          </template>
          {{ Student.stubirthdate }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-icondianhua"></i>
              电话</span
            >
          </template>
          {{ Student.stuphone }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconyouxiang"></i>
              邮箱</span
            >
          </template>
          {{ Student.stuemail }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconweixin"></i>
              微信号</span
            >
          </template>
          {{ Student.stuwechat }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconyonghu"></i>
              宿舍</span
            >
          </template>
          {{ Student.dormitory }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconyonghu"></i>
              辅导员</span
            >
          </template>
          {{ Student.stuinstructor }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconyonghu"></i>
              辅导员联系方式</span
            >
          </template>
          {{ Student.stuinstructorphone }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconyonghu"></i>
              学籍状态</span
            >
          </template>
          <el-tag v-if="Student.stustate === 1" size="small">在读</el-tag>
          <el-tag v-if="Student.stustate === 2" size="small">休学</el-tag>
          <el-tag v-if="Student.stustate === 3" size="small">保留学籍</el-tag>
          <el-tag v-if="Student.stustate === 4" size="small">待审核</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <span class="item">
              <i class="zc-iconbeizhu"></i>
              备注</span
            >
          </template>
          <el-tag size="small">学校</el-tag>
          <span style="padding-left: 20px">
            <el-tag size="small" type="success">学生</el-tag></span
          >
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <timeline-card :timelineData="timelineData" title="学生活动与成就时间线" />
    <el-dialog :visible.sync="stuNameInputVisible">
      <label>
        <h2>查看学生学号</h2>
      </label>
      <el-input v-model="stuNum" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <div style="text-align: center">
          <el-button type="primary" @click="initTimeline">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TimelineCard from "../common/TimelineCard.vue";
import { getStuInfo } from "@/api/Users";
import { getauditdetails as getKeyanData } from "@/api/keyan";
import { getauditdetails as getShijianData } from "@/api/shijian";
import { getauditdetails as getYitiData } from "@/api/yiti";

export default {
  data() {
    return {
      stuNameInputVisible: true,
      stuNum: 0,
      timelineData: [],
      Student: null,
    };
  },
  methods: {
    async initTimeline() {
      const newtimelinedata = [];
      let events = [];
      let nameKey = "name";
      let key = 0;
      const stunum = this.stuNum;
      this.Student = (await getStuInfo(stunum)).data.data.student[0];
      function addEvent(events, nameKey, key, newtimelinedata) {
        for (const event of events) {
          const timelineitem = { key: key++ };
          timelineitem.title = event[nameKey];
          timelineitem.date = event.time;
          timelineitem.description = event.describe;
          timelineitem.resultImage = event.prove;
          newtimelinedata.push(timelineitem);
        }
      }
      events = (await getKeyanData(stunum)).data.data.technology.reviewed;
      addEvent(events, nameKey, key, newtimelinedata);
      events = (await getShijianData(stunum)).data.data.pra.reviewed;
      nameKey = "matter";
      addEvent(events, nameKey, key, newtimelinedata);
      events = (await getYitiData(stunum)).data.data.artsp.reviewed;
      addEvent(events, nameKey, key, newtimelinedata);
      newtimelinedata.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      if (newtimelinedata.length > 0) {
        this.timelineData = newtimelinedata;
        this.stuNameInputVisible = false;
      } else {
        this.$message.error(`未正确加载学号${stunum}的时间线信息`);
      }
    },
  },
  components: {
    TimelineCard,
  },
};
</script>

<style scoped>
.inputTrigger {
  position: absolute;
  right: 3vw;
  bottom: 5vh;
}
</style>
