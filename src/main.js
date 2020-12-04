import { createApp } from 'vue'
import router from './router'

import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

import App from './App.vue'

createApp(App).use(router).use(bootstrap).mount('#app')
