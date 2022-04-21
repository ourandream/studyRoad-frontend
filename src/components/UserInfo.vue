<template>
    <div class="user-block">
        <el-dropdown>
            <el-avatar :size="60">
                <img src="../assets/student.png" />
            </el-avatar>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <p>{{ name+identity}}</p>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { useRouter } from 'vue-router'
import { useUserInfo } from '../stores/store'; 
import {storeToRefs} from 'pinia'

const router = useRouter()
const {name,role} =storeToRefs(useUserInfo()) 
function logout() {
    sessionStorage.removeItem('token')
    router.push({
        path: '/login'
    })
}

let identity=computed(()=>{
    if(role.value=='student'){
        return '同学'
    }
    else if(role.value==='teacher'){
        return '老师'
    }
})
</script>

<style scoped>
.user-block {
    text-align: center;
    padding-top: 5%;
    position: sticky;
    border-bottom: 1px solid #e6e6e6;
    top: 0;
    z-index: 1;
    background-color: white;
}
</style>