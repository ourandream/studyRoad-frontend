<template>
  <div>
    <div>
      <el-breadcrumb separator="》" style="padding-left:10px;padding-bottom:1%;font-size:15px;padding-top: 0.5%;">
        <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>艺体素养</el-breadcrumb-item>
        <el-breadcrumb-item>审核明细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-container>
      <el-container>
        <el-card class="artlist">
          <div slot="header" class="clearfix">
            <span>待审核</span>
          </div>
          <el-table
            :data="artsp.unreviewed"
            border
            stripe
            max-height="510px"
            size="mini"
            style="width: 100%;text-align: center;">
            <el-table-column
              prop="scyear"
              label="学年"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop="type"
              label="加分类型"
              width="120">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="艺体加分简介"
            >
            </el-table-column>
            <el-table-column
              prop="mark"
              label="加分数"
              width="70">
            </el-table-column>

            <el-table-column
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-tooltip  placement="top" effect="light">
                  <div slot="content" >详细</div>
                  <el-button circle size="small" style="background-color: #ffecec" icon="el-icon-document" @click="artdetail(scope.row)"></el-button>
                </el-tooltip>
                <span style="padding-left: 10px">
              <el-tooltip  placement="top" effect="light">
                <div slot="content" >删除</div>
                <el-popconfirm
                  title="确认删除该条上报数据？"
                  @confirm="artdel(scope.row.id)"
                >
                <el-button circle slot="reference" size="small" style="background-color: rgba(239,154,154,0.71)" icon="el-icon-delete"></el-button>
            </el-popconfirm>
              </el-tooltip>
            </span>
              </template>
            </el-table-column>
          </el-table>
        </el-card >
      </el-container>
      <el-container >
        <el-card class="artlist">
          <div slot="header" class="clearfix">
            <span>已审核</span>
          </div>
          <el-table
            :data="artsp.reviewed"
            border
            stripe
            size="mini"
            max-height="510px"
            style="width: 100%;text-align: center;
           ">
            <el-table-column
              prop="scyear"
              label="学年"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop="type"
              label="加分类型"
              width="120">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="艺体素养加分简介"
            >
            </el-table-column>
            <el-table-column
              prop="mark"
              label="加分数"
              width="70">
            </el-table-column>

            <el-table-column
              label="审核状态"
              width="80"
            >
              <template slot-scope="scope">
                <div><el-tag v-if="scope.row.sign===1" type="success" size="mini">通过</el-tag></div>
                <div><el-tag v-if="scope.row.sign===2" type="danger" size="mini">未通过</el-tag></div>

              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="60"
            >
              <template slot-scope="scope">
                <el-tooltip  placement="top" effect="light">
                  <div slot="content" >详细</div>
                  <el-button circle size="small" style="background-color: #ffecec" icon="el-icon-document" @click="artdetail(scope.row)"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-container>
    </el-container>
    <ArtDetail
      :artdialogFormVisible="this.artdialogFormVisible"
      :artshangbao="this.artshangbao"
      @artChangedialogFormVisible="this.artChangescdialogFormVisible"></ArtDetail>
  </div>
</template>

<script>
  import ArtDetail from '../detail/artdetail'
  import { deleteyt, getauditdetails } from '@/api/yiti'

  export default {
    name: 'artsport',
    components:{
      ArtDetail
    },
    data(){
      return{
        artdialogFormVisible:false,
        artshangbao:undefined,
        artsp:undefined,
        // artsp:{
        //   unreviewed:[
        //     {
        //       id:123,
        //       scyear: "2021~2022学年",
        //       semester: "第一学期",
        //       time: 2021-10-8,
        //       type:"艺体参与",
        //       level: "省级",
        //       order:"参与体育竞赛",
        //       name: "省运动会",
        //       describe: "参加省运动会当运动员",
        //       remarks:" ",
        //       mark: 10,
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
        //       semester: "第二学期",
        //       time: 2020-10-8,
        //       type:"艺体荣誉",
        //       level: "校级",
        //       order:"二等奖",
        //       name: "校合唱比赛",
        //       describe: "参加校合唱比赛活动二等奖",
        //       remarks:"评为先进个人",
        //       mark: 12,
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
        //       scyear: "2018~2019学年",
        //       semester: "第二学期",
        //       time: 2019-3-8,
        //       type:"其他艺体",
        //       level: " ",
        //       order:" ",
        //       name: " ",
        //       describe: "学习强国发表文章",
        //       remarks:" 发表了5篇",
        //       mark: 10,
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
        //       scyear: "2021~2022学年",
        //       semester: "第一学期",
        //       time: 2021-10-8,
        //       type:"艺体参与",
        //       level: "省级",
        //       order:"参与体育竞赛",
        //       name: "省运动会",
        //       describe: "参加省运动会当运动员",
        //       remarks:" ",
        //       mark: 10,
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
        //       semester: "第二学期",
        //       time: 2020-10-8,
        //       type:"艺体荣誉",
        //       level: "校级",
        //       order:"二等奖",
        //       name: "校合唱比赛",
        //       describe: "参加校合唱比赛活动二等奖",
        //       remarks:"评为先进个人",
        //       mark: 12,
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
        //       scyear: "2018~2019学年",
        //       semester: "第二学期",
        //       time: 2019-3-8,
        //       type:"其他艺体",
        //       level: " ",
        //       order:" ",
        //       name: " ",
        //       describe: "学习强国发表文章",
        //       remarks:" 发表了5篇",
        //       mark: 10,
        //       prove:[
        //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //       ],
        //       sc:'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       sign:0,
        //       reason:"tql",
        //     },
        //   ],
        //   reviewed:[
        //     {
        //       id:123,
        //       scyear: "2021~2022学年",
        //       semester: "第一学期",
        //       time: 2021-10-8,
        //       type:"艺体参与",
        //       level: "省级",
        //       order:"参与体育竞赛",
        //       name: "省运动会",
        //       describe: "参加省运动会当运动员",
        //       remarks:" ",
        //       mark: 10,
        //       prove:[
        //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //       ],
        //       sc:'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       sign:1,
        //       reason:"tql",
        //     },
        //     {
        //       id:123,
        //       scyear: "2020~2021学年",
        //       semester: "第二学期",
        //       time: 2020-10-8,
        //       type:"艺体荣誉",
        //       level: "校级",
        //       order:"二等奖",
        //       name: "校合唱比赛",
        //       describe: "参加校合唱比赛活动二等奖",
        //       remarks:"评为先进个人",
        //       mark: 12,
        //       prove:[
        //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //       ],
        //       sc:'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       sign:1,
        //       reason:"tql",
        //     },
        //     {
        //       id:123,
        //       scyear: "2018~2019学年",
        //       semester: "第二学期",
        //       time: 2019-3-8,
        //       type:"其他艺体",
        //       level: " ",
        //       order:" ",
        //       name: " ",
        //       describe: "学习强国发表文章",
        //       remarks:" 发表了5篇",
        //       mark: 10,
        //       prove:[
        //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //       ],
        //       sc:'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       sign:2,
        //       reason:"tql",
        //     },
        //     {
        //       id:123,
        //       scyear: "2021~2022学年",
        //       semester: "第一学期",
        //       time: 2021-10-8,
        //       type:"艺体参与",
        //       level: "省级",
        //       order:"参与体育竞赛",
        //       name: "省运动会",
        //       describe: "参加省运动会当运动员",
        //       remarks:" ",
        //       mark: 10,
        //       prove:[
        //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //       ],
        //       sc:'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       sign:2,
        //       reason:"tql",
        //     },
        //     {
        //       id:123,
        //       scyear: "2020~2021学年",
        //       semester: "第二学期",
        //       time: 2020-10-8,
        //       type:"艺体荣誉",
        //       level: "校级",
        //       order:"二等奖",
        //       name: "校合唱比赛",
        //       describe: "参加校合唱比赛活动二等奖",
        //       remarks:"评为先进个人",
        //       mark: 12,
        //       prove:[
        //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //       ],
        //       sc:'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       sign:1,
        //       reason:"tql",
        //     },
        //     {
        //       id:123,
        //       scyear: "2018~2019学年",
        //       semester: "第二学期",
        //       time: 2019-3-8,
        //       type:"其他艺体",
        //       level: " ",
        //       order:" ",
        //       name: " ",
        //       describe: "学习强国发表文章",
        //       remarks:" 发表了5篇",
        //       mark: 10,
        //       prove:[
        //         'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //         'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        //       ],
        //       sc:'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        //       sign:2,
        //       reason:"tql",
        //     },
        //   ]
        // }
      }},
    mounted () {
      var stunum=this.$session.get("user").stunum
      this.getAuditdetails(stunum)
    },
    methods:{
      async getAuditdetails(stunum){
        const { data }=await getauditdetails(stunum)
        console.log(data.data. artsp)
        this. artsp=data.data. artsp
      },
      async dleteYt(ytid){
        const { data }=await deleteyt(ytid)
        var code=data.code
        if(code===200)this.$message({
          showClose: true,
          message: '删除上报数据成功！',
          type: 'success'
        });
        else this.$message({
          showClose: true,
          message: '删除上报数据失败！',
          type: 'error'
        });
        var stunum=this.$session.get("user").stunum
        this.getAuditdetails(stunum)
      },
      artdetail(info){
        this.artdialogFormVisible=true;
        this.artshangbao=info;
      },
      artdel(id)
      {
        this.dleteYt(id)
      },
      artChangescdialogFormVisible(){
        this.artdialogFormVisible=false;
      }
    }}
</script>

<style scoped>
  .artlist{
    width: 40vw;
    height: 600px;
    background: #fcfcfc url('../../../assets/bac/Live.png')  center / 40% auto;
    background-repeat: no-repeat;
  }
</style>
