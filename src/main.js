import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { router } from './router';
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'


const app = createApp(App)
app.use(router)
    .use(createPinia().use(piniaPersist))
app.mount('#app')