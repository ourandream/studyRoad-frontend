<template>
  <div>
    <el-container>
      <el-container>
        <el-breadcrumb
          separator="》"
          style="
            padding-left: 10px;
            padding-bottom: 1%;
            font-size: 15px;
            padding-top: 0.5%;
          "
        >
          <el-breadcrumb-item :to="{ path: '/TeaHome' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>素质报告</el-breadcrumb-item>
          <el-breadcrumb-item>个人综测详细</el-breadcrumb-item>
        </el-breadcrumb>
      </el-container>
      <el-container>
        <el-descriptions
          size="medium"
          border
          style="margin-left: 10%; padding-right: 50%"
        >
          <el-descriptions-item
            label="综测学年"
            label-class-name="zhmy-label"
            content-class-name="zhmy-content"
            >{{ this.scyear }}</el-descriptions-item
          >
        </el-descriptions>
        <el-button type="primary" plain @click="back">返回</el-button>
      </el-container>
    </el-container>
    <el-container>
      <!--      <el-scrollbar style="height: 590px;">-->
      <el-card class="zhcomq">
        <el-descriptions
          class="margin-top"
          :column="4"
          border
          label-style="width:135px;"
        >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              姓名
            </template>
            李昊
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              专业
            </template>
            计算机科学与技术
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              年级
            </template>
            2018级
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              综评总分/排名
            </template>
            <el-tag type="success" size="big">80.5</el-tag>/
            <el-tag type="warning" size="big">10</el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <el-descriptions
          class="margin-top"
          :column="2"
          size="mini"
          border
          label-style="width:135px;font-size:15px"
        >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              学业表现模块
            </template>
            <el-table
              :data="zhstudiesData"
              border
              size="mini"
              style="width: 100%"
            >
              <el-table-column prop="multiple" label="综合绩点" width="180">
              </el-table-column>
              <el-table-column prop="ranking" label="排名"> </el-table-column>
              <el-table-column prop="mark" label="分值" width="180">
              </el-table-column>
            </el-table>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              模块分小计
            </template>
            <el-descriptions
              class="margin-top"
              :column="3"
              size="mini"
              border
              direction="vertical"
            >
              <el-descriptions-item>
                <template slot="label"> 原始分 </template>
                {{ zhstudiesData[0].mark }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 标准分 </template>
                {{ zhstudiesData[0].mark }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 模块排名 </template>
                {{ zhstudiesData[0].ranking }}
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              思想品德模块
            </template>
            <el-table
              :data="zhsixiangData"
              border
              max-height="232px"
              show-summary
              sum-text="模块分小计"
              size="mini"
              style="width: 100%"
            >
              <el-table-column label="模块小类" prop="type" width="180">
              </el-table-column>
              <el-table-column prop="matter" label="加分项"> </el-table-column>
              <el-table-column label="分值" sortable prop="mark" width="180">
                <template slot-scope="scope">
                  <div>
                    <el-tag
                      v-if="scope.row.mark < 0"
                      type="danger"
                      size="mini"
                      >{{ scope.row.mark }}</el-tag
                    >
                  </div>
                  <div>
                    <el-tag
                      v-if="scope.row.mark > 0"
                      type="success"
                      size="mini"
                      >{{ scope.row.mark }}</el-tag
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              模块分小计
            </template>
            <el-descriptions
              class="margin-top"
              :column="3"
              size="mini"
              border
              direction="vertical"
            >
              <el-descriptions-item>
                <template slot="label"> 原始分 </template>
                80.5
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 标准分 </template>
                100
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 模块排名 </template>
                4
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              科研竞赛模块
            </template>
            <el-table
              :data="zhkeyanData"
              border
              max-height="232px"
              show-summary
              sum-text="模块分小计"
              size="mini"
              style="width: 100%"
            >
              <el-table-column prop="type" label="模块小类" width="180">
              </el-table-column>
              <el-table-column prop="describe" label="加分项">
              </el-table-column>
              <el-table-column label="分值" sortable prop="mark" width="180">
                <template slot-scope="scope">
                  <div>
                    <el-tag
                      v-if="scope.row.mark < 0"
                      type="danger"
                      size="mini"
                      >{{ scope.row.mark }}</el-tag
                    >
                  </div>
                  <div>
                    <el-tag
                      v-if="scope.row.mark > 0"
                      type="success"
                      size="mini"
                      >{{ scope.row.mark }}</el-tag
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              模块分小计
            </template>
            <el-descriptions
              class="margin-top"
              :column="3"
              size="mini"
              border
              direction="vertical"
            >
              <el-descriptions-item>
                <template slot="label"> 原始分 </template>
                80.5
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 标准分 </template>
                100
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 模块排名 </template>
                4
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              艺体素养模块
            </template>
            <el-table
              :data="zhyitiData"
              border
              max-height="232px"
              show-summary
              sum-text="模块分小计"
              size="mini"
              style="width: 100%"
            >
              <el-table-column prop="type" label="模块小类" width="180">
              </el-table-column>
              <el-table-column prop="describe" label="加分项">
              </el-table-column>
              <el-table-column label="分值" sortable prop="mark" width="180">
                <template slot-scope="scope">
                  <div>
                    <el-tag
                      v-if="scope.row.mark < 0"
                      type="danger"
                      size="mini"
                      >{{ scope.row.mark }}</el-tag
                    >
                  </div>
                  <div>
                    <el-tag
                      v-if="scope.row.mark > 0"
                      type="success"
                      size="mini"
                      >{{ scope.row.mark }}</el-tag
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              模块分小计
            </template>
            <el-descriptions
              class="margin-top"
              :column="3"
              size="mini"
              border
              direction="vertical"
            >
              <el-descriptions-item>
                <template slot="label"> 原始分 </template>
                80.5
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 标准分 </template>
                100
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 模块排名 </template>
                4
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              实践育人模块
            </template>
            <el-table
              :data="zhshijianData"
              border
              max-height="232px"
              show-summary
              sum-text="模块分小计"
              size="mini"
              style="width: 100%"
            >
              <el-table-column prop="type" label="模块小类" width="180">
              </el-table-column>
              <el-table-column prop="describe" label="加分项">
              </el-table-column>
              <el-table-column label="分值" sortable prop="mark" width="180">
                <template slot-scope="scope">
                  <div>
                    <el-tag
                      v-if="scope.row.mark < 0"
                      type="danger"
                      size="mini"
                      >{{ scope.row.mark }}</el-tag
                    >
                  </div>
                  <div>
                    <el-tag
                      v-if="scope.row.mark > 0"
                      type="success"
                      size="mini"
                      >{{ scope.row.mark }}</el-tag
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              模块分小计
            </template>
            <el-descriptions
              class="margin-top"
              :column="3"
              size="mini"
              border
              direction="vertical"
            >
              <el-descriptions-item>
                <template slot="label"> 原始分 </template>
                80.5
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 标准分 </template>
                100
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"> 模块排名 </template>
                4
              </el-descriptions-item>
            </el-descriptions>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <!--      </el-scrollbar>-->
    </el-container>
  </div>
</template>

<script>
export default {
  name: "zhdetail",
  data() {
    return {
      stunum: this.$route.query.stuid,
      scyear: this.$route.query.scyear,
      zhstudiesData: [
        {
          multiple: 3.82,
          ranking: 15,
          mark: 88.2,
        },
      ],
      zhsixiangData: [
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "荣誉奖项",
          level: "校级",
          order: "荣誉称号",
          matter: "优秀共青团员",
          describe: "荣获优秀共青团员称号",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131188",
          stu: "俊杰",
          id: 127,
          scyear: "2019~2020学年",
          semester: "第二学期",
          module: "思想品德",
          time: 2020 - 3 - 28,
          type: "通报表扬",
          level: "",
          order: "",
          matter: "好人好事受到学院升旗仪式上通报表扬",
          describe: "系统牛逼",
          remarks: "我是个好人",
          mark: 2,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
      ],
      zhkeyanData: [
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "学术竞赛",
          level: "国家级",
          order: "二等奖",
          matter: "数学建模大赛",
          describe: "全国数学建模大赛二等奖",
          remarks: "我很强",
          mark: 15,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131157",
          stu: "华生",
          id: 124,
          scyear: "2019~2020学年",
          semester: "第一学期",
          module: "科研竞赛",
          time: "2020-1-28",
          type: "论文专利",
          level: "实用性专利",
          order: "第二作者",
          matter: "系统",
          describe: "系统牛逼",
          remarks: "我很强",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
      ],
      zhyitiData: [
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体参与",
          level: "校级",
          order: "参与体育竞赛",
          matter: "校运动会",
          describe: "参加校运动会做运动员",
          remarks: "评为先进个人",
          mark: 6,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131210",
          stu: "敏捷",
          id: 113,
          scyear: "2020~2021学年",
          semester: "第二学期",
          module: "艺体素养",
          time: "2020-10-8",
          type: "艺体荣誉",
          level: "校级",
          order: "二等奖",
          matter: "校合唱比赛",
          describe: "参加校合唱比赛活动二等奖",
          remarks: "评为先进个人",
          mark: 12,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
      ],
      zhshijianData: [
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "职务加分",
          level: "三级岗位",
          order: "党团组织",
          matter: "满一年",
          describe: "院团委副书记",
          remarks: " ",
          mark: 45,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
        {
          stuid: "20182131130",
          stu: "李话",
          id: 123,
          scyear: "2021~2022学年",
          semester: "第一学期",
          module: "实践创业",
          time: "2021-10-8",
          type: "赛事荣誉",
          level: "省级",
          order: "荣誉称号",
          matter: "优秀共青团干部",
          describe: "省优秀共青团干部",
          remarks: " ",
          mark: 20,
          prove: [
            "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
            "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
          ],
          sign: 1,
          reason: "材料不完整",
          manname: undefined,
          manid: undefined,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back(-1);
    },
  },
};
</script>

<style>
.zhmy-label {
  background-color: #6be4e8;
}

.zhmy-content {
  background: #bee8f3;
}
.zhcomq {
  width: 100%;
  min-height: 590px;
  /*<!--background: #fcfcfc url('../../assets/bac/comq.png') no-repeat bottom right/ 25% auto;-->*/
}
</style>
