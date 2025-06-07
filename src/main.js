import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入vconsole移动端调试工具
import VConsole from 'vconsole'
import eruda from 'eruda'

const vConsole = new VConsole()
eruda.init()

createApp(App).mount('#app')
