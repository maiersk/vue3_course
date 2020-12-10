<template>
  <div class="w-100 d-flex flex-wrap">
    <div class="mx-auto justify-content-center">
      <h1 class="my-2 text-center">Re-useable Modal</h1>

      <teleport to="#app">
        <Modal v-if="isModal1Open" @close="isModal1Open = false">
          <template #title>
            Test
          </template>
          <template #body>
            <p>Body</p>
            <section>abcd</section>
          </template>
        </Modal>
      </teleport>
      <button class="btn btn-info mx-5" @click="isModal1Open = true">Modal 1</button>
      <teleport to="#app">
        <Modal v-if="isModal2Open" @close="isModal2Open = false">
          <template v-slot:title>
            Test2
          </template>
        </Modal>
      </teleport>
      <button class="btn btn-info mx-5" @click="isModal2Open = true">Modal 2</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Modal from "../components/Modal";

export default {
  components: { Modal },
  setup() {
    const isModal1Open = ref(false);
    const isModal2Open = ref(false);

    return {
      isModal1Open,
      isModal2Open,
    }
  },
}
</script>

<style scoped>

</style>