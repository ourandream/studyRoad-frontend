<template>
  <el-container class="home-container">
    <!-- <el-header>
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
            :src="imgurl"
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
 -->
    <el-container>
      <el-aside :width="isOpen == true ? '64px' : '200px'">
        <!-- <div class="toggle-btn" @click="toggleMenu">|||</div> -->
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
              <span slot="title">思想品德</span>
            </template>
            <el-menu-item index="/deAppraisal">
              <i class="el-icon-location"></i>
              <span slot="title">民主测评</span>
            </el-menu-item>
            <el-menu-item index="/idrology">
              <i class="el-icon-location"></i>
              <span slot="title">加分上报</span>
            </el-menu-item>
            <el-menu-item index="/exidrology">
              <i class="el-icon-location"></i>
              <span slot="title">审核明细</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">学业表现</span>
            </template>
            <el-menu-item index="/perachievement">
              <i class="el-icon-location"></i>
              <span slot="title">个人成绩</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">科研竞赛</span>
            </template>
            <el-menu-item index="/scientific">
              <i class="el-icon-location"></i>
              <span slot="title">加分上报</span>
            </el-menu-item>
            <el-menu-item index="/science">
              <i class="el-icon-location"></i>
              <span slot="title">审核明细</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">艺体素养</span>
            </template>
            <el-menu-item index="/artjoin">
              <i class="el-icon-location"></i>
              <span slot="title">加分上报</span>
            </el-menu-item>
            <el-menu-item index="/artsport">
              <i class="el-icon-location"></i>
              <span slot="title">审核明细</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">实践创业</span>
            </template>
            <el-menu-item index="/post">
              <i class="el-icon-location"></i>
              <span slot="title">职务上报</span>
            </el-menu-item>
            <el-menu-item index="/practicehonor">
              <i class="el-icon-location"></i>
              <span slot="title">加分上报</span>
            </el-menu-item>
            <el-menu-item index="/practice">
              <i class="el-icon-location"></i>
              <span slot="title">审核明细</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/deductpointse">
            <i class="el-icon-location"></i>
            <span slot="title">扣分明细</span>
          </el-menu-item>
          <el-menu-item index="/comquality">
            <i class="el-icon-location"></i>
            <span slot="title">综合测评</span>
          </el-menu-item>
          <el-submenu v-if="this.$session.get('user').stupower === 1" index="7">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">管理员</span>
            </template>
            <el-menu-item index="/manunreviewed">
              <i class="el-icon-location"></i>
              <span slot="title">待审核</span>
            </el-menu-item>
            <el-menu-item index="/manreviewed">
              <i class="el-icon-location"></i>
              <span slot="title">已审核</span>
            </el-menu-item>
          </el-submenu>
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
      imgurl: undefined,
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
    this.name = this.$session.get("user").stuname + "同学";
    this.imgurl = this.$session.get("user").head;
    console.log(this.$session.get("user").stunum);
    this.dialogFormVisible = false;
    if (this.$session.get("login") !== 1) this.$router.push("/404");
  },
  methods: {
    Return() {
      this.$router.push("/StuHome");
    },
    SignOut() {
      this.$router.replace("/login");
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    Info() {
      this.$router.push("/stuInfo");
    },
    ChangedialogFormVisible() {
      this.dialogFormVisible = false;
    },
    changehead() {
      this.dialogFormVisible = true;
      this.image = this.$session.get("user").head;
    },
    replaceHead() {
      this.imgurl = this.$session.get("user").head;
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
  margin-top: 1vh;
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
  margin-left: 50vw;
}
</style>
