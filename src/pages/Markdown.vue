<template>
  <div class="container">
    <div class="row my-4">
      <h1 class="col-lg-12 text-center">Markdown</h1>
      <section class="col-lg-12 d-flex justify-content-between vh-100">
        <article class="w-100 border">
          <textarea 
            class="h-100 w-100"
            :value="text"
            @input="updateText"
          >
          </textarea>
        </article>
        <article class="w-100 border text-bark bg-light" v-html="markedText()">
        </article>      
      </section>    
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import debounce from '../utilities/mixins/debounce'

export default {
    // beforeCreate() {
  //   console.log('before create')
  // },
  // created() {
  //   console.log('created')
  // },
  // beforeMount() {
  //   console.log('beforeMount')
  // },
  // mounted() {
  //   console.log('mounted')
  // },
  // beforeUpdate() {
  //   console.log('beforeUpdate')
  // },
  // updated() {
  //   console.log('updated')
  // },
  // beforeUnmount() {
  //   console.log('beforeUnmount')
  // },
  // unmounted() {
  //   console.log('unmounted')
  // },
  mixins: [debounce],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    markedText() {
      return marked(this.text)
    },
    updateText(e) {
      const task = () => {this.text = e.target.value}
      // 使用mixins的方法和数据都是和导入方对象组合
      // 导入方和mixins方法同名则用导入方的方法，date定义的内容也一样
      this.debounce(task, 500)
    },

  },
}
</script>

<style scoped>

</style>