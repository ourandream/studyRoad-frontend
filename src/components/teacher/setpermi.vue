<template>
  <div>
    <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
      <el-breadcrumb-item :to="{ path: '/TeaHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
    <el-container>
    <el-card style="width: 600px;height:610px;">
      <h4>学生管理员列表</h4>
      <el-row :gutter="15">
      <el-form ref="perUser" :model="perUser" :rules="rules" size="mini" label-width="50px">
        <el-col :span="12">
          <el-form-item label="学号" prop="number">
            <el-input v-model="perUser.number" placeholder="请输入学号" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-select v-model="perUser.grade" placeholder="请选择年级" clearable :style="{width: '100%'}">
              <el-option v-for="(item, index) in gradeOptions" :key="index" :label="item.label"
                         :value="item.value" :disabled="item.disabled"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="perUser.name" placeholder="请输入姓名" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button size="mini" type="primary" @click="searchper"icon="el-icon-search"></el-button>
          </el-form-item>
        </el-col>
      </el-form>
      </el-row>
      <el-table
        :data="administrators"
        border
        stripe
        size="small"
        height="400"
        style="width: 100%;text-align: center">

        <el-table-column
          prop="num"
          label="学号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="年级"
          width="70">
        </el-table-column>
        <el-table-column
          prop="experience"
          label="学生工作经历"
          width="110">
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
              <el-tooltip  placement="top" effect="light">
                <div slot="content" >移除</div>
                <el-popconfirm
                  title="确认移除该学生管理员？"
                  @confirm="del(scope.row)"
                >
                <el-button circle slot="reference" size="small" style="background-color: rgba(239,154,154,0.71)" icon="el-icon-delete"></el-button>
            </el-popconfirm>
              </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    </el-container>
      <img src="../../assets/permission.png" style="width: 300px;height:300px;padding-top: 8%">
    <el-container>
    <el-card style="width: 600px;height: 610px" >
      <h4>非管理员学生列表</h4>
      <el-row :gutter="15">
        <el-form ref="perUser" :model="inperUser" :rules="rules" size="mini" label-width="50px">
          <el-col :span="12">
            <el-form-item label="学号" prop="number">
              <el-input v-model="inperUser.number" placeholder="请输入学号" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
              <el-select v-model="inperUser.grade" placeholder="请选择年级" clearable :style="{width: '100%'}">
                <el-option v-for="(item, index) in gradeOptions2" :key="index" :label="item.label"
                           :value="item.value" :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="inperUser.name" placeholder="请输入姓名" clearable :style="{width: '100%'}">
              </el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button size="mini" type="primary" @click="searchstu"icon="el-icon-search"></el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-table
        :data="stu"
        border
        stripe
        size="small"
        height="400"
        style="width: 100%;text-align: center">

        <el-table-column
          prop="num"
          label="学号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="年级"
          width="70">
        </el-table-column>
        <el-table-column
          prop="experience"
          label="学生工作经历"
          width="110">
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-tooltip  placement="top" effect="light">
              <div slot="content" >添加为管理员</div>
              <el-popconfirm
                title="确认添加该学生为管理员？"
                @confirm="add(scope.row)"
              >
                <el-button circle slot="reference" size="small" style="background-color: rgba(189,243,131,0.71)" icon="el-icon-circle-plus-outline"></el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
    </el-container>
    </el-container>
  </div>
</template>

<script>
  import {stuperList,unstuperList,delStuper,addStuper} from '../../api/taekeoffice'
  export default {
    name: 'setpermi',
    data () {
      return {
        perUser: {
          number: undefined,
          name: undefined,
          grade: 0,
        },
        inperUser: {
          number: undefined,
          name: undefined,
          grade: 2018,
        },
        administrators:undefined,
        // administrators: [
        //   {
        //     num: '202152415',
        //     name: '徐强',
        //     grade:'2018级',
        //     experience:'学习委员  党支部书记'
        //   },
        //   {
        //     num: '2021587146',
        //     name: '张伟',
        //     grade:'2018级',
        //     experience:'团委副书记'
        //   },
        //   {
        //     num: '2021525447',
        //     name: '胡兰',
        //     grade:'2018级',
        //     experience:'学习委员'
        //   },
        //   {
        //     num: '202152525',
        //     name: '李倩',
        //     grade:'2021级',
        //     experience:'班长'
        //   },
        //   {
        //     num: '202152575',
        //     name: '张三',
        //     grade:'2020级',
        //     experience:'院组织部部长'
        //   },
        //   {
        //     num: '202152589',
        //     name: '李青',
        //     grade:'2021级',
        //     experience:'年级级长'
        //   },
        //   {
        //     num: '202152594',
        //     name: '胡奕',
        //     grade:'2020级',
        //     experience:'体育委员'
        //   },
        //   {
        //     num: '202152854',
        //     name: '涵义',
        //     grade:'2019级',
        //     experience:'团支书'
        //   },
        // ],
        stu:undefined,
        // stu: [
        //   {
        //     num: '202152410',
        //     name: '李华',
        //     grade:'2021级',
        //     experience:'学习委员'
        //   },
        //
        //   {
        //     num: '202152478',
        //     name: '李明',
        //     grade:'2021级',
        //     experience:'无'
        //   },
        //   {
        //     num: '202152445',
        //     name: '詹俊杰',
        //     grade:'2021级',
        //     experience:'无'
        //   },
        //   {
        //     num: '202152458',
        //     name: '李四级',
        //     grade:'2021级',
        //     experience:'无'
        //   },
        //   {
        //     num: '202152589',
        //     name: '黄一是',
        //     grade:'2021级',
        //     experience:'无'
        //   },{
        //     num: '202152741',
        //     name: '郑将',
        //     grade:'2021级',
        //     experience:'无'
        //   },{
        //     num: '202152785',
        //     name: '张妮',
        //     grade:'2021级',
        //     experience:'无'
        //   },
        //   {
        //     num: '202152468',
        //     name: '何里水',
        //     grade:'2021级',
        //     experience:'无'
        //   },
        //   {
        //     num: '202152462',
        //     name: '李明',
        //     grade:'2021级',
        //     experience:'无'
        //   },
        //   {
        //     num: '202152462',
        //     name: '李明',
        //     grade:'2021级',
        //     experience:'无'
        //   },
        //   {
        //     num: '202152462',
        //     name: '李明',
        //     grade:'2021级',
        //     experience:'无'
        //   },
        // ],
        gradeOptions: [
          {
            "label": "全部",
            "value": 0
          },
          {
          "label": "2021级",
          "value": 2021
        }, {
          "label": "2020级",
          "value": 2020
        }, {
          "label": "2019级",
          "value": 2019
        }, {
          "label": "2018级",
          "value": 2018
        }],
        gradeOptions2: [
          {
            "label": "2021级",
            "value": 2021
          }, {
            "label": "2020级",
            "value": 2020
          }, {
            "label": "2019级",
            "value": 2019
          }, {
            "label": "2018级",
            "value": 2018
          }],
      }
    },
    created () {
      this.StuperList(this.perUser)
      this.unStuperList(this.inperUser)
    },
    methods:{
      async StuperList(perUser) {
        const { data } = await stuperList(perUser)
        if(data.code===200)
        {
          this.administrators=data.data.administrators
        }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      async unStuperList(inperuser) {
        const { data } = await unstuperList(inperuser)
        if(data.code===200)
        {
          this.stu=data.data.stu
        }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      async DelStuper(stu) {
        const { data } = await delStuper(stu)
        if(data.code===200)
        {
          this.$message({
            message: data.message,
            type: 'success'
          });
          this.StuperList(this.perUser)
          this.unStuperList(this.inperUser)
        }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      async AddStuper(stu) {
        const { data } = await addStuper(stu)
        if(data.code===200)
        {
          this.$message({
            message: data.message,
            type: 'success'
          });
          this.StuperList(this.perUser)
          this.unStuperList(this.inperUser)
        }
        else this.$message({
          message: data.message,
          type: 'error'
        });
      },
      searchper(){
        this.StuperList(this.perUser)
      },
      searchstu(){
        this.unStuperList(this.inperUser)
      },
      del(Stu){
        this.DelStuper(Stu)
      },
      add(Stu){
        this.AddStuper(Stu)
      }
    }
  }
</script>

<style scoped>

</style>
