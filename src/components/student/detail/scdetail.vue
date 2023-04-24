<template>
  <el-dialog
    title="上报数据详细"
    :visible.sync="scdialogFormVisible"
    class="scDetail"
    center
    @close="Close"
  >
    <el-descriptions class="margin-top" :column="2" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          学年
        </template>
        {{ scshangbao.scyear }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          学期
        </template>
        <div v-if="this.scshangbao.semester === 1">第一学期</div>
        <div v-if="this.scshangbao.semester === 2">第二学期</div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          科研竞赛成果时间
        </template>
        {{ scshangbao.time }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          类型
        </template>
        {{ scshangbao.type }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          科研竞赛成果名
        </template>
        {{ scshangbao.name }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          级别
        </template>
        {{ scshangbao.level }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          等次
        </template>
        {{ scshangbao.order }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          成果描述
        </template>
        {{ scshangbao.describe }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          加分数
        </template>
        {{ scshangbao.mark }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        {{ scshangbao.remarks }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          证明材料
        </template>
        <div class="demo-image__preview">
          <el-image
            style="width: 100px; height: 100px"
            :src="scshangbao.prove"
            :preview-src-list="scshangbao.srcList"
          >
          </el-image>
        </div>
        <!--        <img src="../../../assets/e.jpg" width="80"height="80"  >-->
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          审核状态
        </template>
        <el-tag v-if="scshangbao.sign === 0" size="small">待审核</el-tag>
        <el-tag v-if="scshangbao.sign === 1" size="small" type="success"
          >审核通过</el-tag
        >
        <el-tag v-if="scshangbao.sign === 2" size="small" type="danger"
          >审核未通过</el-tag
        >
      </el-descriptions-item>

      <el-descriptions-item v-if="scshangbao.sign === 2">
        <template slot="label">
          <i class="el-icon-tickets"></i>
          审核意见
        </template>
        {{ scshangbao.reason }}
      </el-descriptions-item>
    </el-descriptions>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" round @click="Close">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "scdetail",
  props: ["scdialogFormVisible", "scshangbao"],
  methods: {
    Close() {
      this.scdialogFormVisible = false;
      this.$emit("scChangedialogFormVisible");
    },
  },
};
</script>

<style scoped></style>
