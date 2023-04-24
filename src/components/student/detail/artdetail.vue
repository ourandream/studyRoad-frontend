<template>
  <el-dialog
    title="上报数据详细"
    :visible.sync="artdialogFormVisible"
    class="artDetail"
    center
    @close="Close"
  >
    <el-descriptions class="margin-top" :column="2" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          学年
        </template>
        {{ artshangbao.scyear }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          学期
        </template>
        <div v-if="this.artshangbao.semester === 1">第一学期</div>
        <div v-if="this.artshangbao.semester === 2">第二学期</div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          艺体素养成果时间
        </template>
        {{ artshangbao.time }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          类型
        </template>
        {{ artshangbao.type }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          艺体成果名
        </template>
        {{ artshangbao.name }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          级别
        </template>
        {{ artshangbao.level }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          等次
        </template>
        {{ artshangbao.order }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          成果描述
        </template>
        {{ artshangbao.describe }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          加分数
        </template>
        {{ artshangbao.mark }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        {{ artshangbao.remarks }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          证明材料
        </template>
        <div class="demo-image__preview">
          <el-image
            style="width: 100px; height: 100px"
            :src="artshangbao.prove"
            :preview-src-list="artshangbao.srcList"
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
        <el-tag v-if="artshangbao.sign === 0" size="small">待审核</el-tag>
        <el-tag v-if="artshangbao.sign === 1" size="small" type="success"
          >审核通过</el-tag
        >
        <el-tag v-if="artshangbao.sign === 2" size="small" type="danger"
          >审核未通过</el-tag
        >
      </el-descriptions-item>

      <el-descriptions-item v-if="artshangbao.sign === 2">
        <template slot="label">
          <i class="el-icon-tickets"></i>
          审核意见
        </template>
        {{ artshangbao.reason }}
      </el-descriptions-item>
    </el-descriptions>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" round @click="Close">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "artdetail",
  props: ["artdialogFormVisible", "artshangbao"],
  methods: {
    Close() {
      this.artdialogFormVisible = false;
      this.$emit("artChangedialogFormVisible");
    },
  },
};
</script>

<style scoped></style>
