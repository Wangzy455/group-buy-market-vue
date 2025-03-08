import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'

// 配置axios
axios.defaults.baseURL = process.env.VUE_APP_API_URL || "http://localhost:3000/api"
axios.defaults.headers.common['Content-Type'] = 'application/json'

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.status === 401) {
      // 未授权，清除token并重定向到登录页
      localStorage.removeItem('token')
      localStorage.setItem('isLoggedIn', 'false')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)

// 全局挂载axios
app.config.globalProperties.$axios = axios

app.mount('#app')