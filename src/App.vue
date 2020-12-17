<template>
  <div class="container-fluid">
    <dic class="row">
      <AppHeader title="Learn Vue" :NavItems="navItems" />

      <div class="vw-100">
        <router-view></router-view>        
      </div>

      <!-- 瞬移标签 到指定元素内 -->
      <teleport to="#app" class="vw-100" >
        <LoginModal/>
      </teleport>
    </dic>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader"
import LoginModal from './components/LoginModal.vue'
import firebase from "./utilities/firebase"

export default {
  components: {
    AppHeader,
    LoginModal,
  },
  data() {
    return {
      navItems: [
        {name: "home", href: "/"},
        {name: "HerosList", href: "/heros_list"},
        {name: "Calendar", href: "/calendar"},
        {name: "Markdown", href: "/markdown"},
        {name: "Slider", href: "/slider"},
        {name: "Calculator", href: "/calculator"},
        {name: "Modal", href: "/modal"},
        {name: "Chat", href: "/chat"},
        {name: "User Crud", href: "/usercrud"},
      ],
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.$store.commit("setIsLoggedIn", true);
        this.$store.dispatch("setAuthUser", user);
      } else {
        this.$store.commit("setIsLoggedIn", false);
        this.$store.dispatch("setAuthUser", {});
      }
    })
  },
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>