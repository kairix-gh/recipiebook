import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

import Emitter from "tiny-emitter"

const app = createApp(App)

app.config.globalProperties.$msalInstance = {};
app.config.globalProperties.$emitter = Emitter;

app.use(router).mount('#app')

