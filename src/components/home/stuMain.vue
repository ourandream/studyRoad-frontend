<template>
  <div>
    <el-scrollbar>
      <div>
        <el-row :gutter="40" class="panel-group">
          <el-col :xs="25" :sm="25" :lg="4" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('sixiang')">
              <div class="card-panel-icon-wrapper icon-sixiang">
                <i class="zc-iconxingming card-panel-icon"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">思想</div>
                <div class="card-panel-text">品德</div>
                <!-- <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> -->
              </div>
            </div>
          </el-col>

          <el-col :xs="25" :sm="25" :lg="4" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('xueye')">
              <div class="card-panel-icon-wrapper icon-xueye">
                <i class="zc-iconxingming card-panel-icon"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">学业</div>
                <div class="card-panel-text">表现</div>
                <!-- <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" /> -->
              </div>
            </div>
          </el-col>

          <el-col :xs="25" :sm="25" :lg="4" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('keyan')">
              <div class="card-panel-icon-wrapper icon-keyan">
                <i class="zc-iconxingming card-panel-icon"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">科研</div>
                <div class="card-panel-text">竞赛</div>
                <!-- <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" /> -->
              </div>
            </div>
          </el-col>

          <el-col :xs="25" :sm="25" :lg="4" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('yiti')">
              <div class="card-panel-icon-wrapper icon-yiti">
                <i class="zc-iconxingming card-panel-icon"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">艺体</div>
                <div class="card-panel-text">素养</div>
                <!-- <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" /> -->
              </div>
            </div>
          </el-col>

          <el-col :xs="25" :sm="25" :lg="4" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('shijian')">
              <div class="card-panel-icon-wrapper icon-shijian">
                <i class="zc-iconxingming card-panel-icon"></i>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">实践</div>
                <div class="card-panel-text">创新</div>
                <!-- <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" /> -->
              </div>
            </div>
          </el-col>

          <el-col :xs="25" :sm="25" :lg="4" class="card-panel-col">
            <img
              src="../../assets/bac/tubiao.png"
              style="width: 108px; width: 108px"
            />
          </el-col>
        </el-row>
      </div>
      <div class="Echarts">
        <el-row
          style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
        >
          <div id="bar" style="width: 100%; height: 350px"></div>
        </el-row>

        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="12">
            <el-card>
              <div class="chart-wrapper">
                <div id="area" style="width: 600px; height: 400px"></div>
              </div>
            </el-card>
          </el-col>

          <el-col :xs="24" :sm="24" :lg="12">
            <el-card>
              <div class="chart-wrapper">
                <div id="pie" style="width: 600px; height: 400px"></div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row
          style="margin-top: 3vh; text-align: start"
          v-if="['shijian', 'yiti', 'keyan'].includes(dataType)"
        >
          <timeline-card :timelineData="timelineData" title="时间线"/>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { getauditdetails as getKeyanData } from "@/api/keyan";
import { getauditdetails as getShijianData } from "@/api/shijian";
import { getauditdetails as getYitiData } from "@/api/yiti";
import TimelineCard from "@/components/common/TimelineCard.vue";
export default {
  components: { TimelineCard },
  name: "stuMain",
  data() {
    return {
      dataType: "",
      timelineData: [
        { resultImage: "", time: "", title: "", description: "", key: 0 },
      ],
      data1: [100, 900, 800, 700, 600, 400, 800],
      scdata2: [
        "2021~2022学年",
        "2020~2021学年",
        "2019~2020学年",
        "2018~2019学年",
      ],
      scdata: [
        "2021~2022学年",
        "2020~2021学年",
        "2019~2020学年",
        "2018~2019学年",
      ],
      moduledata: ["思想品德", "学业表现", "科研竞赛", "艺体素养", "实践创业"],
      sxdata: ["通报表扬", "活动参与", "荣誉奖项"],
      xydata: ["选修", "必修", "综合"],
      ytdata: ["艺体参与", "艺体荣誉", "其他成果"],
      sjdata: ["职务加分", "赛事荣誉", "其他成果"],
      kydata: ["科研立项", "学术竞赛", "论文专利", "其他成果"],
      sxdata1: [
        [4, 5, 0, 10],
        [12, 15, 8, 20],
        [10, 20, 25, 16],
      ],
      xydata1: [
        [0, 85.2, 89.1, 90.7, 89.1, 0],
        [0, 83.4, 89.5, 92.4, 84.6, 0],
        [0, 85.4, 86.3, 88.2, 88, 0],
      ],
      ytdata1: [
        [0, 4, 6, 0, 3, 0],
        [0, 5, 2, 0, 0, 0],
        [0, 4, 3, 5, 2, 0],
      ],
      sjdata1: [
        [0, 20, 30, 45, 45, 0],
        [0, 2, 5, 15, 0, 0],
        [0, 4, 5, 8, 12, 0],
      ],
      kydata1: [
        [0, 12, 50, 33, 12, 0],
        [0, 13, 30, 60, 25, 0],
        [0, 0, 10, 23, 12, 0],
        [0, 5, 1, 13, 9, 0],
      ],
    };
  },
  methods: {
    piearea(moduledata, scdata2) {
      var Area = this.$echarts.init(document.getElementById("area"));
      //配置图表
      var Pie = this.$echarts.init(document.getElementById("pie"));
      Area.setOption({
        title: {
          text: "2021~2022学年模块加分统计",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          bottom: "10",
          data: moduledata,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
          padding: [5, 10],
        },
        series: [
          {
            areaStyle: {},
            name: "模块加分",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: [
              { value: 34, name: moduledata[0] },
              { value: 24, name: moduledata[1] },
              { value: 14, name: moduledata[2] },
              { value: 10, name: moduledata[3] },
              { value: 59, name: moduledata[4] },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 3000,
          },
        ],
      });
      Pie.setOption({
        title: {
          text: "各学年模块加分统计",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
          padding: [5, 10],
        },
        radar: {
          radius: "66%",
          center: ["50%", "42%"],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: "rgba(127,95,132,.3)",
              opacity: 1,
              shadowBlur: 45,
              shadowColor: "rgba(0,0,0,0.24)",
              shadowOffsetX: 0,
              shadowOffsetY: 15,
            },
          },
          indicator: [
            { name: "思想品德", max: 10000 },
            { name: "学业表现", max: 20000 },
            { name: "科研竞赛", max: 20000 },
            { name: "艺体修养", max: 20000 },
            { name: "实践创业", max: 20000 },
          ],
        },
        legend: {
          left: "center",
          bottom: "10",
          data: scdata2,
        },
        series: [
          {
            type: "radar",
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: "rgba(143,222,243,0.52)",
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1,
              },
            },
            data: [
              {
                value: [5000, 7000, 12000, 11000, 15000],
                name: scdata2[0],
              },
              {
                value: [4000, 9000, 15000, 15000, 13000],
                name: scdata2[1],
              },
              {
                value: [5500, 11000, 12000, 15000, 12000, 12000],
                name: scdata2[2],
              },
              {
                value: [5500, 9800, 19000, 7700, 12560, 10570],
                name: scdata2[3],
              },
            ],
            animationDuration: 3000,
          },
        ],
      });
    },
    barcharts(detailsdata, scdataX, data1) {
      var Bar = this.$echarts.init(document.getElementById("bar"));
      if (detailsdata.length === 3) {
        Bar.setOption({
          title: {
            text: "各学年模块加分明细",
          },
          xAxis: {
            data: scdataX,
            boundaryGap: false,
            axisTick: {
              show: false,
            },
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
            padding: [5, 10],
          },
          yAxis: {
            axisTick: {
              show: false,
            },
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
            padding: [5, 10],
          },
          legend: {
            data: detailsdata,
          },
          series: [
            {
              name: detailsdata[0],
              itemStyle: {
                normal: {
                  color: "#eab7c9",
                  lineStyle: {
                    color: "#f1b5b5",
                    width: 2,
                  },
                  areaStyle: {
                    color: "#f1b5b5",
                  },
                },
              },
              smooth: true,
              type: "line",
              data: data1[0],
              animationDuration: 2300,
              animationEasing: "cubicInOut",
            },
            {
              name: detailsdata[1],
              smooth: true,
              type: "line",
              itemStyle: {
                normal: {
                  color: "#a6c3ea",
                  lineStyle: {
                    color: "#a6c3ea",
                    width: 2,
                  },
                  areaStyle: {
                    color: "#a6c3ea",
                  },
                },
              },
              data: data1[1],
              animationDuration: 2800,
              animationEasing: "quadraticOut",
            },
            {
              name: detailsdata[2],
              smooth: true,
              type: "line",
              itemStyle: {
                normal: {
                  color: "#a0f3d6",
                  lineStyle: {
                    color: "#a0f3d6",
                    width: 2,
                  },
                  areaStyle: {
                    color: "#a0f3d6",
                  },
                },
              },
              data: data1[2],
              animationDuration: 3200,
              animationEasing: "quadraticOut",
            },
          ],
        });
      }
      if (detailsdata.length === 4) {
        Bar.setOption({
          title: {
            text: "各学年模块加分明细",
          },
          xAxis: {
            data: scdataX,
            boundaryGap: false,
            axisTick: {
              show: false,
            },
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
            padding: [5, 10],
          },
          yAxis: {
            axisTick: {
              show: false,
            },
          },
          legend: {
            data: detailsdata,
          },
          series: [
            {
              name: detailsdata[0],
              itemStyle: {
                normal: {
                  color: "#eab7c9",
                  lineStyle: {
                    color: "#f1b5b5",
                    width: 2,
                  },
                  areaStyle: {
                    color: "#f1b5b5",
                  },
                },
              },
              smooth: true,
              type: "line",
              data: data1[0],
              animationDuration: 2300,
              animationEasing: "cubicInOut",
            },
            {
              name: detailsdata[1],
              smooth: true,
              type: "line",
              itemStyle: {
                normal: {
                  color: "#a6c3ea",
                  lineStyle: {
                    color: "#a6c3ea",
                    width: 2,
                  },
                  areaStyle: {
                    color: "#a6c3ea",
                  },
                },
              },
              data: data1[1],
              animationDuration: 2800,
              animationEasing: "quadraticOut",
            },
            {
              name: detailsdata[2],
              smooth: true,
              type: "line",
              itemStyle: {
                normal: {
                  color: "#a0f3d6",
                  lineStyle: {
                    color: "#a0f3d6",
                    width: 2,
                  },
                  areaStyle: {
                    color: "#a0f3d6",
                  },
                },
              },
              data: data1[2],
              animationDuration: 3200,
              animationEasing: "quadraticOut",
            },

            {
              name: detailsdata[3],
              itemStyle: {
                normal: {
                  color: "#f6e1a2",
                  lineStyle: {
                    color: "#f6e1a2",
                    width: 2,
                  },
                  areaStyle: {
                    color: "#f6e1a2",
                  },
                },
              },
              smooth: true,
              type: "line",
              data: data1[3],
              animationDuration: 3600,
              animationEasing: "cubicInOut",
            },
          ],
        });
      }
    },
    handleSetLineChartData(type) {
      this.reareapie();
      this.dataType = type;
      if (type === "sixiang") {
        this.$echarts.init(document.getElementById("bar")).dispose();
        this.barcharts(this.sxdata, this.scdata, this.sxdata1);
      }
      if (type === "yiti") {
        this.$echarts.init(document.getElementById("bar")).dispose();
        this.barcharts(this.ytdata, this.scdata, this.ytdata1);
      }
      if (type === "shijian") {
        this.$echarts.init(document.getElementById("bar")).dispose();
        this.barcharts(this.sjdata, this.scdata, this.sjdata1);
      }
      if (type === "xueye") {
        this.$echarts.init(document.getElementById("bar")).dispose();
        this.barcharts(this.xydata, this.scdata, this.xydata1);
      }
      if (type === "keyan") {
        this.$echarts.init(document.getElementById("bar")).dispose();
        this.barcharts(this.kydata, this.scdata, this.kydata1);
      }
    },
    reareapie() {
      this.$echarts.init(document.getElementById("area")).dispose();
      this.$echarts.init(document.getElementById("pie")).dispose();
      this.piearea(this.moduledata, this.scdata2);
    },
    async updateTimelineData(type) {

      var stunum = this.$session.get("user").stunum;
      const newtimelinedata = [];
      let events = [];
      let nameKey = "name";
      if (type === "keyan") {
        events = (await getKeyanData(stunum)).data.data.technology.reviewed;
      } else if (type === "shijian") {
        events = (await getShijianData(stunum)).data.data.pra.reviewed;
        nameKey = "matter";
      } else if (type === "yiti") {
        events = (await getYitiData(stunum)).data.data.artsp.reviewed;
      }
      let key = 0;
      for (const event of events) {
        const timelineitem = { key: key++ };
        timelineitem.title = event[nameKey];
        timelineitem.date = event.time;
        timelineitem.description = event.describe;
        timelineitem.resultImage = event.prove;
        newtimelinedata.push(timelineitem);
      }
      newtimelinedata.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      this.timelineData = newtimelinedata;
    },
  },
  watch: {
    dataType(newtype) {
      this.updateTimelineData(newtype);
    },
  },
  mounted() {
    this.barcharts(this.sxdata, this.scdata, this.sxdata1);
    this.piearea(this.moduledata, this.scdata2);
  },
  components: {
    TimelineCard,
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-sixiang {
        background: #40c9c6;
      }

      .icon-keyan {
        background: #36a3f7;
      }

      .icon-yiti {
        background: #f4516c;
      }

      .icon-shijian {
        background: #34bfa3;
      }

      .icon-xueye {
        background: #efc78c;
      }
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
