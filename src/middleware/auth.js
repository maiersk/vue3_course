export default function(next, store) {
    if (!store.state.isLoggedIn) {
        next("/");  //跳转到其他路由地址
        store.commit("setLoginModal", true);
    } else {
        next();
    }
}