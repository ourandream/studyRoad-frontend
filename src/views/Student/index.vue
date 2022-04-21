<template>
    <div class="page">
        <el-descriptions class="margin-top" title="基本信息" :column="3" border direction="vertical">
            <template #extra>
                <el-button type="primary">修改</el-button>
            </template>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <user />
                        </el-icon>
                        姓名
                    </div>
                </template>
                {{ userInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        学号
                    </div>
                </template>
                {{ userInfo['id'] }}
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        性别
                    </div>
                </template>
                {{ userInfo.gender }}
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        民族
                    </div>
                </template>
                {{ userInfo.nation }}
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        电话
                    </div>
                </template>
                {{ userInfo.phoneNumber }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        政治面貌
                    </div>
                </template>
                <el-tag size="small">{{ userInfo.politicsState }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        户口类型
                    </div>
                </template>
                {{ userInfo.accountType }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        地址
                    </div>
                </template>
                {{ userInfo.address }}
            </el-descriptions-item>

        </el-descriptions>
        <el-descriptions title="专业信息" border direction="vertical">
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon :style="iconStyle">
                            <office-building />
                        </el-icon>
                        主修专业
                    </div>
                </template>
                {{ userInfo.mainMajor }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        班级
                    </div>
                </template>
                {{ userInfo.className }}
            </el-descriptions-item>
        </el-descriptions>

    </div>
</template>

<script setup lang="ts">
import {
    User,
    OfficeBuilding,
} from '@element-plus/icons-vue'
import axios from 'axios';
import {useUserInfo} from '../../stores/store'

let userInfo = useUserInfo()
const size = ref('')
const iconStyle = computed(() => {
    const marginMap = {
        large: '8px',
        default: '6px',
        small: '4px',
    }
    return {
        marginRight: marginMap[size.value] || marginMap.default,
    }
})


</script>

<style scoped>
.page {
    padding-left: 5%;
}

.el-descriptions {
    margin-top: 20px;
}

.cell-item {
    display: flex;
    align-items: center;
}

.margin-top {
    margin-top: 20px;
}
</style>
