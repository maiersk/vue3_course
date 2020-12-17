<template>
  <section class="d-flex flex-column">
    <div class="mx-auto">
      <table class="mt-5">
        <thead>
          <tr>
            <th class="px-3 py-2 border">ID</th>
            <th class="px-3 py-2 border">Avatar</th>
            <th class="px-3 py-2 border">First Name</th>
            <th class="px-3 py-2 border">Last Name</th>
            <th class="px-3 py-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in state.users.data" :key="user.id">
            <td class="border px-4 py-2">{{user.id}}</td>
            <td class="border px-4 py-2">
              <img :src="user.avatar" alt="" width="60" height="60" class="rounded-circle">
            </td>
            <td class="border px-4 py-2">{{user.first_name}}</td>
            <td class="border px-4 py-2">{{user.last_name}}</td>
            <td class="border px-4 py-2">{{user.email}}</td>
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
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
// 配置默认api_url路径，使用的时候不需添加
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default {
  setup() {
    const state = reactive({
      users: {},
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
    
    return {
      state,
      next,
      prev,
    };
  }
}
</script>

<style>

</style>