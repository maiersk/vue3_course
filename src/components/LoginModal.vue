<template>
  <section class="vw-100 h-100 d-flex fixed-top" style="background-color: rgba(0,0,0,0.3);z-index:20;"
    @click="$emit('close-login')">
  </section>
  <div class="vw-100 h-100">
    <div class="w-25 fixed-top mx-auto my-5 bg-light border rounded" style="z-index:30;">
      <div class="border border-secondary m-1">
        <h1 class="text-center">Login</h1>
        
        <form class="mx-3 my-3" action="">
          <div class="form-group">
            <label for="">Email or Username</label>
            <input type="email" class="form-control" :value="form.email" placeholder="Enter your email or username">
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control" :value="form.password" placeholder="enter your password">
          </div>       
          <div class="form-group d-flex justify-content-center">
            <button type="submit" class="btn btn-secondary" @click.prevent="submit()">Login</button>
          </div>   
        </form>
      </div>
    </div>   
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    submit() {
      console.log(this.form)
    }
  }
}
</script>

<style>

</style>