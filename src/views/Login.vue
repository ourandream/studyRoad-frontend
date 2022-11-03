<template>
    <div class="page">
        <el-card class="login-card">
            <div class="login-title">
                <h2>欢迎进入学路系统</h2>
            </div>
            <div class="form-wrapper">
                <el-form :model="userData" status-icon label-position="top" class="demo-ruleForm" :rules="rules">
                    <el-form-item label="账号" prop="id">
                        <el-input v-model="userData.id" type="text" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" style="margin-bottom: 0;">
                        <el-input v-model="userData.password" type="password" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-row justify="center" style="width:100%;padding-top: 7%;">
                            <el-button type="primary" @click="login">登录</el-button>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
            <div class="link-block">
                <el-link :underline="false" @click="toChangePassword">忘记密码</el-link>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios, { AxiosError } from 'axios';
import { useUserInfo } from '../stores/store';

const router = useRouter()

let userData = ref({
    id: '',
    password: ''
})
let userInfo = useUserInfo()

const validateID = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    }
    else {
        callback()
    }
}

const validatePassword = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    }
    else if (value.length < 6) {
        callback(new Error('请输入至少六位字符'))
    }
    else {
        callback()
    }
}

const chexkPasswordLength = (rule: any, value: string, callback: any) => {
    if (value.length < 6) {
        callback(new Error('请输入至少6位字符'))
    }
    else {
        callback()
    }
}

const rules = reactive({
    id: [
        {
            validator: validateID,
            trigger: 'blur'
        }
    ],
    password: [
        {
            validator: validatePassword,
            trigger: 'blur'
        },
        {
            validator: chexkPasswordLength,
            trigger: 'change'
        }
    ]
})


async function login() {
    if (userData.value.id === '') {
        ElMessage.error('请输入账号！')
        return
    }
    else if (userData.value.password === '') {
        ElMessage.error('请输入密码！')
        return
    }
    try {
        // let response = await axios.post('/auth/login', {
        //     username: userData.value.id,
        //     password: userData.value.password
        // })
        // sessionStorage.setItem('token', response.data['access_token'])
        // axios.get('/api/user').then(res => {
        //     userInfo.$patch({
        //         ...res.data
        //     })
        //     if (userInfo.role === 'teacher') {
        //         router.push({
        //             path: '/teacher'
        //         })
        //     }
        //     else {
        //         router.push({
        //             path: '/student'
        //         })
        //     }
        // })
        sessionStorage.setItem('token','t')
        if(userData.value.id==='teacher'){
            userInfo.$patch(JSON.parse('{"name":"李某","username":"user","gender":"女","className":"一班","nation":"汉","phoneNumber":"+1234567890","accountType":"内地","mainMajor":"网工","politicsState":"群众","address":"广东省广州市白云区","authorities":[{"authority":"ROLE_STUDENT"},{"authority":"ROLE_TEACHER"}],"id":1,"enabled":true,"lastPasswordResetDate":"2022-04-03T08:07:37.587+00:00"}'))
            router.push('/teacher')
        }
        else{
            router.push('/student/')
        }
    } catch (error) {
        if ((error as AxiosError).response!.status === 401) {
            ElMessage.error('密码错误或用户不存在！')
        }
    }
}

function toChangePassword() {
    router.push({
        path: '/changePassword'
    })
}
</script>

<style scoped>
.page {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page::before {
    content: "";
    position: absolute;
    top: -3;
    left: -1;
    height: 103vh;
    width: 102vw;
    background-image: url("../assets/bg.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 30%;
    z-index: -1;
    filter: blur(12px);
}

.login-card {
    box-sizing: border-box;
    width: 35%;
    text-align: center;
    padding: 0 3%;
    position: relative;
}

.link-block {
    width: 100%;
    text-align: right;
    position: absolute;
    right: 2%;
    bottom: 2%;
}

@media screen and (max-width: 400px) {
    .login-card {
        width: 98%;
    }

    .page::before {
        background-size: auto;
    }
}
</style>
