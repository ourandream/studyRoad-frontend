import axios from "axios";
import { router } from './router';
import { useUserInfo } from './stores/store'

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:4523/m1/1712777-0-default/',
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    validateStatus: () => true,
});

let userInfo = useUserInfo()

apiClient.defaults.baseURL = 'https://mock.apifox.cn/m1/1712777-0-default'
apiClient.interceptors.response.use(response => response, (error) => {
    switch (error.response.status) {
        case 401:
            router.push({
                path: '/login'
            })
    }
    return Promise.reject(error)
})
apiClient.interceptors.request.use(config => {
    if (sessionStorage.getItem('token')) {
        config.headers = { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    }
    config.params = { id: userInfo.id }
    return config
}, error => Promise.reject(error))



export default apiClient;