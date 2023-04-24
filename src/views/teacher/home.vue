<template>
  <el-container class="home-container">
    <el-header>
      <div class="left_box">
        <img src="../../assets/index.png" />
        <span style="width: 200px"
          ><h3 style="margin-left: 10px; margin-bottom: 25px">
            学路学生成长可视化系统
          </h3></span
        >
      </div>
      <span class="wel">欢迎您！{{ name }}</span>
      <div class="right_box">
        <el-dropdown>
          <el-image
            :src="teaimgurl"
            style="
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background-color: #8db1f1;
              margin: 0px 15px 0px 0px;
            "
          ></el-image>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><span
                class="zc-iconshouye"
                @click="Return"
                style="font-size: 15px"
                >&nbsp;回到首页</span
              >
            </el-dropdown-item>
            <el-dropdown-item
              ><span
                class="el-icon-user-solid"
                @click="Info"
                style="font-size: 15px"
                >&nbsp;信息维护</span
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><span
                class="el-icon-s-help"
                @click="changehead"
                style="font-size: 15px"
                >&nbsp;头像更换</span
              ></el-dropdown-item
            >
            <el-dropdown-item
              ><span
                class="el-icon-switch-button"
                @click="SignOut"
                style="font-size: 15px"
                >&nbsp;退出登录</span
              ></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <el-aside :width="isOpen == true ? '64px' : '180px'">
        <div class="toggle-btn" @click="toggleMenu">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isOpen"
          :router="true"
          :default-active="activePath"
          background-color="#272c33"
          :collapse-transition="false"
          text-color="rgba(255,255,255,0.7)"
          unique-opened
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="/stuManage">
              <i class="el-icon-location"></i>
              <span slot="title">学生列表</span>
            </el-menu-item>
            <el-menu-item index="/setPermi">
              <i class="el-icon-location"></i>
              <span slot="title">权限设置</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">成绩管理</span>
            </template>
            <el-menu-item index="/scoreentry">
              <i class="el-icon-location"></i>
              <span slot="title">成绩录入</span>
            </el-menu-item>
            <el-menu-item index="/scoredetail">
              <i class="el-icon-location"></i>
              <span slot="title">成绩明细</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">审核管理</span>
            </template>
            <el-menu-item index="/daishenhe">
              <i class="el-icon-location"></i>
              <span slot="title">待审核</span>
            </el-menu-item>
            <el-menu-item index="/yishenhe">
              <i class="el-icon-location"></i>
              <span slot="title">已审核</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">扣分管理</span>
            </template>
            <el-menu-item index="/reducepoint">
              <i class="el-icon-location"></i>
              <span slot="title">扣分录入</span>
            </el-menu-item>
            <el-menu-item index="/deductlist">
              <i class="el-icon-location"></i>
              <span slot="title">扣分明细</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/evaluation">
            <i class="el-icon-location"></i>
            <span slot="title">综合测评</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <change-head
      :dialogFormVisible="this.dialogFormVisible"
      :image="this.image"
      @ChangedialogFormVisible="ChangedialogFormVisible"
      @replaceHead="replaceHead"
    ></change-head>
  </el-container>
</template>

<script>
import ChangeHead from "@/components/common/changeHead";
export default {
  data() {
    return {
      image: undefined,
      teaimgurl: undefined,
      loading: true,
      activePath: "", //激活的路径
      isOpen: false,
      menuList: {},
      name: undefined,
      dialogFormVisible: false,
    };
  },
  components: {
    ChangeHead,
  },
  created() {
    this.name = this.$session.get("user").teaname + "老师";
    this.teaimgurl = this.$session.get("user").head;
    this.dialogFormVisible = false;
    console.log(this.$session.get("user").stunum);
    if (this.$session.get("login") !== 1) this.$router.push("/404");
  },
  methods: {
    Return() {
      this.$router.push("/TeaHome");
    },
    SignOut() {
      this.$router.replace("/login");
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    Info() {
      this.$router.push("/TeaInfo");
    },
    ChangedialogFormVisible() {
      this.dialogFormVisible = false;
    },
    changehead() {
      this.dialogFormVisible = true;
      this.image = this.$session.get("user").head;
    },
    replaceHead() {
      this.teaimgurl = this.$session.get("user").head;
      this.image = this.$session.get("user").head;
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: rgba(134, 175, 243, 0.95);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 19px;
  padding-left: 0px;
}

.home-container {
  width: 100%;
  height: 100% !important;
}
.el-aside {
  background-color: #272c33;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  max-height: 693px;
}

.left_box {
  display: flex;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    margin: 0px 0px 0px 15px;
  }
}

.right_box {
}
.el-menu {
  border-right: none;
}
.toggle-btn {
  background-color: #2d3a4b !important;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.wel {
  font-family: 宋体;
  padding-right: 20px;
  display: block;
  font-size: 18px;
  margin-left: 920px;
}
</style>
