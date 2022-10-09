import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from './stores'
import './styles/index.scss'

const app = createApp(App)
app.use(router)
setupStore(app)
app.mount('#app')
