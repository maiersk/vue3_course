<template>
  <div class="login_div">
    <section class="vw-100 h-100 d-flex fixed-top" style="background-color: rgba(0,0,0,0.3);z-index:20;"
      @click="$emit('close-login')">
    </section>
    <div class="vw-100 h-100">
      <div class="w-25 fixed-top mx-auto my-5 bg-light border rounded" style="z-index:30;">
        <div class="border border-secondary m-1">
          <h1 class="text-center">Login</h1>

          <GoogleLogin @close-login-from-google="close()"/>

          <form class="mx-3 my-3" action="">
            <div class="form-group">
              <label for="">Email or Username</label>
              <input type="email" class="form-control" ref="emailRef" v-model="form.email" placeholder="Enter your email or username">
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="password" class="form-control" v-model="form.password" placeholder="enter your password">
            </div>       
            <div class="form-group d-flex justify-content-center">
              <button type="submit" class="btn btn-secondary" @click.prevent="submit(form)">
                <div v-if="!isLoading">
                  <span class="text-center">Login</span>
                </div>
                <div v-else>
                  <span class="text-center">Logining ... </span>
                </div>
              </button>
            </div>   
          </form>
        </div>
      </div>   
    </div>    
  </div>
</template>

<script>
import firebase from "../utilities/firebase"
import GoogleLogin from "./Login/Google"

export default {
  components: {
    GoogleLogin,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      isLoading: false,
    }
  },
  mounted() {
    this.$refs.emailRef.focus();
  },
  methods: {
    submit(form) {
      this.isLoading = true;
      firebase.auth().signInWithEmailAndPassword(form.email, form.password).then(() => {
        this.form = {};
        this.isLoading = false;
        this.close();
      }).catch((err) => {
        this.isLoading = false;
        Error(err);
      })
    },
    close() {
      this.$emit("close-login")
    }
  }
}
</script>

<style>

</style>