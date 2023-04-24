<template>
  <div>
    <div id="title" style="width: 100%; height: 100%"></div>
    <div class="echarts">
      <el-row
        style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
      >
        <div id="tealine" style="width: 100%; height: 400px"></div>
      </el-row>

      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-card>
            <div class="teachart-wrapper">
              <div id="teaarea" style="width: 600px; height: 400px"></div>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="24" :lg="12">
          <el-card>
            <div class="teachart-wrapper">
              <div id="tearadar" style="width: 600px; height: 400px"></div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "teaMain",
  data() {
    return {
      linedata: [
        [5, 80.9, 20, 18, 12],
        [20, 82.4, 76, 34, 55],
        [45, 83.4, 124, 69, 105],
        [78, 85.4, 201, 105, 189],
      ],
      areadata: [15, 24, 13, 35],
      radardata: [
        [5, 8, 2],
        [8, 3, 6],
        [15, 13, 19],
        [20, 24, 12],
      ],
    };
  },
  methods: {
    title() {
      var title = this.$echarts.init(document.getElementById("title"));
      title.setOption({
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: "助 力 学 生 成 长 成 才",
                fontSize: 60,
                fontWeight: "bold",
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: "transparent",
                stroke: "#8db1f1",
                lineWidth: 1,
              },
              keyframeAnimation: {
                duration: 5000,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    style: {
                      fill: "transparent",
                      lineDashOffset: 200,
                      lineDash: [200, 0],
                    },
                  },
                  {
                    // Stop for a while.
                    percent: 20,
                    style: {
                      fill: "transparent",
                    },
                  },
                  {
                    percent: 1,
                    style: {
                      fill: "#6cb4e5",
                    },
                  },
                ],
              },
            },
          ],
        },
      });
    },
    TeaLine(linedata) {
      var line = this.$echarts.init(document.getElementById("tealine"));
      line.setOption({
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087"],
        title: {
          text: "学生加分成果统计分析",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["2021级", "2020级", "2019级", "2018级"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
          padding: [5, 10],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "思想品德(项)",
              "学业表现(综合绩点)",
              "科研竞赛(项)",
              "艺体素养(项)",
              "实践创业(项)",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "2021级",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: linedata[0],
            animationDuration: 2000,
          },
          {
            name: "2020级",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: linedata[1],
            animationDuration: 2500,
          },
          {
            name: "2019级",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: linedata[2],
            animationDuration: 3000,
          },
          {
            name: "2018级",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgb(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: linedata[3],
            animationDuration: 3500,
          },
        ],
      });
    },
    TeaArea(areadata) {
      var area = this.$echarts.init(document.getElementById("teaarea"));
      area.setOption({
        title: {
          text: "学生学业预警统计分析",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["2021级", "2020级", "2019级", "2018级"],
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
            name: "学业预警人次",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: [
              { value: areadata[0], name: "2021级" },
              { value: areadata[1], name: "2020级" },
              { value: areadata[2], name: "2019级" },
              { value: areadata[3], name: "2018级" },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 3500,
          },
        ],
      });
    },
    TeaRadar(radardata) {
      var radar = this.$echarts.init(document.getElementById("tearadar"));
      radar.setOption({
        title: {
          text: "学生模块扣分统计分析",
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
            { name: "思想品德", max: 30 },
            { name: "艺体修养", max: 30 },
            { name: "实践创业", max: 30 },
          ],
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["2021级", "2020级", "2019级", "2018级"],
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
                value: radardata[3],
                name: "2018级",
              },
              {
                value: radardata[2],
                name: "2019级",
              },
              {
                value: radardata[1],
                name: "2020级",
              },
              {
                value: radardata[0],
                name: "2021级",
              },
            ],
            animationDuration: 3500,
          },
        ],
      });
    },
  },
  mounted() {
    this.title();
    this.TeaLine(this.linedata);
    this.TeaArea(this.areadata);
    this.TeaRadar(this.radardata);
  },
};
</script>

<style scoped>
.teachart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
</style>
