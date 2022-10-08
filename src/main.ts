import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import { setupStore } from './stores'

const app = createApp(App)
app.use(router)
setupStore(app)
app.mount('#app')
