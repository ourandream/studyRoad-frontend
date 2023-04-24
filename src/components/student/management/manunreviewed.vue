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
        <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员</el-breadcrumb-item>
        <el-breadcrumb-item>审核管理</el-breadcrumb-item>
        <el-breadcrumb-item>我的待审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
        :data="examineData"
        border
        stripe
        size="mini"
        max-height="615px"
        style="width: 100%"
      >
        <el-table-column prop="stuid" label="学号" fixed width="100">
        </el-table-column>
        <el-table-column prop="stu" label="姓名" fixed width="70">
        </el-table-column>
        <el-table-column prop="scyear" sortable width="120" label="加分学年">
        </el-table-column>
        <el-table-column label="加分学期" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.semester === 1">第一学期</div>
            <div v-if="scope.row.semester === 2">第二学期</div>
          </template>
        </el-table-column>
        <el-table-column label="加分模块" width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.module === '思想品德'" size="mini"
              >思想品德</el-tag
            >
            <el-tag
              v-if="scope.row.module === '艺体素养'"
              type="warning"
              size="mini"
              >艺体素养</el-tag
            >
            <el-tag
              v-if="scope.row.module === '实践创业'"
              style="background-color: rgba(231, 129, 19, 0.22)"
              size="mini"
              >实践创业</el-tag
            >
            <el-tag
              v-if="scope.row.module === '科研竞赛'"
              style="background-color: rgba(208, 46, 236, 0.22)"
              size="mini"
              >科研竞赛</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="time" label="加分项日期" width="120">
        </el-table-column>
        <el-table-column prop="type" label="加分类型" width="120">
        </el-table-column>
        <el-table-column prop="level" label="级别" width="120">
        </el-table-column>
        <el-table-column prop="order" label="等次" width="120">
        </el-table-column>
        <el-table-column prop="matter" label="加分项" width="180">
        </el-table-column>
        <el-table-column prop="describe" label="加分项简介" width="220">
        </el-table-column>
        <el-table-column prop="remarks" label="加分项备注" width="180">
        </el-table-column>
        <el-table-column prop="mark" sortable label="加分数" width="100">
          <template slot-scope="scope">
            <el-tag type="success" size="mini">{{ scope.row.mark }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="证明材料" width="100">
          <template slot-scope="scope">
            <div class="demo-image__preview">
              <el-image
                style="width: 70px; height: 70px"
                :src="scope.row.prove[0]"
                :preview-src-list="scope.row.prove"
              >
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="审核" fixed="right" width="120">
          <template slot-scope="scope">
            <span style="padding-left: 10px">
              <el-tooltip placement="top" effect="light">
                <div slot="content">通过</div>
                <el-popconfirm
                  title="确认审核通过该条上报数据？"
                  @confirm="manadopt(scope.row)"
                >
                  <el-button
                    circle
                    slot="reference"
                    size="small"
                    style="background-color: rgba(170, 245, 174, 0.71)"
                    icon="el-icon-circle-check"
                  ></el-button>
                </el-popconfirm>
              </el-tooltip>
            </span>
            <span style="padding-left: 10px">
              <el-tooltip placement="top" effect="light">
                <div slot="content">不通过</div>
                <el-button
                  circle
                  @click="manfail(scope.row)"
                  size="small"
                  style="background-color: rgba(241, 141, 141, 0.71)"
                  icon="el-icon-circle-close"
                ></el-button>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  stugetdaishenheList,
  stuTongguo,
  stuButongguo,
} from "../../../api/Users";
export default {
  name: "manunreviewed",
  data() {
    return {
      examineData: undefined,
      // examineData:[
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: "2021-10-8",
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: "2020-10-8",
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: "2020-1-28",
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: "2021-10-8",
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: "2020-10-8",
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time:" 2020-1-28",
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: "2021-10-8",
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: "2020-10-8",
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: "2020-1-28",
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: "2021-10-8",
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: 2020-10-8,
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: 2020-1-28,
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: 2021-10-8,
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: 2020-10-8,
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: 2020-1-28,
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: 2021-10-8,
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: 2020-10-8,
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: 2020-1-28,
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: 2021-10-8,
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: 2020-10-8,
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: 2020-1-28,
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: 2021-10-8,
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: 2020-10-8,
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: 2020-1-28,
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: 2021-10-8,
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: 2020-10-8,
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: 2020-1-28,
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: 2021-10-8,
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: 2020-10-8,
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: 2020-1-28,
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:undefined,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131188",
      //     stu:'俊杰',
      //     id:127,
      //     scyear: "2019~2020学年",
      //     semester: "第二学期",
      //     module:"思想品德",
      //     time: 2020-3-28,
      //     type:"通报表扬",
      //     level: "",
      //     order:"",
      //     matter: "好人好事受到学院升旗仪式上通报表扬",
      //     describe: "系统牛逼",
      //     remarks:"我是个好人",
      //     mark: 2,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   }, {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: 2021-10-8,
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: 2020-10-8,
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: 2020-1-28,
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131188",
      //     stu:'俊杰',
      //     id:127,
      //     scyear: "2019~2020学年",
      //     semester: "第二学期",
      //     module:"思想品德",
      //     time: 2020-3-28,
      //     type:"通报表扬",
      //     level: "",
      //     order:"",
      //     matter: "好人好事受到学院升旗仪式上通报表扬",
      //     describe: "系统牛逼",
      //     remarks:"我是个好人",
      //     mark: 2,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   }, {
      //     stuid:"20182131130",
      //     stu:'李话',
      //     id:123,
      //     scyear: "2021~2022学年",
      //     semester: "第一学期",
      //     module:"实践创业",
      //     time: 2021-10-8,
      //     type:"赛事荣誉",
      //     level: "省级",
      //     order:"荣誉称号",
      //     matter: "优秀共青团干部",
      //     describe: "省优秀共青团干部",
      //     remarks:" ",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131210",
      //     stu:'敏捷',
      //     id:113,
      //     scyear: "2020~2021学年",
      //     semester: "第二学期",
      //     module:"艺体素养",
      //     time: 2020-10-8,
      //     type:"艺体荣誉",
      //     level: "校级",
      //     order:"二等奖",
      //     matter: "校合唱比赛",
      //     describe: "参加校合唱比赛活动二等奖",
      //     remarks:"评为先进个人",
      //     mark: 12,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2019~2020学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: 2020-1-28,
      //     type:"论文专利",
      //     level: "实用性专利",
      //     order:"第二作者",
      //     matter: "系统",
      //     describe: "系统牛逼",
      //     remarks:"我很强",
      //     mark: 20,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stuid:"20182131188",
      //     stu:'俊杰',
      //     id:127,
      //     scyear: "2019~2020学年",
      //     semester: "第二学期",
      //     module:"思想品德",
      //     time: 2020-3-28,
      //     type:"通报表扬",
      //     level: "",
      //     order:"",
      //     matter: "好人好事受到学院升旗仪式上通报表扬",
      //     describe: "系统牛逼",
      //     remarks:"我是个好人",
      //     mark: 2,
      //     prove:[
      //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //     ],
      //     sign:0,
      //     reason:undefined,
      //     manname:undefined,
      //     manid:undefined
      //   },
      // ]
    };
  },
  created() {
    this.StugetdaishenheList(this.$session.get("user"));
  },
  methods: {
    async StuTongguo(stuuser, tongguo) {
      const { data } = await stuTongguo(stuuser, tongguo);
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: "success",
        });
        this.StugetdaishenheList(this.$session.get("user"));
      } else
        this.$message({
          message: data.message,
          type: "error",
        });
    },
    async StuButongguo(recom, stuuser, tongguo) {
      const { data } = await stuButongguo(recom, stuuser, tongguo);
      if (data.code === 200) {
        this.$message({
          message: data.message,
          type: "success",
        });
        this.StugetdaishenheList(this.$session.get("user"));
      } else
        this.$message({
          message: data.message,
          type: "error",
        });
    },
    async StugetdaishenheList(stuuser) {
      const { data } = await stugetdaishenheList(stuuser);
      if (data.code === 200) {
        console.log(data.data.examineData);
        this.examineData = data.data.examineData;
      } else
        this.$message({
          message: data.message,
          type: "error",
        });
    },
    manadopt(tongguo) {
      this.StuTongguo(this.$session.get("user"), tongguo);
    },
    manfail(butongguo) {
      this.$prompt("请输入审核意见", "审核意见", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.StuButongguo(value, this.$session.get("user"), butongguo);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>

<style scoped></style>
