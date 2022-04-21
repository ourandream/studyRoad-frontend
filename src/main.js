import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { router } from './router';
import axios from 'axios'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

axios.defaults.baseURL = 'http://localhost:8080'
axios.interceptors.response.use(response => response, (error) => {
    switch (error.response.status) {
        case 401:
            router.push({
                path: '/login'
            })
    }
    return Promise.reject(error)
})
axios.interceptors.request.use(config => {
    if (sessionStorage.getItem('token')) {
        config.headers = { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    }
    return config
}, error => Promise.reject(error))


const app = createApp(App)
app.use(router)
    .use(createPinia().use(piniaPersist))
app.mount('#app')