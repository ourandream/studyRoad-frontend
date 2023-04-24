<template>
  <div>
    <div>
      <el-container>
        <el-container style="width: 50%">
          <el-breadcrumb separator="》" style="padding-left:10px;font-size:15px;">
            <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>实践创新</el-breadcrumb-item>
            <el-breadcrumb-item>职务上报</el-breadcrumb-item>
            <el-breadcrumb-item>职务明细</el-breadcrumb-item>
          </el-breadcrumb>
        </el-container>
        <el-container style="text-align: right">
          <el-row >
            <el-button type="info" plain @click="reTurn" >返回</el-button>
          </el-row>
        </el-container>
      </el-container>
    </div>
    <el-container>
      <el-card class="postde">
        <el-table
          stripe
        :data="poData"
        border
          max-height="550px"
        style="width: 100%">

        <el-table-column
          prop="scyear"
          label="任职学年"
          sortable
          width="130">
        </el-table-column>
        <el-table-column
          label="任职学期"
          width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.semester===1">第一学期</div>
            <div v-if="scope.row.semester===2">第二学期</div>
            <div v-if="scope.row.semester===3">第一、二学期</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          sortable
          label="履职时间"
          width="105">
        </el-table-column>
          <el-table-column
            sortable
            width="105"
            label="岗位级别">
            <template slot-scope="scope">
              <div v-if="scope.row.level===1">一级岗位</div>
              <div v-if="scope.row.level===2">二级岗位</div>
              <div v-if="scope.row.level===3">三级岗位</div>
              <div v-if="scope.row.level===4">四级岗位</div>
              <div v-if="scope.row.level===5">五级岗位</div>
              <div v-if="scope.row.level===6">六级岗位</div>
              <div v-if="scope.row.level===7">七级岗位</div>
              <div v-if="scope.row.level===8">八级岗位</div>
              <div v-if="scope.row.level===9">九级岗位</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="organization"
            width="100"
            label="任职组织"
          >
          </el-table-column>

          <el-table-column
            prop="age"
            label="任职情况"
            width="140">
          </el-table-column>

          <el-table-column
            prop="poname"
            label="职务"
            width="100">
          </el-table-column>

          <el-table-column
            prop="mark"
            width="70"
            label="加分数">
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
            label="审核状态"
            width="80"
          >
            <template slot-scope="scope">
              <div><el-tag v-if="scope.row.sign===1" type="success" size="mini">通过</el-tag></div>
              <div><el-tag v-if="scope.row.sign===2" type="danger" size="mini">未通过</el-tag></div>
              <div><el-tag v-if="scope.row.sign===0" type="warning" size="mini">待审核</el-tag></div>

            </template>
          </el-table-column>

          <el-table-column
            prop="reason"
            label="审核意见">
          </el-table-column>

          <el-table-column
            label="操作"
            width="65"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.sign===0" style="padding-left: 10px" >
              <el-tooltip  placement="top" effect="light">
                <div slot="content" >删除</div>
                <el-popconfirm
                  title="确认删除该条上报数据？"
                  @confirm="postdel(scope.row.id)"
                >
                <el-button circle slot="reference" size="small" style="background-color: rgba(239,154,154,0.71)" icon="el-icon-delete"></el-button>
            </el-popconfirm>
              </el-tooltip>
            </span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-container>
  </div>
</template>

<script>
  import { deleterz, getauditdetails } from '@/api/taekeoffice'

  export default {
    name: 'takeoffice',
    data() {
      return{
        poData:undefined,
        // poData:[
        //   {id:123,
        //     scyear:"2021~2022学年",
        //     semester: "第一、二学期",
        //     time:"2021-9-1",
        //     level:"三级岗位",
        //     organization: "校团委",
        //     age: "满一学期未满半年",
        //     poname:"部长",
        //     mark: 12,
        //     prove:[
        //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //     ],
        //     sign:0,
        //     reason:"tql"
        //   },
        //   {id:123,
        //     scyear:"2021~2022学年",
        //     semester: "第一、二学期",
        //     time:"2021-8-1",
        //     level:"三级岗位",
        //     organization: "校团委",
        //     age: "满一学期未满半年",
        //     poname:"部长",
        //     mark: 12,
        //     prove:[
        //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //     ],
        //     sign:1,
        //     reason:"tql"
        //   },
        //
        //   {id:123,
        //     scyear:"2021~2022学年",
        //     semester: "第一、二学期",
        //     time:"2020-9-1",
        //     level:"四级岗位",
        //     organization: "校团委",
        //     age: "满一学期未满半年",
        //     poname:"部长",
        //     mark: 12,
        //     prove:[
        //       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //     ],
        //     sign:0,
        //     reason:"tql"
        //   },
        //
        // ]
      }
    },
    mounted () {
      var stunum=this.$session.get("user").stunum
      this.getAuditdetails(stunum)
    },
    methods:{
      async getAuditdetails(stunum){
        const { data }=await getauditdetails(stunum)
        console.log(data.data.poData)
        this.poData=data.data.poData
      },
      async dleteRz(rzid){
        const { data }=await deleterz(rzid)
        var code=data.code
        if(code===200)this.$message({
          showClose: true,
          message: '删除上报数据成功！',
          type: 'success'
        });
        else this.$message({
          showClose: true,
          message: '删除上报数据失败！',
          type: 'error'
        });
        var stunum=this.$session.get("user").stunum
        this.getAuditdetails(stunum)
      },
      reTurn(){
        this.$router.go(-1);
      },
      postdel(id)
      {
        this.dleteRz(id)
      },
    }
  }
</script>

<style scoped>
.postde{
  width: 1500px;
  height: 590px;
  margin-top: 1%;
  background: #fcfcfc url('../../../assets/bac/postde.png') no-repeat bottom right/ 25% auto;}

</style>
