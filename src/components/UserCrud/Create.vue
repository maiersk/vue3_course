<template>
  <button class="px-2 py-1 btn btn-light my-4" @click="isModalOpen = true">Add User</button>
  <teleport to="body">
    <Modal v-if="isModalOpen" @close="isModalOpen = false">
    <template #title>
      Add new User
    </template>
    <template #body>
      <form @submit.prevent="submit()">
      <div class="p-2">
        <label>Name</label>
        <input class="w-100 p-2 rounded-lg border"
        placeholder="User Name"
        v-model="state.form.name"
        >
      </div>
      <div class="p-2">
        <label>Email</label>
        <input class="w-100 p-2 rounded-lg border" 
        placeholder="User Email" type="email"
        v-model="state.form.email"
        >
      </div>
      <div class="p-2">
        <label>Avatar</label>
        <input class="w-100 p-2 rounded-lg border" 
        placeholder="Avatar Url"
        v-model="state.form.avatar"
        >
      </div>
      <div class="p-2">
        <input type="submit" value="Create" class="w-100 p-2 border btn btn-light">
      </div>
      </form>
    </template>
    </Modal>
  </teleport>
</template>

<script>
import Modal from "../Modal";
import axios from "../../plugins/axios";
import { reactive, ref } from 'vue';

export default {
  components: {
    Modal,
  },
  setup(_, {emit}) {
    const isModalOpen = ref(false);
    const state = reactive({
      users: [],
      form: {
        name: "",
        email: "",
        avatar: "",
      }
    })

    async function submit() {
      const {data} = await axios.post(`/users`, state.form);
      // state.users.push(data);
      emit("new-user-added", data);
      state.form = {
        name: "",
        email: "",
        avatar: "",
      }
      isModalOpen.value = false;
      console.log(data);
    }

    return {
      state,
      isModalOpen,
      submit,
    }
  }
}
</script>

<style>

</style>