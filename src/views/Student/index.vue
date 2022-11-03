<template>
    <div class="page">
        <editable-descriptions title="基本信息" style="margin-bottom:3vh" :column="3" url="/api/student/maininfo/stuinfo"
            :descriptions-table="basicInfoDescriptionTable" />
        <editable-descriptions title="家庭信息" :column="3" url="/api/student/maininfo/familyinfo"
            :descriptions-table="familyDescriptionsTable" />
    </div>
</template>

<script setup lang="ts">
import {DescriptionsTable} from '@/types'

let basicInfoDescriptionTable:DescriptionsTable = {
    username: {
        title:'姓名' 
    },
    gender: {
        title:'性别',
        pattern:/^(男|女)$/,
        patternMessage:'请输入男或女'
    },
    id: {
        title:'学号',
        pattern:/\d+/,
        patternMessage:'请输入多位数字'
    },
    idNum: {
        title:'身份证号'
    },
    grade: {
        title:'年级'
    },
    major: {
        title:'专业'
    },
    dormitory: {
        title:'宿舍',
    },
    birthday: {
        title:'生日',
        pattern:/\d{4,4}-\d{2,2}-\d{2,2}/,
        patternMessage:'请按yyyy-mm-dd格式输入'
    },
    nationality: {
        title:'民族'
    },
    phone: {
        title:'电话号码',
        pattern:/\d+/,
        patternMessage:'请输入多位数字'
    },
    address: {
        title:'地址'
    },
}

let familyDescriptionsTable:DescriptionsTable = {
    address: {
        title:'家庭地址'
    },
    familyPhone: {
        title:"家庭联系电话",
        pattern:/^[0-9]+$/,
        patternMessage:'请输入多位数字作为电话'
    },
    isPoor: {
        title:"是否困难",
        pattern:/^(是|否)$/,
        patternMessage:'请输入是或否'
    },
    poorSituation: {
        title:'困难情况',
        empty:true
    },
}



</script>

<style lang="scss" scoped>
.page {
    padding: 0 2vw;
    margin-top: 3vh;
}
</style>
