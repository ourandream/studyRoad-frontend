<template>

 <div class="selects">
        <ElSelect v-if="year" v-model="year" @change="val=>{$emit('update:year',val);$emit('change')}">
            <ElOption v-for="i in schoolYears" :value="i" :label="i" ></ElOption>
        </ElSelect>
        <ElSelect v-if="term" v-model="term" @change="val=>{$emit('update:term',val);$emit('change')}">
            <ElOption v-for="i in [1, 2]" :value="i" :label="`第${i}学期`" />
        </ElSelect>
        <ElSelect v-if="week" v-model="week" @change="val=>{$emit('update:week',val);$emit('change')}">
            <ElOption v-for="i in weeksNum" :value="i" :label="`第${i + 1}周`" />
        </ElSelect>
    </div>

</template>

<script lang="ts" setup>
import { useUserInfo } from '@/stores/store';

defineProps<{year?:string,term?:number,week?:number,weeksNum?:number[]}>()
const emit=defineEmits(['update:year','update:term','update:week','change'])

const { schoolYear } = useUserInfo()
let schoolYears: string[] = []
for (let i = 0; i < 4; ++i) {
    schoolYears.push(`${schoolYear + i}-${schoolYear + i + 1}`)
}
</script>

<style scoped>
.selects {
    display: flex;
    justify-content: space-around;
    margin: 3vh 0;
}
</style>