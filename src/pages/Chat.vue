<template>
  <section class="w-25 mx-auto">
    <h1 class="text-center">Real Time Chat</h1>
    <div class="border rounded-lg">
      <div class="h-50 p-2">
        <div :class="chat.userid === state.userid ? 'text-right' : 'text-left'" v-for="chat in state.chats" :key="chat.message">
          {{chat.message}}
        </div>
      </div>
      <div class="p-2">
        <input class="p-1 border rounded-lg shadow w-100" 
          v-model="state.message" 
          placeholder="Start Typing"
          @keydown.enter="addMessage()"
        >
      </div>
    </div>
  </section>
</template>

<script>
import {onMounted, reactive} from 'vue';
import firebase, {chatsRef} from '../utilities/firebase';
import {useStore} from 'vuex';

export default {
  setup() {
    // reactive 和 ref 不同的是 ref对单一属性监听，reactive适用于对象所有属性监听
    const sotre = useStore();
    const state = reactive({
      chats: [],
      message: "",
      collection: null,
      userid: sotre.state.authUser.uid,
    })

    onMounted(async () => {
      // 监听子项事件
      chatsRef.on("child_added", (snapshot) => {
        state.userid = firebase.auth().currentUser.uid;
        state.chats.push({key: snapshot.key, ...snapshot.val()});
      })
    })

    const addMessage = () => {
      const newChat = chatsRef.push();
      newChat.set({
        userid: state.userid,
        message: state.message,
      });
      state.message = "";
    }

    return {
      state, 
      addMessage,
    }
  }
}
</script>

<style>

</style>