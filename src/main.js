import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './styles/main.scss'

createApp(App).use(router).use(store).mount('#app')
