<template>
  <div class="col-lg-12 Top-Bar vw-100">
    <div class="row">
      <div class="col-xl-2 col-lg-2 d-flex justify-content-center align-items-center">
        <img class="nav_logo mr-3" src="../assets/logo.png" alt="">
        <a class="text-center header_title">{{ title.toUpperCase() }}</a>
      </div>
      <ul class="col-xl-6 col-lg-6 nav my-2 mx-auto mr-auto">
        <li class="mr-2 nav-item pt-0" v-for="(nav, i) in NavItems" :key="i">
          <router-link class="nav-link" :to="nav.href">{{nav.name}}</router-link>
        </li>
      </ul>
      <div class="col-xl-2 col-lg-2 login_func my-auto d-flex justify-content-center">
        <button class="col-xl-4 col-lg-4 btn bg-transparent text-white"
          @click="isLoggedIn ? logout() : $emit('open-login-modal')"
        >
          {{isLoggedIn ? 'Logout' : 'Login'}}
        </button>
        <button class="col-xl-4 col-lg-4 btn bg-transparent text-white">Register</button>        
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../utilities/firebase";

export default {
  name: "TopBar",
  props: {
    title: String,
    NavItems: Array
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
  .header_title {
    height: 48px;
    text-decoration: none;
    font-size: 40px;
    line-height: 43px;
    color: white;
  }
  .Top-Bar {
    background-color: rgb(216, 102, 87);
    color: white;
  }  
  .Top-Bar .nav_logo {
    width: 32px;
    height: 32px;
  } 
  /* .Top-Bar ul {
    padding: 0;
  } */
  .Top-Bar ul li {
    float: left;
    padding: 10px 0 0 0;
  }
  .Top-Bar ul li a {
    color: white;
  }
  .Top-Bar ul li a:hover {
    color: black;
  }
</style>
