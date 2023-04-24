<template>
  <div>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
               select="handleSelect"
               router=true default-active="/stuInfo"
               background-color="#E9EEF3">
        <el-menu-item index="/stuInfo">基本信息</el-menu-item>
        <el-menu-item index="/modifyPa" >修改密码</el-menu-item>
      </el-menu>
    </div>
    <el-card class="box-card" style="margin-top: 1%;padding-bottom: 6%">
      <el-container>
        <el-container>
          <img src="../../assets/approveprofile.png" style="height: 300px;margin-top: 15%">
        </el-container>
        <el-container>
          <el-descriptions class="margin-top" title="个人基本信息" :column="3"  border  style="width: 900px">
            <template slot="extra" >
              <el-button type="primary" size="small" @click="changestuinfo">信息修改</el-button>
            </template>

            <el-descriptions-item >
              <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          学号</span>
              </template>
              {{Student.number}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label" >
           <span class="item">
          <i class="zc-iconxingming"></i>
             姓名</span>
              </template>
              {{Student.name}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label" >
           <span class="item">
          <i class="zc-iconxingbie"></i>
             性别</span>
              </template>
              <span v-if="Student.sex===1">男</span>
              <span v-if="Student.sex===2">女</span>
            </el-descriptions-item>

            <el-descriptions-item >
              <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          年级</span>
              </template>
              <div v-if="Student.grade!=null">{{Student.grade}}级</div>
            </el-descriptions-item>

            <el-descriptions-item >
              <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          班级</span>
              </template>
              {{Student.class}}
            </el-descriptions-item>

            <el-descriptions-item >
              <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          专业</span>
              </template>
              {{Student.major}}
            </el-descriptions-item>


            <el-descriptions-item>
              <template slot="label" >
           <span class="item">
          <i class="zc-iconminzu"></i>
             民族</span>
              </template>
              {{Student.nation}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label" >
           <span class="item">
          <i class="zc-iconjia"></i>
             籍贯</span>
              </template>
              {{Student.naPlace}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label" >
           <span class="item">
          <i class="zc-iconzhengzhi"></i>
             政治面貌</span>
              </template>
              {{Student.poLook}}
            </el-descriptions-item>

            <el-descriptions-item >
              <template slot="label" >
           <span class="item">
          <i class="zc-iconidcard"></i>
             身份证</span>
              </template>
              {{Student.idcard}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
           <span class="item">
          <i class="el-icon-user"></i>
             出生日期</span>
              </template>
              {{Student.birthDate}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label" >
           <span class="item">
          <i class="zc-icondianhua"></i>
             电话</span>
              </template>
              {{Student.phone}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label" >
           <span class="item">
          <i class="zc-iconyouxiang"></i>
             邮箱</span>
              </template>
              {{Student.email}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label" >
           <span class="item">
          <i class="zc-iconweixin"></i>
             微信号</span>
              </template>
              {{Student.wechat}}
            </el-descriptions-item>

            <el-descriptions-item >
              <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          宿舍</span>
              </template>
              {{Student.dorm}}
            </el-descriptions-item>

            <el-descriptions-item >
              <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          辅导员</span>
              </template>
              {{Student.teacher}}
            </el-descriptions-item>

            <el-descriptions-item >
              <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          辅导员联系方式</span>
              </template>
              {{Student.teaphone}}
            </el-descriptions-item>

            <el-descriptions-item >
              <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          学籍状态</span>
              </template>
              <el-tag v-if="Student.state===1" size="small">在读</el-tag>
              <el-tag v-if="Student.state===2" size="small">休学</el-tag>
              <el-tag v-if="Student.state===3" size="small">保留学籍</el-tag>
              <el-tag v-if="Student.state===4" size="small">待审核</el-tag>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label" > <span class="item">

          <i class="zc-iconbeizhu"></i>
          备注</span>
              </template>
              <el-tag size="small">学校</el-tag>
              <span style="padding-left: 20px;">
        <el-tag size="small" type="success" >学生</el-tag></span>
            </el-descriptions-item>
          </el-descriptions>
        </el-container>
      </el-container>
      <ModifyInfo
        :dialogFormVisible="this.dialogFormVisible"
        :Student="this.Student"
        @ChangedialogstuFormVisible="ChangedialogstuFormVisible"
        @getinfo="getinfo"
     >
      </ModifyInfo>
    </el-card>
  </div>
</template>

<script>
  import ModifyInfo from './modifyinfo'

  export default {
    name: 'stuinfo',
    components:{ModifyInfo},
    data(){
      return {
        dialogFormVisible:false,
        Student:{
          number: undefined,
          name: undefined,
          sex:undefined,
          grade:undefined,
          class:undefined,
          major:undefined,
          dorm:undefined,
          idcard:undefined,
          nation:undefined,
          naPlace:undefined,
          poLook:undefined,
          birthDate:undefined,
          phone:undefined,
          email:undefined,
          wechat:undefined,
          teacher:undefined,
          teaphone:undefined,
          state:undefined,
        }
      }
    },
    created () {
     this.getinfo()
    },
    methods: {
      getinfo(){
        this.Student.number=this.$session.get("user").stunum
        this.Student.name=this.$session.get("user").stuname
        this.Student.grade=this.$session.get("user").stugrade
        this.Student.idcard=this.$session.get("user").stuidcard
        this.Student.class=this.$session.get("user").stuclass
        this.Student.major=this.$session.get("user").stumajor
        this.Student.sex=this.$session.get("user").stusex
        this.Student.dorm=this.$session.get("user").studormitory
        this.Student.nation=this.$session.get("user").stunation
        this.Student.naPlace=this.$session.get("user").stunativeplace
        this.Student.poLook=this.$session.get("user").stupoliticaloutlook
        this.Student.birthDate=this.$session.get("user").stubirthdate
        this.Student.phone=this.$session.get("user").stuphone
        this.Student.email=this.$session.get("user").stuemail
        this.Student.wechat=this.$session.get("user").stuwechat
        this.Student.teacher=this.$session.get("user").stuinstructor
        this.Student.teaphone=this.$session.get("user").stuinstructorphone
        this.Student.state=this.$session.get("user").stustate
      },
      changestuinfo(){
        this.dialogFormVisible=true;
      },
      ChangedialogstuFormVisible(){
        this.dialogFormVisible=false;
      },
      ChangeStu(){
        this.channgeinfo(this.Student)
      }
    },
  }
</script>

<style scoped>

</style>
