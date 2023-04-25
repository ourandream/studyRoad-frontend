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
    <el-button
      icon="el-icon-search"
      circle
      type="primary"
      @click="stuNameInputVisible = true"
      class="inputTrigger"
    ></el-button>
  </div>
</template>

<script>
import TimelineCard from "../common/TimelineCard.vue";
import { getauditdetails as getKeyanData } from "@/api/keyan";
import { getauditdetails as getShijianData } from "@/api/shijian";
import { getauditdetails as getYitiData } from "@/api/yiti";

export default {
  data() {
    return {
      stuNameInputVisible: true,
      stuNum: 0,
      timelineData: [],
    };
  },
  methods: {
    async initTimeline() {
      const newtimelinedata = [];
      let events = [];
      let nameKey = "name";
      let key = 0;
      const stunum = this.stuNum;
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
