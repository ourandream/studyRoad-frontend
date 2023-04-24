<template>
  <div>
    <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
      <el-breadcrumb-item :to="{ path: '/TeaHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户列表卡片区 -->
    <el-card style="height: 100%;">
<!--      查询条件区-->
      <el-container>
      <el-container>
      <el-row :gutter="15">
        <el-form ref="StuSer" :model="StuSer" :rules="rules" size="small" label-width="100px">
          <el-col :span="8">
            <el-form-item label="学号" prop="Num">
              <el-input v-model="StuSer.Num" placeholder="请输入学号" clearable prefix-icon='el-icon-s-help'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="年级" prop="Grade">
              <el-select v-model="StuSer.Grade" placeholder="请选择年级" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in GradeOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="Name">
              <el-input v-model="StuSer.Name" placeholder="请输入姓名" clearable prefix-icon='el-icon-s-help'
                        :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="Major">
              <el-select v-model="StuSer.Major" placeholder="请选择专业" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in MajorOptions" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="Sex">
              <el-radio-group v-model="StuSer.Sex" size="medium">
                <el-radio v-for="(item, index) in SexOptions" :key="index" :label="item.value"
                          :disabled="item.disabled">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item size="large" style="text-align: left;">
              <el-button size="small" type="primary" @click="submitForm" icon="el-icon-search">查询</el-button>
              <span style="margin-left: 10%">
              <el-button size="small" @click="stuuseradd" type="success" icon="el-icon-circle-plus-outline">添加</el-button>
                </span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      </el-container>
        <el-container>
          <img src="../../assets/stuuser.png" style="height: 120px;width: 120px;">
        </el-container>
      </el-container>
      <!--表格-->
      <el-table
        :data="stuList"
        border
        stripe
        max-height="415px"
        style="width: 100%;height: 415px;text-align: center">
        <el-table-column
          prop="stunum"
          label="学号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="stuname"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="stusex"
          label="性别"
        width="60">
          <template slot-scope="scope">
            <span v-if="scope.row.stusex===1" >男</span>
            <span v-if="scope.row.stusex===2">女</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="stupoliticaloutlook"
          label="政治面貌"
          width="100">
        </el-table-column>
        <el-table-column
          prop="stugrade"
          label="年级"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="stumajor"
          label="专业"
         >
        </el-table-column>
        <el-table-column
          prop="stuemail"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="stuinstructor"
          label="辅导员"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          >
          <template slot-scope="scope">
            <el-tooltip  placement="top" effect="light">
              <div slot="content" >详细</div>
              <el-button circle size="small" style="background-color: #ffecec" icon="el-icon-document" @click="detail(scope.row)"></el-button>
            </el-tooltip>

            <el-tooltip  placement="top" effect="light">
              <div slot="content" >修改</div>
              <el-button circle size="small" style="background-color: #daf6ec" icon="el-icon-setting" @click="modify(scope.row)"></el-button>
            </el-tooltip>
            <span style="padding-left: 10px">
              <el-tooltip  placement="top" effect="light">
                <div slot="content" >删除</div>
                <el-popconfirm
                  title="确认删除该学生？"
                  @confirm="del(scope.row)"
                >
                <el-button circle slot="reference" size="small" style="background-color: rgba(239,154,154,0.71)" icon="el-icon-delete"></el-button>
            </el-popconfirm>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[6, 10, 20, 30,100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { Findstulist,deleteStu } from '@/api/Users'

  export default {
    name: 'stulist',
    data () {
      return {
        //每页显示的条数
        pageSize: 6,
        //总条数
        total:undefined,
        //当前页码
        current: 1,
        radio: '1',
        stuList:[],
        formInline: {
          user: '',
          region: '',
          name: ''
        },
        StuSer: {
          Num:"",
          Name:"",
          Sex: 0,
          Grade: 0,
          Major: "0",
        },
        rules: {
          Num: [],
          Name: [],
          Sex: [],
          Grade: [],
          Major: [],
        },
        SexOptions: [
          {
          "label": "全部",
          "value": 0
        }, {
          "label": "男",
          "value": 1
        }, {
          "label": "女",
          "value": 2
        }],
        GradeOptions: [
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
        MajorOptions: [
          {
          "label": "全部",
          "value": "0"
        }, {
          "label": "计算机科学与技术（师范）",
          "value": "计算机科学与技术（师范）",
        }, {
          "label": "计算机科学与技术",
          "value": "计算机科学与技术",
        }, {
          "label": "网络工程",
          "value": "网络工程",
        }, {
          "label": "人工智能",
          "value": "人工智能",
        }],
      }

    },
    created () {
      this.getstulist();
    },
    methods: {
      async getstulist(){
        const { data } =await Findstulist(this.current,this.pageSize,
          this.StuSer.Num,this.StuSer.Name,this.StuSer.Sex,
          this.StuSer.Grade,this.StuSer.Major);
        this.stuList=data.data.records;
        console.log(this.stuList)
        console.log(this.StuSer)
        this.total=data.data.total;
      },
      async deleteStu(stu)
      {
        const { data } =await deleteStu(stu)
        if(data.code===200)
        { this.$message({
            message: '学生已经成功删除！',
            type: 'success'
          });
          this.getstulist();}
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      onSubmit () {
        console.log('submit!')
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val;
        this.getstulist();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.current=val
        this.getstulist();
      },
      detail(info){
        console.log(info)
        this.$router.push({
          path: '/stuDetail',
          query:{info:info}})
  },
      del(stu){
        this.deleteStu(stu)
      },
      modify(stuinfo){
        this.$router.push({
          path: '/modifyStu',
          query:{stuinfo:stuinfo}})
      },
      submitForm() {
        this.$refs['StuSer'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          this.getstulist();
        })
      },
      stuuseradd(){
        this.$router.push('/stuAdd');
      }
    }
  }
</script>

<style scoped>

</style>
