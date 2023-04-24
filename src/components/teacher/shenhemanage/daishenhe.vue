<template>
  <div>
    <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
      <el-breadcrumb-item :to="{ path: '/TeaHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审核管理</el-breadcrumb-item>
      <el-breadcrumb-item>待审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="daishen">
      <!--      查询条件区-->
      <el-row :gutter="0">
        <el-form ref="daishenFind" :model="daishenFind" :rules="rules" size="small" label-width="100px">
          <el-col :span="6">
            <el-form-item label="年级" prop="degrade">
              <el-select v-model="daishenFind.degrade" placeholder="请选择年级" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in degradeOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名" prop="stuname">
              <el-input v-model="daishenFind.stuname" placeholder="请输入查询姓名" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="模块" prop="demodule">
              <el-select v-model="daishenFind.demodule" placeholder="请选择扣分模块" clearable
                         :style="{width: '100%'}">
                <el-option v-for="(item, index) in demoduleOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item size="large" style="text-align: left;">
              <el-button size="small" type="primary" @click="submitForm" icon="el-icon-search">查询</el-button>
              <span style="margin-left: 10%">
              <el-button size="small" @click="resetForm" type="success" icon="el-icon-refresh">重置</el-button>
                </span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <!--表格-->
      <el-table
        :data="daishenData"
        border
        stripe
        size="mini"
        height="510px"
        max-height="510px"
        style="width: 100%;">
        <el-table-column
          label="年级"
          fixed
          sortable
          width="80">
          <template slot-scope="scope">
            <div>{{scope.row.stugrade}}级</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="stu"
          label="姓名"
          fixed
          width="70">
        </el-table-column>
        <el-table-column
          prop="stuid"
          label="学号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="scyear"
          sortable
          width="120"
          label="加分学年">
        </el-table-column>
        <el-table-column
          label="加分学期"
          width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.semester===1">第一学期</div>
            <div v-if="scope.row.semester===2">第二学期</div>
            <div v-if="scope.row.semester===3">第一、二学期</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="module"
          label="加分模块"
          width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.module==='思想品德'" size="mini">思想品德</el-tag>
            <el-tag  v-if="scope.row.module==='艺体素养'"type="warning" size="mini">艺体素养</el-tag>
            <el-tag v-if="scope.row.module==='实践创业'" style="background-color: rgba(231,129,19,0.22)" size="mini">实践创业</el-tag>
            <el-tag v-if="scope.row.module==='科研竞赛'" style="background-color: rgba(208,46,236,0.22)" size="mini">科研竞赛</el-tag>
            <el-tag v-if="scope.row.module==='职务加分'" style="background-color: rgba(14,238,116,0.22)" size="mini">职务加分</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="加分项日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type"
          label="加分类型"
          width="120">
        </el-table-column>
        <el-table-column
          label="级别"
          width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.level===1">一级岗位</div>
            <div v-else-if="scope.row.level===2">二级岗位</div>
            <div v-else-if="scope.row.level===3">三级岗位</div>
            <div v-else-if="scope.row.level===4">四级岗位</div>
            <div v-else-if="scope.row.level===5">五级岗位</div>
            <div v-else-if="scope.row.level===6">六级岗位</div>
            <div v-else-if="scope.row.level===7">七级岗位</div>
            <div v-else-if="scope.row.level===8">八级岗位</div>
            <div v-else-if="scope.row.level===9">九级岗位</div>
            <div v-else>{{scope.row.level}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="order"
          label="等次"
          width="120">
        </el-table-column>
        <el-table-column
          prop="matter"
          label="加分项"
          width="180">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="加分项简介"
          width="220">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="加分项备注"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mark"
          sortable
          label="加分数"
          width="100">
          <template slot-scope="scope">
            <el-tag type="success" size="mini">{{scope.row.mark}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="证明材料"
          width="100"
        >
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
        <el-table-column
          label="审核"
          fixed="right"
          width="120"
        >
          <template slot-scope="scope">
              <span  style="padding-left: 10px" >
              <el-tooltip  placement="top" effect="light">
                <div slot="content" >通过</div>
                <el-popconfirm
                  title="确认审核通过该条上报数据？"
                  @confirm="daimanadopt(scope.row)"
                >
                <el-button circle slot="reference" size="small" style="background-color: rgba(170,245,174,0.71)" icon="el-icon-circle-check"></el-button>
            </el-popconfirm>
              </el-tooltip>
            </span>
            <span style="padding-left: 10px" >
              <el-tooltip  placement="top" effect="light">
                <div slot="content" >不通过</div>
                    <el-button circle @click="daimanfail(scope.row)"  size="small" style="background-color: rgba(241,141,141,0.71)" icon="el-icon-circle-close"></el-button>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import { teagetdaishenheList, teaTongguo,teaButongguo} from '../../../api/Users'
  export default {
    name: 'daishenhe',
    data() {
      return {
        daishenData:undefined,
        // daishenData:[
        //   {
        //   stugrade:'2018级',
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
        //   {stugrade:'2020级',
        //     stuid:"20202131157",
        //     stu:'华生',
        //     id:124,
        //     scyear: "2020~2021学年",
        //     semester: "第一学期",
        //     module:"科研竞赛",
        //     time:" 2021-1-28",
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
        //     stugrade:'2020级',
        //     stuid:"20202131130",
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
        //     stugrade:'2019级',
        //     stuid:"20192131210",
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
        //     stugrade:'2018级',
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
        //   {stugrade:'2018级',
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
        //   {stugrade:'2018级',
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
        //   {stugrade:'2020级',
        //     stuid:"20202131157",
        //     stu:'华生',
        //     id:124,
        //     scyear: "2020~2021学年",
        //     semester: "第一学期",
        //     module:"科研竞赛",
        //     time:" 2021-1-28",
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
        //     stugrade:'2020级',
        //     stuid:"20202131130",
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
        //     stugrade:'2019级',
        //     stuid:"20192131210",
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
        //     stugrade:'2018级',
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
        //   {stugrade:'2018级',
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
        //   {stugrade:'2018级',
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
        //   {stugrade:'2020级',
        //     stuid:"20202131157",
        //     stu:'华生',
        //     id:124,
        //     scyear: "2020~2021学年",
        //     semester: "第一学期",
        //     module:"科研竞赛",
        //     time:" 2021-1-28",
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
        //   },  {
        //     stugrade:'2020级',
        //     stuid:"20202131130",
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
        //     stugrade:'2019级',
        //     stuid:"20192131210",
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
        //     stugrade:'2018级',
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
        //   {stugrade:'2018级',
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
        //   {stugrade:'2018级',
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
        //   {stugrade:'2020级',
        //     stuid:"20202131157",
        //     stu:'华生',
        //     id:124,
        //     scyear: "2020~2021学年",
        //     semester: "第一学期",
        //     module:"科研竞赛",
        //     time:" 2021-1-28",
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
        // ],
        daishenFind: {
          degrade: 0,
          stuname: undefined,
          demodule: 0,
        },
        rules: {
          degrade: [],
          stuname: [],
          demodule: [],
        },
        degradeOptions: [
          {
          "label": "全部",
          "value": 0
        }, {
          "label": "2021级",
          "value": 2021,
        }, {
          "label": "2020级",
          "value": 2020,
        }, {
          "label": "2019级",
          "value": 2019,
        }, {
          "label": "2018级",
          "value": 2018,
        }],
        demoduleOptions: [
          {
          "label": "全部",
          "value": 0
        }, {
          "label": "思想品德",
          "value": 1
        },
          {
            "label": "科研竞赛",
            "value": 2
          }, {
          "label": "艺体素养",
          "value": 3
        }, {
          "label": "实践创业",
          "value": 4
        },
          {
            "label": "职务加分",
            "value": 5
          }
        ],
      }
    },
    computed: {},
    watch: {},
    created() {this.TeagetdaishenheList(this.daishenFind)},
    mounted() {},
    methods: {
      async TeaTongguo(teauser,tongguo) {
        const { data } = await teaTongguo(teauser,tongguo)
        if(data.code===200)
        {
          this.$message({
            message: data.message,
            type: 'success'
          });
          this.TeagetdaishenheList(this.daishenFind)
        }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      async TeaButongguo(recom,teauser,tongguo) {
        const { data } = await teaButongguo(recom,teauser,tongguo)
        if(data.code===200)
        {
          this.$message({
            message: data.message,
            type: 'success'
          });
          this.TeagetdaishenheList(this.daishenFind)
        }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      async TeagetdaishenheList(daishenFind) {
        const { data } = await teagetdaishenheList(daishenFind)
        if(data.code===200)
        {
          this.daishenData=data.data.daishenData
        }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      daimanadopt(tongguo) {
       this.TeaTongguo(this.$session.get("user"),tongguo)
      },
      daimanfail(butongguo) {
        this.$prompt('请输入审核意见', '审核意见', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.TeaButongguo(value,this.$session.get("user"),butongguo)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });


      },
      submitForm() {
        this.$refs['daishenFind'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          this.TeagetdaishenheList(this.daishenFind)
        })
      },
      resetForm() {
        this.$refs['daishenFind'].resetFields()
      },
    }
  }
</script>

<style>
  .daishen{
    height: 100%;
    background: #fcfcfc url('../../../assets/bac/daishenhe.png') no-repeat top  right/ 7% auto;
  }
</style>
