<template>
  <div>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        select="handleSelect"
        router="true"
        default-active="/TeaInfo"
        background-color="#E9EEF3"
      >
        <el-menu-item index="/TeaInfo">基本信息</el-menu-item>
        <el-menu-item index="/changePa">修改密码</el-menu-item>
      </el-menu>
    </div>
    <el-card class="box-card" style="margin-top: 1%; padding-bottom: 6%">
      <el-container>
        <el-container>
          <img
            src="../../assets/bill.png"
            style="
              width: 350px;
              height: 350px;
              padding-top: 5%;
              padding-left: 10%;
            "
          />
        </el-container>
        <el-container>
          <el-descriptions
            class="margin-top"
            title="个人基本信息"
            :column="2"
            border
          >
            <template slot="extra">
              <el-button type="primary" size="small" @click="changeinfo"
                >信息修改</el-button
              >
            </template>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconyonghu"></i>
                  账号</span
                >
              </template>
              {{ teaUser.id }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconxingming"></i>
                  姓名</span
                >
              </template>
              {{ teaUser.name }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconxingbie"></i>
                  性别</span
                >
              </template>
              <span v-if="teaUser.sex === '1'">男</span>
              <span v-else>女</span>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconminzu"></i>
                  民族</span
                >
              </template>
              {{ teaUser.nation }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconjia"></i>
                  籍贯</span
                >
              </template>
              {{ teaUser.naPlace }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconzhengzhi"></i>
                  政治面貌</span
                >
              </template>
              {{ teaUser.poLook }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconidcard"></i>
                  身份证</span
                >
              </template>
              {{ teaUser.idCard }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="el-icon-user"></i>
                  出生日期</span
                >
              </template>
              {{ teaUser.birthDate }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-icondianhua"></i>
                  电话</span
                >
              </template>
              {{ teaUser.phone }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconyouxiang"></i>
                  邮箱</span
                >
              </template>
              {{ teaUser.email }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconweixin"></i>
                  微信号</span
                >
              </template>
              {{ teaUser.wechat }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <span class="item">
                  <i class="zc-iconbeizhu"></i>
                  备注</span
                >
              </template>
              <el-tag size="small">学校</el-tag>
              <span style="padding-left: 20px">
                <el-tag size="small" type="success">教师</el-tag></span
              >
            </el-descriptions-item>
          </el-descriptions>
        </el-container></el-container
      >
      <ChangeInfo
        :dialogFormVisible="this.dialogFormVisible"
        :teaUser="this.teaUser"
        @ChangedialogFormVisible="ChangedialogFormVisible"
        @getinfo="getinfo"
      >
      </ChangeInfo>
    </el-card>
  </div>
</template>

<script>
import ChangeInfo from "./changeInfo";

export default {
  components: { ChangeInfo },
  name: "Info",
  data() {
    return {
      dialogFormVisible: false,
      teaUser: {
        id: undefined,
        name: undefined,
        sex: undefined,
        idCard: undefined,
        nation: undefined,
        naPlace: undefined,
        poLook: undefined,
        birthDate: undefined,
        phone: undefined,
        email: undefined,
        wechat: undefined,
      },
    };
  },
  created() {
    this.getinfo();
  },
  methods: {
    getinfo() {
      this.teaUser.id = this.$session.get("user").teanum;
      this.teaUser.name = this.$session.get("user").teaname;
      this.teaUser.sex = this.$session.get("user").teasex;
      this.teaUser.nation = this.$session.get("user").teanation;
      this.teaUser.idCard = this.$session.get("user").teaidcard;
      this.teaUser.naPlace = this.$session.get("user").teanativeplace;
      this.teaUser.poLook = this.$session.get("user").teapoliticaloutlook;
      this.teaUser.birthDate = this.$session.get("user").teabirthdate;
      this.teaUser.phone = this.$session.get("user").teaphone;
      this.teaUser.email = this.$session.get("user").teaemail;
      this.teaUser.wechat = this.$session.get("user").teawechat;
    },
    changeinfo() {
      this.dialogFormVisible = true;
    },
    ChangedialogFormVisible() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.margin-top {
  font-size: 15px;
  padding-top: 3%;
  width: 800px;
  padding-left: 5%;
  /*padding-left: 10%;*/
}
.item {
  margin-left: 30%;
}
</style>
