<template>
  <div class="re_useablemodal">
    <section
      class="vh-100 vw-100 fixed-top" style="background-color: rgba(0,0,0,0.3);z-index:20;"
      @click="close()"
    ></section>
    <div class="vw-100 h-100">
      <div class="w-25 fixed-top mx-auto my-5 bg-light border rounded" style="z-index:30;">
        <div class="border border-secondary m-1 p-1">
          <h1 class="text-center">
            <slot name="title">Title</slot>
          </h1>
          <main>
            <slot name="body">input something</slot>
          </main>
        </div>
      </div>   
    </div>    
  </div>
</template>

<script>
export default {
  setup(_, {emit}) {
    function close() {
      emit("close");
    }

    return {
      close,
    }
  },
}
</script>

<style>

</style>