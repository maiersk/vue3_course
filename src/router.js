import {createRouter, createWebHistory} from "vue-router"
import Home from "./pages/Home"
import HerosList from "./pages/HerosList"
import Calendar from "./pages/Calendar"
import Markdown from "./pages/Markdown"
import Slider from "./pages/Slider"

const routes = [
    {path: '/', component: Home},
    {path: '/heros_list', component: HerosList},
    {path: '/calendar', component: Calendar},
    {path: '/markdown', component: Markdown},
    {path: '/slider', component: Slider},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router