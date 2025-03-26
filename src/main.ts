import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'Ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(Antd)
app.mount('#app')

