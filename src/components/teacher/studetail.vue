<template>
  <div>
  <div>
    <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
      <el-breadcrumb-item :to="{ path: '/TeaHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生列表</el-breadcrumb-item>
      <el-breadcrumb-item>详细</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-card class="box-card"style="margin-top: 2%;padding-bottom: 4%">
    <el-descriptions class="margin-top" title='学生基本信息' :column="3"  border  >
      <template slot="extra" >
        <el-button type="primary" size="small" @click="goOff">返回</el-button>
      </template>
      <el-descriptions-item >
        <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          学号</span>
        </template>
        {{Stu.stunum}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label" >
           <span class="item">
          <i class="zc-iconxingming"></i>
             姓名</span>
        </template>
        {{Stu.stuname}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label" >
           <span class="item">
          <i class="zc-iconxingbie"></i>
             性别</span>
        </template>
        <span v-if="Stu.stusex===1">男</span>
        <span v-if="Stu.stusex===2">女</span>
      </el-descriptions-item>

      <el-descriptions-item >
        <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          年级</span>
        </template>
        {{Stu.stugrade}}
      </el-descriptions-item>

      <el-descriptions-item >
        <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          班级</span>
        </template>
        {{Stu.stuclass}}
      </el-descriptions-item>

      <el-descriptions-item >
        <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          专业</span>
        </template>
        {{Stu.stumajor}}
      </el-descriptions-item>


      <el-descriptions-item>
        <template slot="label" >
           <span class="item">
          <i class="zc-iconminzu"></i>
             民族</span>
        </template>
        {{Stu.stunation}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label" >
           <span class="item">
          <i class="zc-iconjia"></i>
             籍贯</span>
        </template>
        {{Stu.stunativeplace}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label" >
           <span class="item">
          <i class="zc-iconzhengzhi"></i>
             政治面貌</span>
        </template>
        {{Stu.stupoliticaloutlook}}
      </el-descriptions-item>

      <el-descriptions-item >
        <template slot="label" >
           <span class="item">
          <i class="zc-iconidcard"></i>
             身份证</span>
        </template>
        {{Stu.stuidcard}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
           <span class="item">
          <i class="el-icon-user"></i>
             出生日期</span>
        </template>
        {{Stu.stubirthdate}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label" >
           <span class="item">
          <i class="zc-icondianhua"></i>
             电话</span>
        </template>
        {{Stu.stuphone}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label" >
           <span class="item">
          <i class="zc-iconyouxiang"></i>
             邮箱</span>
        </template>
        {{Stu.stuemail}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label" >
           <span class="item">
          <i class="zc-iconweixin"></i>
             微信号</span>
        </template>
        {{Stu.stuwechat}}
      </el-descriptions-item>

      <el-descriptions-item >
        <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          宿舍</span>
        </template>
        {{Stu.studormitory}}
      </el-descriptions-item>

      <el-descriptions-item >
        <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          辅导员</span>
        </template>
        {{Stu.stuinstructor}}
      </el-descriptions-item>

      <el-descriptions-item >
        <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          辅导员联系方式</span>
        </template>
        {{Stu.stuinstructorphone}}
      </el-descriptions-item>

      <el-descriptions-item >
        <template slot="label" >
          <span class="item">
          <i class="zc-iconyonghu "></i>
          学籍状态</span>
        </template>
        <el-tag size="small"v-if="Stu.stustate===1">在读</el-tag>
        <el-tag size="small"v-if="Stu.stustate===2">休学</el-tag>
        <el-tag size="small"v-if="Stu.stustate===3">保留学籍</el-tag>
        <el-tag size="small"v-if="Stu.stustate===4">待审核</el-tag>
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
  </el-card>
  </div>
</template>

<script>
  export default {
    name: 'studetail',
    data(){
      return {
        Stu: this.$route.query.info,
        loading: false,
        // Stu:{
        //   number: '202187467',
        //   name: '徐花',
        //   sex:'2',
        //   grade:'2021级',
        //   class:'计科3班',
        //   major:'计算机科学与技术',
        //   dorm:'东十二320',
        //   idcard:'4408451374921025451',
        //   nation:'汉族',
        //   naPlace:'广西桂林',
        //   poLook:'共青团员',
        //   birthDate:'2001-11-8',
        //   phone:'13077889269',
        //   email:'5947646882@qq.com',
        //   wechat:'aa521487452145',
        //   teacher:'李华',
        //   teaphone:'15769498269',
        //   state:'在读',
        // }
      }
    },
    methods:{
      goOff(){ this.$router.go(-1); },
    }
  }
</script>

<style scoped>

</style>
