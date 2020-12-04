<template>
  <div class="container-fluid">
    <dic class="row">
      <AppHeader title="Learn Vue" :NavItems="navItems" @open-login-modal="isLoginOpen = true"/>

      <div class="vw-100">
        <router-view></router-view>        
      </div>

      <div class="vw-100" v-if="isLoginOpen">
        <LoginModal @close-login="isLoginOpen = false"/>
      </div>
    </dic>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader"
import LoginModal from './components/LoginModal.vue'

export default {
  emits: {
    'open-login-modal': payload => {
      return payload
    },
    'close-login': payload => {
      return payload
    }
  },
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
    }
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