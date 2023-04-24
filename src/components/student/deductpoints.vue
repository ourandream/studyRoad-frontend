<template>
  <div>
    <div>
          <el-breadcrumb separator="》" style="padding-left:10px;font-size:15px;">
            <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>违纪扣分</el-breadcrumb-item>
          </el-breadcrumb>
    </div>
    <el-container>
      <el-card class="deduct">
        <el-table
          stripe
          :data="deductData"
          border
          max-height="550px"
          style="width: 100%">

          <el-table-column
            prop="scyear"
            label="扣分学年"
            sortable
            width="150">
          </el-table-column>

          <el-table-column
            label="扣分学期"
            width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.semester===1">第一学期</div>
              <div v-if="scope.row.semester===2">第二学期</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="time"
            sortable
            label="扣分时间"
            width="150">
          </el-table-column>

          <el-table-column
            sortable
            width="150"
            label="扣分模块">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.module==='思想品德'" size="mini">思想品德</el-tag>
              <el-tag  v-if="scope.row.module==='艺体素养'" type="warning" size="mini">艺体素养</el-tag>
              <el-tag  v-if="scope.row.module==='实践创业'" type="info" size="mini">实践创业</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="matter"
            width="150"
            label="扣分事项"
          >
          </el-table-column>

          <el-table-column
            prop="describe"
            label="扣分描述"
            >
          </el-table-column>

          <el-table-column
            prop="remarks"
            label="备注"
            width="150">
          </el-table-column>

          <el-table-column
            prop="mark"
            width="70"
            label="扣分数">
            <template slot-scope="scope">
              <div><el-tag  type="danger" size="mini">-{{scope.row.mark}}</el-tag></div>
            </template>
          </el-table-column>

        </el-table>
      </el-card>
    </el-container>
  </div>
</template>

<script>
  import { stugetdepointList } from '../../api/Users'
  export default {
    name: 'deductpoints',
    data(){
      return{
        deductData:undefined,
        // deductData:[
        //   {
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
        // ]
      }
    },
  created () {
      this.StugetdepointList(this.$session.get("user"))
  },
    methods:{
    async StugetdepointList(user) {
      const { data } = await stugetdepointList(user)
      if(data.code===200)
      {
        this.deductData=data.data.deductData
      }
      else this.$message({
        message: data.message,
        type: 'error'
      });
    },
  }}
</script>

<style scoped>
  .deduct{
    width: 1500px;
    height: 600px;
    margin-top: 2%;
    background: #fcfcfc url('../../assets/bac/reduce.png') no-repeat bottom right/ 25% auto;}
</style>
