import {createRouter, createWebHistory} from "vue-router";
import Home from "./pages/Home";
import HerosList from "./pages/HerosList";
import Calendar from "./pages/Calendar";
import Markdown from "./pages/Markdown";
import Slider from "./pages/Slider";
import Calculator from "./pages/Calculator";
import ReuseableModal from "./pages/ReuseableModal";
import Chat from "./pages/Chat";
import UserCrud from "./pages/UserCrud";
import store from "./store/index";
import Tensorflow from "./pages/Tensorflow";

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
  },
  {path: '/usercrud', component: UserCrud},
  {path: '/tensorflow', component: Tensorflow},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由器beforeEach方法
router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    // console.log(to.meta);    
    const middleware = require(`./middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(next, store);
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router