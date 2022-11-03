<template>
    <ElDescriptions :title="props.title" :column="props.column" border direction="vertical">
        <template #extra>
            <el-button type="primary" @click="editDescriptions">{{ descriptionsButtonContent }}</el-button>
        </template>
        <el-descriptions-item :class-name="currentIndex==index?'focus':''" v-for="(i,index)  in Object.keys(descriptionsTable)">
            <template #label>
                <div class="cell-item">
                    {{ props.descriptionsTable[i].title }}
                </div>
            </template>
            <input ref="inputElements" @focus="()=>{currentIndex=index}" class="descriptions__input" v-model="descriptions[i]"
                :disabled="isInputMode" />
        </el-descriptions-item>
    </ElDescriptions>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import axios from '@/axios'
import {  DescriptionsTable} from "@/types";
let props = defineProps<{
    descriptionsTable: DescriptionsTable,
    url: string
    title: string
    column: number
}>()

let temp: { [index: string]: string } = {}
for (let i of Object.keys(props.descriptionsTable)) {
    temp[i] = ''
}
let descriptions = ref(temp)
let isInputMode = ref(true)
let descriptionsButtonContent = ref('修改')
let inputElements = ref<HTMLInputElement[] | null>()
let preDescriptions = ref(temp)
let currentIndex=ref(-1)
onMounted(async () => {
    let responese = await axios.get(props.url)
    descriptions.value = responese.data
    preDescriptions.value = { ...responese.data }
})
async function editDescriptions() {
    if (!isInputMode.value) {
        let result = {}
        for (let i of Object.keys(preDescriptions.value)) {
            if (descriptions.value[i] != preDescriptions.value[i]) {
                let pattern = props.descriptionsTable[i].pattern ? props.descriptionsTable[i].pattern : /.+/
                let patternMessage = props.descriptionsTable[i].patternMessage ? props.descriptionsTable[i].patternMessage : '输入不能为空'
                if (props.descriptionsTable[i].empty || pattern.test(descriptions.value[i])) {
                    result[i] = descriptions.value[i]
                }
                else {
                    ElMessage.error({ message: `${props.descriptionsTable[i].title}:${patternMessage}` })
                    nextTick(()=>{inputElements.value[Object.keys(props.descriptionsTable).indexOf(i)].focus()})
                    return
                }
            }
        }
        console.log(result)
        if (Object.keys(result).length != 0) {
            let response = await axios.post(props.url, result)
            if (response.status == 200) {
                ElMessage({
                    message: '成功修改基本信息',
                    type: 'success'
                })
            }
            else if (response.status == 400) {
                ElMessage({
                    message: response.data['message'],
                    type: 'error'

                })
            }
        }
        else {
            ElMessage('未修改')
        }

        descriptionsButtonContent.value = '修改'
        isInputMode.value = true
        currentIndex.value=-1
    }
    else {
        isInputMode.value = false
        descriptionsButtonContent.value = '确定修改'
        nextTick(() => { inputElements.value[0].focus() })
        currentIndex.value=0
        for (let i of Object.keys(preDescriptions.value)) {
            preDescriptions.value[i] = descriptions.value[i]
        }
    }
}
</script>

<style lang="scss" scoped>
.descriptions__input {
    border: none;
    width: 100%;

    &:disabled {
        background-color: rgba($color: #000000, $alpha: 0);
        color: black;
    }

    &:focus-visible {
        outline: none;
    }

}
</style>


<style>
.focus{
    outline: 1px solid black !important;
}
</style>