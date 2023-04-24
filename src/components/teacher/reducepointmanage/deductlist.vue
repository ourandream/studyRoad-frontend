<template>
  <div>
    <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
      <el-breadcrumb-item :to="{ path: '/TeaHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>扣分管理</el-breadcrumb-item>
      <el-breadcrumb-item>违纪扣分</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="depoint">
      <!--      查询条件区-->
          <el-row :gutter="0">
            <el-form ref="depointFind" :model="depointFind" :rules="rules" size="mini" label-width="100px">
              <el-col :span="7">
                <el-form-item label="年级" prop="degrade">
                  <el-select v-model="depointFind.degrade" placeholder="请选择年级" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in degradeOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="姓名" prop="dename">
                  <el-input v-model="depointFind.dename" placeholder="请输入扣分学生姓名" clearable :style="{width: '100%'}">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="学年" prop="descyear">
                  <el-select v-model="depointFind.descyear" placeholder="请选择扣分学年" clearable
                             :style="{width: '100%'}">
                    <el-option v-for="(item, index) in descyearOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="学期" prop="desemester">
                  <el-select v-model="depointFind.desemester" placeholder="请选择扣分学期" clearable
                             :style="{width: '100%'}">
                    <el-option v-for="(item, index) in desemesterOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="模块" prop="demodule">
                  <el-select v-model="depointFind.demodule" placeholder="请选择扣分模块" clearable
                             :style="{width: '100%'}">
                    <el-option v-for="(item, index) in demoduleOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
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
        :data="deData"
        border
        stripe
        size="mini"
        max-height="465px"
        style="width: 100%;height: 465px;text-align: center">
        <el-table-column
          label="年级"
          sortable
          width="70"
        >
          <template slot-scope="scope">
            <div>{{scope.row.stugrade}}级</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="stuname"
          label="姓名"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="stunum"
          label="学号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="scyear"
          label="学年"
          width="120"
          sortable>
        </el-table-column>
        <el-table-column
          label="学期"
          width="80"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.semester===1">第一学期</div>
            <div v-if="scope.row.semester===2">第二学期</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="90"
        >
        </el-table-column>
        <el-table-column
          prop="module"
          label="模块"
          width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.module==='思想品德'" size="mini">思想品德</el-tag>
            <el-tag  v-if="scope.row.module==='艺体素养'"type="warning" size="mini">艺体素养</el-tag>
            <el-tag  v-if="scope.row.module==='实践创业'"type="info" size="mini">实践创业</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="matter"
          label="扣分事项"
          width="130">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="扣分简介"
        >
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="扣分备注"
          width="130">
        </el-table-column>
        <el-table-column
          prop="mark"
          label="扣分数"
          sortable
          width="100">
          <template slot-scope="scope">
            <el-tag type="danger" size="mini">-{{scope.row.mark}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  import {  teagetdepointList } from '../../../api/Users'
  export default {

    name: 'deductlist',
    data() {
      return {
        deData:undefined,
        // deData:[
        //   {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   },
        //   {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   }, {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   }, {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   }, {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   }, {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   }, {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   }, {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   }, {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   }, {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   }, {
        //     stuname:'黎明',
        //     stunum:'2018415252',
        //     stugrade:'2018级',
        //     id: 123,
        //     scyear: '2021~2022学年',
        //     semester: '第二学期',
        //     time: '2022-3-1',
        //     module:"思想品德",
        //     matter: '升旗仪式不来',
        //     describe: '周一早上升旗仪式缺席',
        //     remarks: '坏人',
        //     mark: -2,
        //   },
        //   {
        //     stuname:'苏娟',
        //     stunum:'2020415252',
        //     stugrade:'2020级',
        //     id: 123,
        //     scyear: '2020~2021学年',
        //     semester: '第二学期',
        //     time: '2020-9-1',
        //     module:"艺体素养",
        //     matter: '不参加活动',
        //     describe: '不参加合唱活动',
        //     remarks: '坏人',
        //     mark: -9,
        //   },
        //
        // ],

        depointFind: {
          degrade: 0,
          dename: undefined,
          descyear: "0",
          desemester: 0,
          demodule: 0,
        },
        rules: {
          degrade: [],
          dename: [],
          descyear: [],
          desemester: [],
          demodule: [],
        },
        degradeOptions: [
          {
          "label": "全部",
          "value": 0
        },
          {
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
        descyearOptions: [
          {
          "label": "全部",
          "value": "0",
        }, {
          "label": "2021~2022学年",
          "value": "2021~2022学年",
        }, {
          "label": "2020~2021学年",
          "value": "2020~2021学年",
        }, {
          "label": "2019~2020学年",
          "value": "2019~2020学年",
        }, {
          "label": "2018~2019学年",
          "value": "2018~2019学年",
        }],
        desemesterOptions: [
          {
          "label": "全部",
          "value": 0
        }, {
          "label": "第一学期",
          "value": 1
        }, {
          "label": "第二学期",
          "value": 2
        }],
        demoduleOptions: [
          {
          "label": "全部",
          "value": 0
        },
          {
          "label": "思想品德",
          "value": 1
        }, {
          "label": "艺体素养",
          "value": 2
        }, {
          "label": "实践创业",
          "value": 3
        }],
      }
    },
    computed: {},
    watch: {},
    created() {
      this.TeagetdepointList(this.depointFind)
    },
    mounted() {},
    methods: {
      async TeagetdepointList(depointFind) {
        const { data } = await teagetdepointList(depointFind)
        if(data.code===200)
        {
        this.deData=data.data.deData
        }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      submitForm() {
        this.$refs['depointFind'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          this.TeagetdepointList(this.depointFind)
        })
      },
      resetForm() {
        this.$refs['depointFind'].resetFields()
      },
    }
  }
</script>

<style>
  .depoint{
    height: 100%;
    background: #fcfcfc url('../../../assets/bac/cheer.png') no-repeat top  right/ 20% auto;
  }
</style>
