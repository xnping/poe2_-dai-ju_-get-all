import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'
// 导入主题样式
import './assets/theme.css'

// 初始化主题
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
};

const app = createApp(App)
app.use(Antd)

// 在挂载应用之前初始化主题
initTheme();
app.mount('#app')