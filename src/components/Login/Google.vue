<template>
  <section class="text-center">
    <button class="btn btn-info" @click="loginGoogle()">Login With Google</button>
  </section>
</template>

<script>
import firebase from "../../utilities/firebase"

export default {
  methods: {
    loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(() => {
        this.$emit("close-login-from-google");
      }).catch((error) => {
        Error(error);
      });
    },
  }
}
</script>

<style>

</style>