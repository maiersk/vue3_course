<template>
  <div class="col-lg-12 p-0" style="height:350px;">
    <div class="col-lg-12 p-0 position-absolute" v-for="(slider, i) in sliders" :key="i">
      <transition name="fade">
      <div
        v-if="currentSlide == i"
        :class="slider.color"
        style="height:350px;"
        >
      </div>      
      </transition>
    </div>
    <div class="col-lg-12 position-absolute fixed-bottom d-flex p-0 my-3 justify-content-center">
      <div 
        class="border mr-2 rounded-circle Slider-btn" 
        style="width:16px; height:16px;"
        v-for="(slider, i) in sliders" :key="i"
        :class="{'Slider-btn-active' : currentSlide == i}"
        @click="sliderbtn(i)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      sliders: [
        {color:'bg-info'},
        {color:'bg-warning'},
        {color:'bg-dark'}
      ],
      interval: "",
      isTitleShowing: true,
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.currentSlide = this.currentSlide === 2 ? 0 : this.currentSlide + 1
    }, 2000);
  },
  methods: {
    sliderbtn(slider_id) {
      this.currentSlide = slider_id
      clearInterval(this.interval)
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s ease;
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateX(-100%);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  .Slider-btn {
    background-color: black;
    cursor: pointer;
  }
  .Slider-btn-active {
    background-color: white;
  }
</style>