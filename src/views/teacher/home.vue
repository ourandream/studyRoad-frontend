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
            padding-left: 12%;
            font-size: large;
            text-decoration: none;
            cursor: pointer;
          "
          @click="Return"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="none"
            version="1.1"
            style="margin-right: 13%"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <defs>
              <linearGradient
                x1="-5.551115123125783e-17"
                y1="-1.1102230246251565e-16"
                x2="1"
                y2="1"
                id="master_svg0__14"
              >
                <stop
                  offset="0%"
                  stop-color="#FFFFFF"
                  stop-opacity="0.699999988079071"
                />
                <stop offset="100%" stop-color="#FFFFFF" stop-opacity="1" />
              </linearGradient>
            </defs>
            <g style="mix-blend-mode: passthrough">
              <g style="mix-blend-mode: passthrough">
                <ellipse
                  cx="16"
                  cy="16"
                  rx="16"
                  ry="16"
                  fill="#3751FF"
                  fill-opacity="1"
                />
              </g>
              <g style="mix-blend-mode: passthrough">
                <path
                  d="M11,10C11,9.447716,11.447715,9,12,9C12,9,15.99048,9,15.99048,9C18.212699999999998,9,19.933329999999998,9.609551,21.1524,10.82865C22.3841,12.04775,23,13.764980000000001,23,15.98034C23,18.2088,22.3841,19.9391,21.1524,21.171300000000002C19.933329999999998,22.3904,18.212699999999998,23,15.99048,23C15.99048,23,12,23,12,23C11.447715,23,11,22.552300000000002,11,22C11,22,11,10,11,10C11,10,11,10,11,10Z"
                  fill="url(#master_svg0__14)"
                  fill-opacity="1"
                />
              </g>
            </g>
          </svg>
          学路系统
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
          <el-menu-item index="/stuTimeline">
            <i class="el-icon-time"></i>
            <span slot="title">学路看板</span>
          </el-menu-item>
          <el-menu-item index="/evaluation">
            <i class="el-icon-s-data"></i>
            <span slot="title">素质报告统计</span>
          </el-menu-item>
        </el-menu>
        <el-dropdown
          style="
            position: absolute;
            bottom: 2vh;
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
          <div style="padding-top: 1.5vh">{{ name }}</div>

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
