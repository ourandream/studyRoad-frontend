<template>
  <el-container class="home-container">
    <el-container>
      <el-aside style="position: relative; width: 13%">
        <div
          style="
            color: rgb(164, 166, 179);
            display: flex;
            margin: 4vh 0px;
            align-items: center;
            font-size: large;
            text-decoration: none;
            cursor: pointer;
          "
          @click="Return"
        >
          <el-dropdown
            style="
              display: flex;
              justify-content: center;
              width: 100%;
              flex-direction: column;
              align-items: center;
            "
          >
            <el-image
              :src="teaimgurl"
              style="
                width: 3vw;
                border-radius: 50%;
                background-color: #8db1f1;
                margin: 0px 0vh 0px 0px;
              "
            ></el-image>
            <div style="padding-top: 1.5vh; color: white">{{ name }}</div>

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

        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isOpen"
          :router="true"
          background-color="#272c33"
          :collapse-transition="false"
          text-color="rgba(255,255,255,0.7)"
          unique-opened
          ref="menu"
        >
          <el-menu-item index="/stuTimeline">
            <i class="el-icon-time"></i>
            <span slot="title">学路看板</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="/stuManage">
              <span slot="title">学生列表</span>
            </el-menu-item>
            <el-menu-item index="/setPermi">
              <span slot="title">权限设置</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span slot="title">成绩管理</span>
            </template>
            <el-menu-item index="/scoreentry">
              <span slot="title">成绩录入</span>
            </el-menu-item>
            <el-menu-item index="/scoredetail">
              <span slot="title">成绩明细</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span slot="title">审核管理</span>
            </template>
            <el-menu-item index="/daishenhe">
              <span slot="title">待审核</span>
            </el-menu-item>
            <el-menu-item index="/yishenhe">
              <span slot="title">已审核</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-release"></i>
              <span slot="title">扣分管理</span>
            </template>
            <el-menu-item index="/reducepoint">
              <span slot="title">扣分录入</span>
            </el-menu-item>
            <el-menu-item index="/deductlist">
              <span slot="title">违纪扣分</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/evaluation">
            <i class="el-icon-s-data"></i>
            <span slot="title">素质报告统计</span>
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
      if (this.$route.path !== "/TeaHome") this.$router.push("/TeaHome");
      this.$refs.menu.activeIndex = null;
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

li.el-menu-item.is-active {
  border-left: 1px solid white;
  background-color: rgb(31, 35, 41) !important;
}
</style>
