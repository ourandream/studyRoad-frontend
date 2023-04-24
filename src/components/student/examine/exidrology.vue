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
        <el-breadcrumb-item>思想品德</el-breadcrumb-item>
        <el-breadcrumb-item>审核明细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-container>
      <el-container>
        <el-card class="list">
          <div slot="header" class="clearfix">
            <span>待审核</span>
          </div>
          <el-table
            :data="examine.unreviewed"
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
            <el-table-column prop="describe" label="加分简介">
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
                    @click="detail(scope.row)"
                  ></el-button>
                </el-tooltip>
                <span style="padding-left: 10px">
                  <el-tooltip placement="top" effect="light">
                    <div slot="content">删除</div>
                    <el-popconfirm
                      title="确认删除该条上报数据？"
                      @confirm="del(scope.row.id)"
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
        <el-card class="list">
          <div slot="header" class="clearfix">
            <span>已审核</span>
          </div>
          <el-table
            :data="examine.reviewed"
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
            <el-table-column prop="describe" label="加分简介">
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
                    @click="detail(scope.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-container>
    </el-container>
    <SubDetail
      :dialogFormVisible="this.dialogFormVisible"
      :shangbao="this.shangbao"
      @ChangedialogFormVisible="this.ChangedialogFormVisible"
    ></SubDetail>
  </div>
</template>

<script>
import SubDetail from "../detail/subdetail";
import { getauditdetails, deletesx } from "../../../api/sixiang";

export default {
  name: "exidrology",
  components: {
    SubDetail,
  },
  data() {
    return {
      dialogFormVisible: false,
      shangbao: undefined,
      examine: undefined,
      // examine: {
      //   unreviewed: [
      //     {
      //       id: 123,
      //       scyear: '2021~2022学年',
      //       semester: '第一学期',
      //       time: '2021-10-1',
      //       type: '通报表扬',
      //       matter: '学院通报表扬',
      //       level: '',
      //       order: '',
      //       describe: '好人好事受到学院升旗仪式上通报表扬',
      //       remarks: '我是个好人',
      //       mark: 2,
      //       prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //       srcList: [
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign: 0
      //     },{
      //       id: 123,
      //       scyear: '2020~2021学年',
      //       semester: '第一学期',
      //       time: '2021-10-1',
      //       type: '通报表扬',
      //       matter: '学院通报表扬',
      //       level: '',
      //       order: '',
      //       describe: '好人好事受到学院升旗仪式上通报表扬',
      //       remarks: '我是个好人',
      //       mark: 2,
      //       prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //       srcList: [
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign: 0
      //     },{
      //       id: 123,
      //       scyear: '2021~2022学年',
      //       semester: '第一学期',
      //       time: '2021-10-1',
      //       type: '通报表扬',
      //       matter: '学院通报表扬',
      //       level: '',
      //       order: '',
      //       describe: '好人好事受到学院升旗仪式上通报表扬',
      //       remarks: '我是个好人',
      //       mark: 2,
      //       prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //       srcList: [
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign: 0
      //     },{
      //       id: 123,
      //       scyear: '2021~2022学年',
      //       semester: '第一学期',
      //       time: '2021-10-1',
      //       type: '通报表扬',
      //       matter: '学院通报表扬',
      //       level: '',
      //       order: '',
      //       describe: '好人好事受到学院升旗仪式上通报表扬',
      //       remarks: '我是个好人',
      //       mark: 2,
      //       prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //       srcList: [
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign: 0
      //     },
      //     {
      //
      //       id: 123,
      //       scyear: '2021~2022学年',
      //       semester: '第一学期',
      //       time: '2021-10-1',
      //       type: '通报表扬',
      //       matter: '学院通报表扬',
      //       level: '',
      //       order: '',
      //       describe: '好人好事受到学院升旗仪式上通报表扬',
      //       remarks: '我是个好人',
      //       mark: 2,
      //       prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //       srcList: [
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign: 0
      //     },
      //     {
      //       id: 123,
      //       scyear: '2021~2022学年',
      //       semester: '第一学期',
      //       time: '2021-10-1',
      //       type: '通报表扬',
      //       matter: '学院通报表扬',
      //       level: '',
      //       order: '',
      //       describe: '好人好事受到学院升旗仪式上通报表扬',
      //       remarks: '我是个好人',
      //       mark: 2,
      //       prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //       srcList: [
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign: 0
      //     },{
      //       id: 123,
      //       scyear: '2021~2022学年',
      //       semester: '第一学期',
      //       time: '2021-10-1',
      //       type: '通报表扬',
      //       matter: '学院通报表扬',
      //       level: '',
      //       order: '',
      //       describe: '好人好事受到学院升旗仪式上通报表扬',
      //       remarks: '我是个好人',
      //       mark: 2,
      //       prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //       srcList: [
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign: 0
      //     },{
      //       id: 123,
      //       scyear: '2021~2022学年',
      //       semester: '第一学期',
      //       time: '2021-10-1',
      //       type: '通报表扬',
      //       matter: '学院通报表扬',
      //       level: '',
      //       order: '',
      //       describe: '好人好事受到学院升旗仪式上通报表扬',
      //       remarks: '我是个好人',
      //       mark: 2,
      //       prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //       srcList: [
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign: 0
      //     },],
      //
      //   reviewed: [
      //     {
      //       id: 123,
      //       scyear: '2020~2021学年',
      //       semester: '第一学期',
      //       time: '2021-10-1',
      //       type: '通报表扬',
      //       matter: '学院通报表扬',
      //       level: '',
      //       order: '',
      //       describe: '好人好事受到学院升旗仪式上通报表扬',
      //       remarks: '我是个好人',
      //       mark: 2,
      //       prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //       srcList: [
      //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //       ],
      //       sign: 1,
      //       reason: ''
      //     },
      //       {
      //         id: 122,
      //         scyear: '2021~2022学年',
      //         semester: '第二学期',
      //         time: '2021-12-15',
      //         type: '荣誉奖项',
      //         matter: '团日活动立项',
      //         level: '校级',
      //         order: '一类立项',
      //         describe: '班级团日活动校级立项',
      //         remarks: '好的团日活动',
      //         mark: 4,
      //         prove:  'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      //         srcList: [
      //           'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      //           'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      //         ],
      //         sign: 2,
      //         reason:'太假了'
      //       },]
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
      console.log(data.data);
      this.examine = data.data.examine;
    },
    async dleteSx(sxid) {
      const { data } = await deletesx(sxid);
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
    detail(info) {
      this.dialogFormVisible = true;
      this.shangbao = info;
    },
    del(id) {
      this.dleteSx(id);
    },
    ChangedialogFormVisible() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped>
.list {
  width: 40vw;
  height: 600px;
  background: #fcfcfc url("../../../assets/bac/list.png") center / 65% auto;
  background-repeat: no-repeat;
  margin: 0 1vw;
}
</style>
