<template>
  <div class="container">
    <div class="row my-4">
      <div class="col-lg-4 mx-auto"> 
        <h1 class="col-lg-12 text-center">dc heros {{herosCount}}</h1>

        <div v-show="false">
          <p>
            {{fullname}}
            <br>
            {{fname}} {{lname}}
          </p>
          <button @click="setfullname('test a')">setname</button>
        </div>

        <ul class="col-lg-12">
          <li class="d-flex justify-content-between" v-for="(hero, i) in heros" :key="i">
            <div>{{i}} : {{hero.name}}</div>
            <button type="button" class="close" aria-label="关闭" @click="delHero(i)">
              <span aria-hidden="true">&times;</span>
            </button>
          </li>
        </ul>
        <!-- v.model.trim -->
        <!-- v.model.lazy -->
        <!-- v.model.number -->
        <form class="d-flex justify-content-center" @submit.prevent="addHero(newHero)">
          <input ref="newHeroRef" v-model.trim="newHero.name"/>
          <button type="submit" :disabled="isDisabled">Add Hero</button>
        </form>  
      </div>       
    </div>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";

export default {
  // 使用组合式api
  setup() {
    let newHeroName = ref("");
    let newHero = ref({name:newHeroName});
    const newHeroRef = ref("");
    const isDisabled = ref(true);
    const heros = ref([
      {name: "SuperGirl"},
      {name: "Flash"},
      {name: "Batman"},
      {name: "Superman"},
      {name: "Arrow"} 
    ]);

    onMounted(() => {
      newHeroRef.value.focus();
    });

    const herosCount = computed({
      get: () => {return heros.value.length;},
    });
    // const watchinput = (nval) => {
    //   isDisabled.value = nval ? false : true;
    // };

    watch(newHeroName, (nval) => {
      isDisabled.value = nval ? false : true;
    });

    function addHero(hero) {
      if (!newHero.value.name.length || newHero.value.name === "") return;
      heros.value.push(hero);
      newHeroName = ref("");
      newHero = ref({name:newHeroName});
    }
    
    function delHero(id) {
      heros.value.splice(id,1)
      // heros.value = heros.value.filter((hero, i) => {i !== id});
    }

    return {
      newHero, 
      newHeroRef,
      isDisabled, 
      heros, 
      herosCount,
      addHero,
      delHero,
      fullname: ref(""), fname: ref("test"), lname: ref("b")
    }
  },
  // data() {
  //   return {
  //     newHero: {},
  //     isDisabled: true,
  //     heros: [
  //       {name: "SuperGirl"},
  //       {name: "Flash"},
  //       {name: "Batman"},
  //       {name: "Superman"},
  //       {name: "Arrow"}
  //     ],
  //     fname: "test",
  //     lname: "b"
  //   }
  // },
  // mounted() {
  //   this.$refs.newHeroRef.focus();
  // },
  // watch: {
    //这种deep深度检测属性多的对象时候消耗性能
    // newHero: {
    //   handler: (nval, oval) => {
    //    this.isDisabled = nval.name ? false : true;
    //   },
    //   deep: true,
    // }, 
    //建议使用字符串来表示对象的属性调用
    // "newHero.name"(val) { 
    //   this.isDisabled = val ? false : true;
    // }
  // },
  // computed: {
  //   fullname: {
  //     get() {
  //       return `full name: ${this.fname} ${this.lname}`;
  //     },
  //     set(fullname) {
  //       const val = fullname.split(" ");
  //       this.fname = val[0];
  //       this.lname = val[1];
  //     }
  //   }
  // },
  // methods: {
  //   addHero(hero) {
  //     if (!this.newHero.name || this.newHero.name === "") return;
  //     this.heros.push(hero);
  //     this.newHero = {};
  //   },
  //   delHero(index) {
  //     // this.heros.splice(i,1)
  //     this.heros = this.heros.filter((hero, i) => i !== index);
  //   },

  //   setfullname(val) {
  //     // computed fullname set方法
  //     this.fullname = val;
  //   }
  // }
}
</script>

<style scoped>
  ul {
    list-style: none;
  }
  li > p {
    display: block;
  }
  li > span {
    cursor: pointer;
  }
</style>
