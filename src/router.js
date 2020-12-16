import {createRouter, createWebHistory} from "vue-router";
import Home from "./pages/Home";
import HerosList from "./pages/HerosList";
import Calendar from "./pages/Calendar";
import Markdown from "./pages/Markdown";
import Slider from "./pages/Slider";
import Calculator from "./pages/Calculator";
import ReuseableModal from "./pages/ReuseableModal";
import Chat from "./pages/Chat";
import store from "./store/index";

const routes = [
    {path: '/', component: Home},
    {path: '/heros_list', component: HerosList},
    {path: '/calendar', component: Calendar},
    {path: '/markdown', component: Markdown},
    {path: '/slider', component: Slider},
    {path: '/calculator', component: Calculator},
    {path: '/modal', component: ReuseableModal},
    // vue中间件写法，beforEnter方法，在路由打开前执行
    {path: '/chat', component: Chat,
      meta: {middleware:'auth'},
      beforeEnter: (_, __, next) => {
        if (!store.state.isLoggedIn) {
          next("/");  //跳转到其他路由地址
        } else {
          next();
        }
    }},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由器beforeEach方法
router.beforeEach((to) => {
  if (to.meta.middleware) {
    console.log(to.meta);    
  }
})

export default router