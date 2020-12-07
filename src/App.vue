<template>
  <div class="container-fluid">
    <dic class="row">
      <AppHeader title="Learn Vue" :NavItems="navItems" :isLoggedIn="isLoggedIn" @open-login-modal="isLoginOpen = true"/>

      <div class="vw-100">
        <router-view></router-view>        
      </div>

      <!-- 瞬移标签 到指定元素内 -->
      <teleport to="#app" class="vw-100" v-if="isLoginOpen">
        <LoginModal @close-login="isLoginOpen = false"/>
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
      ],
      isLoginOpen: false, 
      isLoggedIn: false,
      authUser: {},
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.isLoggedIn = true;
        this.authUser = user;
      } else {
        this.isLoggedIn = false;
        this.authUser = {};
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