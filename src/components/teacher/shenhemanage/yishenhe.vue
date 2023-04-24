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
      <el-breadcrumb-item>审核管理</el-breadcrumb-item>
      <el-breadcrumb-item>已审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="yishen">
      <!--      查询条件区-->
      <el-row :gutter="0">
        <el-form
          ref="yishenFind"
          :model="yishenFind"
          :rules="rules"
          size="small"
          label-width="100px"
        >
          <el-col :span="4">
            <el-form-item label="年级" prop="degrade">
              <el-select
                v-model="yishenFind.degrade"
                placeholder="请选择年级"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in degradeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学年" prop="descyear">
              <el-select
                v-model="yishenFind.descyear"
                placeholder="请选择扣分学年"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in descyearOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="模块" prop="demodule">
              <el-select
                v-model="yishenFind.demodule"
                placeholder="请选择扣分模块"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in demoduleOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="审核状态" prop="state">
              <el-select
                v-model="yishenFind.state"
                placeholder="请选择审核状态"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in stateOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
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

      <!--      表格-->
      <el-table
        :data="yiData"
        border
        stripe
        size="mini"
        height="510px"
        max-height="510px"
        style="width: 100%"
      >
        <el-table-column label="年级" fixed sortable width="80">
          <template slot-scope="scope">
            <div>{{ scope.row.stugrade }}级</div>
          </template>
        </el-table-column>
        <el-table-column prop="stu" label="姓名" fixed width="70">
        </el-table-column>
        <el-table-column prop="stuid" label="学号" width="100">
        </el-table-column>
        <el-table-column prop="scyear" sortable width="120" label="加分学年">
        </el-table-column>
        <el-table-column label="加分学期" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.semester === 1">第一学期</div>
            <div v-if="scope.row.semester === 2">第二学期</div>
            <div v-if="scope.row.semester === 3">第一、二学期</div>
          </template>
        </el-table-column>
        <el-table-column prop="module" label="加分模块" width="120">
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
            <el-tag
              v-if="scope.row.module === '职务加分'"
              style="background-color: rgba(14, 238, 116, 0.22)"
              size="mini"
              >职务加分</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="time" label="加分项日期" width="120">
        </el-table-column>
        <el-table-column prop="type" label="加分类型" width="120">
        </el-table-column>
        <el-table-column label="级别" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.level === 1">一级岗位</div>
            <div v-else-if="scope.row.level === 2">二级岗位</div>
            <div v-else-if="scope.row.level === 3">三级岗位</div>
            <div v-else-if="scope.row.level === 4">四级岗位</div>
            <div v-else-if="scope.row.level === 5">五级岗位</div>
            <div v-else-if="scope.row.level === 6">六级岗位</div>
            <div v-else-if="scope.row.level === 7">七级岗位</div>
            <div v-else-if="scope.row.level === 8">八级岗位</div>
            <div v-else-if="scope.row.level === 9">九级岗位</div>
            <div v-else>{{ scope.row.level }}</div>
          </template>
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

        <el-table-column label="审核意见" prop="reason" width="180">
        </el-table-column>

        <el-table-column label="审核状态" fixed="right" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.sign === 1" type="success">通过</el-tag>
            <el-tag v-if="scope.row.sign === 2" type="danger">未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审核人" prop="manname" fixed="right" width="70">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { teagetyishenheList } from "../../../api/Users";
export default {
  name: "yishenhe",
  data() {
    return {
      yiData: undefined,
      // yiData:[
      //   {
      //     stugrade:'2018级',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:"梳打饼",
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2019级',
      //     stuid:"20191251210",
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
      //     sign:2,
      //     reason:"材料不完整",
      //     manname:"洒出大V",
      //     manid:undefined
      //   },
      //   {stugrade:'2020级',
      //     stuid:"20202131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2020~2021学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: "2021-1-28",
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:"场地SV发 ",
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2021级',
      //     stuid:"20212185430",
      //     stu:'李将',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:"啥东窗事发vd",
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2018级',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2019级',
      //     stuid:"20191251210",
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
      //     sign:2,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {stugrade:'2020级',
      //     stuid:"20202131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2020~2021学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: "2021-1-28",
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2021级',
      //     stuid:"20212185430",
      //     stu:'李将',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2018级',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2019级',
      //     stuid:"20191251210",
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
      //     sign:2,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {stugrade:'2020级',
      //     stuid:"20202131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2020~2021学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: "2021-1-28",
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2021级',
      //     stuid:"20212185430",
      //     stu:'李将',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2018级',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2019级',
      //     stuid:"20191251210",
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
      //     sign:2,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {stugrade:'2020级',
      //     stuid:"20202131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2020~2021学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: "2021-1-28",
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2021级',
      //     stuid:"20212185430",
      //     stu:'李将',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2018级',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2019级',
      //     stuid:"20191251210",
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
      //     sign:2,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {stugrade:'2020级',
      //     stuid:"20202131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2020~2021学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: "2021-1-28",
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2021级',
      //     stuid:"20212185430",
      //     stu:'李将',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2018级',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2019级',
      //     stuid:"20191251210",
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
      //     sign:2,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {stugrade:'2020级',
      //     stuid:"20202131157",
      //     stu:'华生',
      //     id:124,
      //     scyear: "2020~2021学年",
      //     semester: "第一学期",
      //     module:"科研竞赛",
      //     time: "2021-1-28",
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //   {
      //     stugrade:'2021级',
      //     stuid:"20212185430",
      //     stu:'李将',
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
      //     sign:1,
      //     reason:"材料不完整",
      //     manname:undefined,
      //     manid:undefined
      //   },
      //
      // ],
      yishenFind: {
        degrade: 0,
        descyear: "0",
        demodule: 0,
        state: 0,
      },
      rules: {
        degrade: [],
        descyear: [],
        demodule: [],
      },
      degradeOptions: [
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
      descyearOptions: [
        {
          label: "全部",
          value: "0",
        },
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
      demoduleOptions: [
        {
          label: "全部",
          value: 0,
        },
        {
          label: "思想品德",
          value: 1,
        },
        {
          label: "科研竞赛",
          value: 2,
        },
        {
          label: "艺体素养",
          value: 3,
        },
        {
          label: "实践创业",
          value: 4,
        },
        {
          label: "职务加分",
          value: 5,
        },
      ],
      stateOptions: [
        {
          label: "全部",
          value: 0,
        },
        {
          label: "通过",
          value: 1,
        },
        {
          label: "不通过",
          value: 2,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.TeagetyishenheList(this.yishenFind);
  },
  mounted() {},
  methods: {
    async TeagetyishenheList(yishenFind) {
      const { data } = await teagetyishenheList(yishenFind);
      if (data.code === 200) {
        this.yiData = data.data.yiData;
      } else
        this.$message({
          message: data.message,
          type: "error",
        });
    },
    submitForm() {
      this.$refs["yishenFind"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        this.TeagetyishenheList(this.yishenFind);
      });
    },
    resetForm() {
      this.$refs["yishenFind"].resetFields();
    },
  },
};
</script>

<style>
.yishen {
  height: 100%;
  background: #fcfcfc url("../../../assets/bac/yishen.png") no-repeat top right/
    10% auto;
}
</style>
