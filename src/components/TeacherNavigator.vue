<template>
    <user-info></user-info>
    <el-menu :default-openeds="['1', '2']" class="el-menu" router default-active="/">
    <el-menu-item>
        <el-icon>
            <list/>
        </el-icon>
        综合测评
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import {
    List, UserFilled, Opportunity, HomeFilled, Histogram, Management,
    LocationFilled
} from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu {
    border-bottom: 1px solid #e6e6e6;
    border-right: none;
}
</style>
j