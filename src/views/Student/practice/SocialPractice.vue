<template>
    <div class="main" v-loading="loading">
        <div class="main__buttons">
            <ElButton @click="addFromVisibility = true">上传新实践记录</ElButton>
            <ElButton @click="excludePassItemVisibility = true">显示审核结果</ElButton>
        </div>
        <div class="main__timeline">
            <ElTimeline>
                <ElTimelineItem v-for="passedItem in passedPracticeItems" :timestamp="passedItem.date" placement="top"
                    center>
                    <ElCard>
                        <div class="timelineItem">
                            <div class="timelineItem__text">
                                <h4>{{ passedItem.name }}</h4>
                                <div>{{ passedItem.description }}</div>
                            </div>
                            <div class="timelineItem__img">
                                <img :src="passedItem.achievementImage" alt="成果展示图片" />
                            </div>
                        </div>
                    </ElCard>
                </ElTimelineItem>
            </ElTimeline>
        </div>
    </div>
    <ElDialog v-model="addFromVisibility" title="添加实践活动">
        <ElForm :model="newPracticeItem">
            <ElFormItem label="活动名">
                <ElInput v-model="newPracticeItem.name" />
            </ElFormItem>
            <ElFormItem label="地点">
                <ElInput v-model="newPracticeItem.place" />
            </ElFormItem>
            <ElFormItem label="时间">
                <ElDatePicker type="datetime" v-model="newPracticeItem.date" />
            </ElFormItem>
            <ElFormItem label="描述">
                <ElInput type="textarea" v-model="newPracticeItem.description" />
            </ElFormItem>
            <ElFormItem label="证书图片">
                <ElUpload action="https://mock.apifox.cn/m1/1712777-0-default/student/practice/socialpractice/items"
                    class="avatar-uploader"> <el-icon class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </ElUpload>
            </ElFormItem>
            <ElFormItem label="成果图片">
                <ElUpload action="https://mock.apifox.cn/m1/1712777-0-default/student/practice/socialpractice/items"
                    class="avatar-uploader"> <el-icon class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </ElUpload>
            </ElFormItem>
        </ElForm>
    </ElDialog>
    <ElDialog v-model="excludePassItemVisibility" title="审核中实践活动">
        <div class="reviewStatusDialog">
            <ElCard v-for="reviewingPracticeItem in reviewingPracticeItems" class="reviewStatusDialog--warning">
                <div>
                    <h4>{{ reviewingPracticeItem.name }}</h4>
                    <div>
                        {{ reviewingPracticeItem.description }}
                    </div>
                </div>
            </ElCard>
            <ElCard v-for="rejectedPracticeItem in rejectedPracticeItems" class="reviewStatusDialog--error">
                <div>
                    <h4>{{ rejectedPracticeItem.name }}</h4>
                    <div>
                        {{ rejectedPracticeItem.description }}
                    </div>
                </div>
            </ElCard>
        </div>
    </ElDialog>
</template>

<script lang="ts" setup>
import axios from '@/axios';
import { SocialPracticeItem } from '@/types';
import { Plus } from '@element-plus/icons-vue'

let addFromVisibility = ref(false)
let newPracticeItem = ref<SocialPracticeItem>({
    name: '',
    place: '',
    description: '',
    date: '',
    certificateImage: '',
    achievementImage: ''
})
let excludePassItemVisibility = ref(false)

let passedPracticeItems = ref<SocialPracticeItem[]>([])
let rejectedPracticeItems = ref<SocialPracticeItem[]>([])
let reviewingPracticeItems = ref<SocialPracticeItem[]>([])
let combineRejectedReviewing = ref<SocialPracticeItem[]>([])

let loading = ref(true)
async function init() {
    let results = await Promise.allSettled(
        [
            axios.get('/student/practice/socialpractice/items', { params: { type: 'passed' } }),
            axios.get('/student/practice/socialpractice/items', { params: { type: 'rejected' } }),
            axios.get('/student/practice/socialpractice/items', { params: { type: 'reviewing' } }),
        ])
    let resultAsignObjects = [passedPracticeItems, rejectedPracticeItems, reviewingPracticeItems]
    for (let [index, result] of results.entries()) {
        if (result.status === 'rejected') {
            throw new Error('未正确获取到数据')
        }
        else {
            resultAsignObjects[index].value = result.value.data
        }
    }
    loading.value = false
    for (let items of resultAsignObjects) {
        items.value.sort((a, b) => {
            return (new Date(b.date).getTime()) - (new Date(a.date).getTime())
        })
    }
}
init()
</script>

<style scoped lang="scss">
.main {
    &__buttons {
        display: flex;
        justify-content: space-around;
        margin-bottom: 4vh;
    }
}

.timelineItem {
    display: flex;
    justify-content: space-between;

    &__img {
        img {
            height: 25vh;
        }
    }
}

.reviewStatusDialog {
    &--warning {
        background-color: $warning--background;
        margin: 3vh 0;
    }

    &--error {
        background-color: $error--background;
        margin: 3vh 0;
    }
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>