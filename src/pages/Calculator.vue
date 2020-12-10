<template>
  <div class="container">
    <h1 class="col-lg-12 my-3 text-center">Calculator</h1>
    <div class="col-lg-12 inp_disply">
      <h3 class="mx-auto text-right font-weight-bold" v-html="currentNum === '' ? '&nbsp' : currentNum"></h3>
      <p v-if="selectedOperation" class="mx-auto" style="width: 11rem;">{{prevNum}}{{selectedOperation}}{{currentNum}}</p>
      <p v-else v-html="'&nbsp'"></p>
    </div>
    <div class="col-lg-12 mt-3">
      <ul class="col-lg-12 btn_list mx-auto">
        <li><button @click="pressed('1')" class="btn btn-dark">1</button></li>
        <li><button @click="pressed('2')" class="btn btn-dark">2</button></li>
        <li><button @click="pressed('3')" class="btn btn-dark">3</button></li>
        <li><button @click="pressed('+')" class="btn btn-dark">+</button></li>
        <li><button @click="pressed('4')" class="btn btn-dark">4</button></li>
        <li><button @click="pressed('5')" class="btn btn-dark">5</button></li>
        <li><button @click="pressed('6')" class="btn btn-dark">6</button></li>
        <li><button @click="pressed('-')" class="btn btn-dark">-</button></li>
        <li><button @click="pressed('7')" class="btn btn-dark">7</button></li>
        <li><button @click="pressed('8')" class="btn btn-dark">8</button></li>
        <li><button @click="pressed('9')" class="btn btn-dark">9</button></li>
        <li><button @click="pressed('*')" class="btn btn-dark">*</button></li>
        <li><button @click="pressed('0')" class="btn btn-dark">0</button></li>
        <li><button @click="pressed('C')" class="btn btn-dark">C</button></li>
        <li><button @click="pressed('=')" class="btn btn-dark">=</button></li>
        <li><button @click="pressed('/')" class="btn btn-dark">/</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useWindowEvent from '../utilities/composition/useWindowEvent';

export default {
  setup() {
    const currentNum = ref("");
    const prevNum = ref("");
    const selectedOperation = ref("");
    const numbers = [1,2,3,4,5,6,7,8,9,0];
    const operations = {
      '+': (pn, cn) => {
        return +pn + +cn;
      },
      '-': (pn, cn) => {
        return +pn - +cn;
      },
      '*': (pn, cn) => {
        return pn * cn
      },
      '/': (pn, cn) => {
        return +pn / +cn;
      }
    };

    function pressed(str) {
      if (str === "=" || str == "Enter") {
        calculator();
      } else if (str === "C") {
        clean();
      } else if(operations[str]) {
        applyOperation(str);
      } else if(numbers.includes(+str)) {
        appendNumber(str);
      }
    }

    function appendNumber(str) {
      currentNum.value += str;
    }

    function applyOperation(str) {
      calculator();
      prevNum.value = currentNum.value;
      currentNum.value = "";
      selectedOperation.value = str;
    }

    function calculator() {
      const fn = operations[selectedOperation.value];
      if (fn) {
        currentNum.value = fn(prevNum.value, currentNum.value);
      }
    }

    function clean() {
      currentNum.value = "";
      prevNum.value = "";
      selectedOperation.value = "";
    }

    const handleKeydown = (e) => { pressed(e.key); }
    useWindowEvent("keydown", handleKeydown);

    return {
      currentNum, 
      pressed,
      prevNum,
      selectedOperation,
    };
  }
}
</script>

<style scoped>
  .inp_disply > h3{
    width: 11rem;
    height: 3rem;
    overflow: scroll;
    direction: rtl;
  }
  .btn_list {
    width: 14rem;
    height: 15rem;
    list-style:none;
  }
  .btn_list > li {
    width: 2.5rem;
    float: left;
    margin: 0.2rem;
  }
  .btn_list > li > button {
    width: 100%;
  }
</style>