<template>
  <el-container class="home-container">
    <el-container>
      <el-aside
        :width="isOpen == true ? '64px' : '200px'"
        style="position: relative"
      >
        <div
          style="
            color: rgb(164, 166, 179);
            display: flex;
            margin: 4vh 0px;
            align-items: center;
            font-size: large;
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
              :src="imgurl"
              style="
                width: 3vw;
                border-radius: 50%;
                background-color: #8db1f1;
                margin: 0px 0vh 0px 0px;
              "
            ></el-image>
            <div style="padding-top: 1.5vh;color:white">{{ name }}</div>
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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">思想品德</span>
            </template>
            <el-menu-item index="/deAppraisal">
              <span slot="title">民主测评</span>
            </el-menu-item>
            <el-menu-item index="/idrology">
              <span slot="title">成果上报</span>
            </el-menu-item>
            <el-menu-item index="/exidrology">
              <span slot="title">审核明细</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">学业表现</span>
            </template>
            <el-menu-item index="/perachievement">
              <span slot="title">个人成绩</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span slot="title">科研竞赛</span>
            </template>
            <el-menu-item index="/scientific">
              <span slot="title">成果上报</span>
            </el-menu-item>
            <el-menu-item index="/science">
              <span slot="title">审核明细</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">艺体素养</span>
            </template>
            <el-menu-item index="/artjoin">
              <span slot="title">成果上报</span>
            </el-menu-item>
            <el-menu-item index="/artsport">
              <span slot="title">审核明细</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-ticket"></i>
              <span slot="title">实践育人</span>
            </template>
            <el-menu-item index="/post">
              <span slot="title">职务上报</span>
            </el-menu-item>
            <el-menu-item index="/practicehonor">
              <span slot="title">成果上报</span>
            </el-menu-item>
            <el-menu-item index="/practice">
              <span slot="title">审核明细</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/deductpointse">
            <i class="el-icon-s-release"></i>
            <span slot="title">违纪扣分</span>
          </el-menu-item>
          <el-menu-item index="/comquality">
            <i class="el-icon-s-data"></i>
            <span slot="title">素质报告</span>
          </el-menu-item>
          <el-submenu v-if="this.$session.get('user').stupower === 1" index="7">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span slot="title">管理员</span>
            </template>
            <el-menu-item index="/manunreviewed">
              <span slot="title">待审核</span>
            </el-menu-item>
            <el-menu-item index="/manreviewed">
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
      if (this.$route.path !== "/StuHome") {
        this.$router.push("/StuHome");
      }
      this.$refs.menu.activeIndex = null;
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

li.el-menu-item.is-active {
  border-left: 1px solid white;
  background-color: rgb(31, 35, 41) !important;
}
</style>
