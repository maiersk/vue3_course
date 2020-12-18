<template>
  <section class="d-flex flex-column">
    <div class="mx-auto">
      <Create @new-user-added="addUser()"/>
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
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from '../plugins/axios';
import Create from '../components/UserCrud/Create';

export default {
  components: {
    Create,
  },
  setup() {
    const state = reactive({
      users: [],
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

    function addUser(data) {
      state.users.push(data);
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
      addUser,
      del_user,
    };
  }
}
</script>

<style>

</style>