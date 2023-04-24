<template>
  <el-dialog title="上报数据详细" :visible.sync="dialogFormVisible" class="subDetail" center @close="Close">
    <el-descriptions class="margin-top"  :column="2" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          学年
        </template>
        {{shangbao.scyear}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          学期
        </template>
        <div v-if="this.shangbao.semester===1">第一学期</div>
        <div v-if="this.shangbao.semester===2">第二学期</div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          加分项时间
        </template>
        {{shangbao.time}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          加分类型
        </template>
        {{shangbao.type}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          加分事项
        </template>
        {{shangbao.matter}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          级别
        </template>
        {{shangbao.level}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          等次
        </template>
        {{shangbao.order}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          加分描述
        </template>
        {{shangbao.describe}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          加分数
        </template>
        {{shangbao.mark}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        {{shangbao.remarks}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          证明材料
        </template>
        <div class="demo-image__preview">
        <el-image
          style="width: 100px; height: 100px"
          :src="shangbao.prove"
          :preview-src-list="shangbao.srcList"
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
        <el-tag v-if="shangbao.sign===0" size="small">待审核</el-tag>
        <el-tag v-if="shangbao.sign===1" size="small" type="success">审核通过</el-tag>
        <el-tag v-if="shangbao.sign===2" size="small" type="danger">审核未通过</el-tag>
      </el-descriptions-item>

      <el-descriptions-item v-if="shangbao.sign===2">
        <template slot="label">
          <i class="el-icon-tickets"></i>
          审核意见
        </template>
        {{shangbao.reason}}
      </el-descriptions-item>

    </el-descriptions>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" round @click="Close">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'subdetail',
  props:['dialogFormVisible','shangbao'],
    methods: {
      Close () {
        this.dialogFormVisible = false;
        this.$emit("ChangedialogFormVisible");
      },
    }
  }

</script>

<style scoped>

</style>
