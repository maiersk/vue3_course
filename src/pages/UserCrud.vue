<template>
  <section class="d-flex flex-column">
    <div class="mx-auto">
      <button class="px-2 py-1 btn btn-light my-4" @click="isModalOpen = true">Add User</button>
      <table>
        <thead>
          <tr>
            <th class="px-3 py-2 border">Avatar</th>
            <th class="px-3 py-2 border">Name</th>
            <th class="px-3 py-2 border">Email</th>
            <th class="px-3 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, i) in state.users" :key="i">
            <td class="border px-4 py-2">
              <img :src="user.avatar" alt="" width="60" height="60" class="rounded-circle">
            </td>
            <td class="border px-4 py-2">{{user.name}}</td>
            <td class="border px-4 py-2">{{user.email}}</td>
            <td class="border px-4 py-2">
              <button class="btn btn-warning" @click="del_user(i)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex mt-2 justify-content-between">
        <button class="btn px-3 py-2" 
          @click="prev()" 
          :disabled="state.users.page === 1"
          :class="state.users.page === 1 ? 'bg-secondary': 'bg-light'"
        > 
          Prev 
        </button>
        <button class="btn px-3 py-2"
          @click="next()"
          :disabled="state.users.page === state.users.total_pages"
          :class="state.users.page === state.users.total_pages ? 'bg-secondary': 'bg-light'"
        > 
          Next
        </button>
      </div>      
    </div>
  </section>
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
import { onMounted, reactive, ref } from 'vue';
import axios from '../plugins/axios';
import Modal from '../components/Modal';

export default {
  components: {
    Modal,
  },
  setup() {
    const isModalOpen = ref(false);
    const state = reactive({
      users: [],
      form: {
        name: "",
        email: "",
        avatar: "",
      }
    })

    onMounted(async () => {
      const {data} = await axios.get(`/users`);
      state.users = data;
    })

    async function next() {
      const {data} = await axios.get(`/users?page=${state.users.page+1}`);
      state.users = data;
    }

    async function prev() {
      const {data} = await axios.get(`/users?page=${state.users.page-1}`);
      state.users = data;
    }
    
    async function submit() {
      const {data} = await axios.post(`/users`, state.form);
      state.users.push(data);
      state.form = {
        name: "",
        email: "",
        avatar: "",
      }
      isModalOpen.value = false;
      console.log(data);
    }

    async function del_user(i) {
      await axios.delete(`/users/${state.users[i]._id}`);
      state.users.splice(i,1)
      // state.users = users.filter((user) => {user._id !== id});
    }

    return {
      state,
      next,
      prev,
      isModalOpen,
      submit,
      del_user,
    };
  }
}
</script>

<style>

</style>