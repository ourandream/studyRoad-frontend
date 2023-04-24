<template>
  <div>
    <div>
      <el-breadcrumb
        separator="》"
        style="
          padding-left: 10px;
          padding-bottom: 1%;
          font-size: 15px;
          padding-top: 0.5%;
        "
      >
        <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>科研竞赛</el-breadcrumb-item>
        <el-breadcrumb-item>审核明细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-container>
      <el-container>
        <el-card class="sclist">
          <div slot="header" class="clearfix">
            <span>待审核</span>
          </div>
          <el-table
            :data="technology.unreviewed"
            border
            stripe
            max-height="510px"
            size="mini"
            style="width: 100%; text-align: center"
          >
            <el-table-column prop="scyear" label="学年" sortable width="120">
            </el-table-column>
            <el-table-column prop="type" label="加分类型" width="120">
            </el-table-column>
            <el-table-column prop="describe" label="科研竞赛成果简介">
            </el-table-column>
            <el-table-column prop="mark" label="加分数" width="70">
            </el-table-column>

            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-tooltip placement="top" effect="light">
                  <div slot="content">详细</div>
                  <el-button
                    circle
                    size="small"
                    style="background-color: #ffecec"
                    icon="el-icon-document"
                    @click="scdetail(scope.row)"
                  ></el-button>
                </el-tooltip>
                <span style="padding-left: 10px">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content">删除</div>
                    <el-popconfirm
                      title="确认删除该条上报数据？"
                      @confirm="scdel(scope.row.id)"
                    >
                      <el-button
                        circle
                        slot="reference"
                        size="small"
                        style="background-color: rgba(239, 154, 154, 0.71)"
                        icon="el-icon-delete"
                      ></el-button>
                    </el-popconfirm>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-container>
      <el-container>
        <el-card class="sclist">
          <div slot="header" class="clearfix">
            <span>已审核</span>
          </div>
          <el-table
            :data="technology.reviewed"
            border
            stripe
            size="mini"
            max-height="510px"
            style="width: 100%; text-align: center"
          >
            <el-table-column prop="scyear" label="学年" sortable width="120">
            </el-table-column>
            <el-table-column prop="type" label="加分类型" width="120">
            </el-table-column>
            <el-table-column prop="describe" label="科研竞赛成果简介">
            </el-table-column>
            <el-table-column prop="mark" label="加分数" width="70">
            </el-table-column>

            <el-table-column label="审核状态" width="80">
              <template slot-scope="scope">
                <div>
                  <el-tag v-if="scope.row.sign === 1" type="success" size="mini"
                    >通过</el-tag
                  >
                </div>
                <div>
                  <el-tag v-if="scope.row.sign === 2" type="danger" size="mini"
                    >未通过</el-tag
                  >
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-tooltip placement="top" effect="light">
                  <div slot="content">详细</div>
                  <el-button
                    circle
                    size="small"
                    style="background-color: #ffecec"
                    icon="el-icon-document"
                    @click="scdetail(scope.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-container>
    </el-container>
    <ScDetail
      :scdialogFormVisible="this.scdialogFormVisible"
      :scshangbao="this.scshangbao"
      @scChangedialogFormVisible="this.scChangescdialogFormVisible"
    ></ScDetail>
  </div>
</template>

<script>
import ScDetail from "../detail/scdetail";
import { getauditdetails, deleteky } from "@/api/keyan";
import { deletesx } from "@/api/sixiang";
export default {
  name: "science",
  components: {
    ScDetail,
  },
  data() {
    return {
      scdialogFormVisible: false,
      scshangbao: undefined,
      technology: undefined,
      // technology:{
      //   unreviewed:[
      //     {
      //       id:123,
      //       scyear: "2021~2022学年",
      //       semester: "第二学期",
      //       time: 2021-10-8,
      //       type:"科研立项",
      //       level: "国家级",
      //       order:"优秀结题",
      //       name: "学路系统",
      //       describe: "致力于学生工作的系统",
      //       remarks:"是项目负责人",
      //       mark: 15,
      //       prove:[
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sc:'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //       sign:0,
      //       reason:"tql",
      //     },
      //     {
      //       id:123,
      //       scyear: "2020~2021学年",
      //       semester: "第一学期",
      //       time: 2020-12-18,
      //       type:"学术竞赛",
      //       level: "校级",
      //       order:"一等奖",
      //       name: "数学建模大赛",
      //       describe: "数学建模大赛牛逼",
      //       remarks:"我很强",
      //       mark: 10,
      //       prove:[
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign:0,
      //       reason:"tql",
      //     },
      //     {
      //       id:123,
      //       scyear: "2019~2020学年",
      //       semester: "第一学期",
      //       time: 2020-1-28,
      //       type:"论文专利",
      //       level: "实用性专利",
      //       order:"第二作者",
      //       name: "系统",
      //       describe: "系统牛逼",
      //       remarks:"我很强",
      //       mark: 20,
      //       prove:[
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign:0,
      //       reason:"tql",
      //     },
      //     {
      //       id:123,
      //       scyear: "2019~2020学年",
      //       semester: "第一学期",
      //       time: 2020-1-28,
      //       type:"论文专利",
      //       level: "实用性专利",
      //       order:"第二作者",
      //       name: "系统",
      //       describe: "系统牛逼",
      //       remarks:"我很强",
      //       mark: 20,
      //       prove:[
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign:0,
      //       reason:"tql",
      //     },
      //     {
      //       id:123,
      //       scyear: "2019~2020学年",
      //       semester: "第一学期",
      //       time: 2020-1-28,
      //       type:"论文专利",
      //       level: "实用性专利",
      //       order:"第二作者",
      //       name: "系统",
      //       describe: "系统牛逼",
      //       remarks:"我很强",
      //       mark: 20,
      //       prove:[
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign:0,
      //       reason:"tql",
      //     },
      //     {
      //       id:123,
      //       scyear: "2019~2020学年",
      //       semester: "第一学期",
      //       time: 2020-1-28,
      //       type:"论文专利",
      //       level: "实用性专利",
      //       order:"第二作者",
      //       name: "系统",
      //       describe: "系统牛逼",
      //       remarks:"我很强",
      //       mark: 20,
      //       prove:[
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign:0,
      //       reason:"tql",
      //     },
      //
      //   ],
      //   reviewed:[
      //     {
      //       id:222,
      //       scyear: "2019~2020学年",
      //       semester: "第二学期",
      //       time: 2020-9-28,
      //       type:"其他成果",
      //       level: "",
      //       order:" ",
      //       name: " ",
      //       describe: "通过六级",
      //       remarks:"我很强",
      //       mark: 4,
      //       prove:[
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign:1,
      //       reason:"tql",
      //     },
      //     {
      //       id:123,
      //       scyear: "2019~2020学年",
      //       semester: "第一学期",
      //       time: 2020-1-28,
      //       type:"论文专利",
      //       level: "实用性专利",
      //       order:"第二作者",
      //       name: "系统",
      //       describe: "系统牛逼",
      //       remarks:"我很强",
      //       mark: 20,
      //       prove:[
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign:2,
      //       reason:"tql",
      //     }
      //   ]
      // }
    };
  },
  mounted() {
    var stunum = this.$session.get("user").stunum;
    this.getAuditdetails(stunum);
  },
  methods: {
    async getAuditdetails(stunum) {
      const { data } = await getauditdetails(stunum);
      console.log(data.data.technology);
      this.technology = data.data.technology;
    },
    async dleteKy(kyid) {
      const { data } = await deleteky(kyid);
      var code = data.code;
      if (code === 200)
        this.$message({
          showClose: true,
          message: "删除上报数据成功！",
          type: "success",
        });
      else
        this.$message({
          showClose: true,
          message: "删除上报数据失败！",
          type: "error",
        });
      var stunum = this.$session.get("user").stunum;
      this.getAuditdetails(stunum);
    },
    scdetail(info) {
      this.scdialogFormVisible = true;
      this.scshangbao = info;
    },
    scdel(id) {
      this.dleteKy(id);
    },
    scChangescdialogFormVisible() {
      this.scdialogFormVisible = false;
    },
  },
};
</script>

<style scoped>
.sclist {
  width: 40vw;
  height: 600px;
  background: #fcfcfc url("../../../assets/bac/Auction.png") center / 40% auto;
  background-repeat: no-repeat;
}
</style>
