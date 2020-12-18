<template>
  <section class="d-flex flex-column">
    <div class="mx-auto">
      <div class="mt-5">
        <h1 class="text-center">Tensorflow object Detection</h1>
        <div class="d-flex flex-column">
          <div class="mx-auto">
            <button v-if="!isStreaming" class="btn btn-light" @click="openCamera()">Open Camera</button>
            <button v-else class="btn btn-light" @click="stopStreaming()">Stop Camera</button>
            <button v-if="isStreaming" class="btn btn-light" @click="snapshot()">snapshot</button>
          </div>
          <video class="mx-auto" ref="videoRef" width="100" autoplay></video>

          <img
            class="mx-auto mt-2"
            ref="imgRef"
            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3707907997,1539315740&fm=26&gp=0.jpg"
            width="200"
            crossorigin="anonymous"
          />
          <div class="mt-4 w-100 text-center">
            <button class="btn btn-light" @click="detect()">
              <span v-if="isLoading">Loading ...</span>
              <span v-else>Detect Object</span>
            </button>
            <div v-if="result.length > 0">
              <p>{{result[0].class}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import("@tensorflow/tfjs-backend-cpu");
import("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");

export default {
  setup() {
    const imgRef = ref("");
    const videoRef = ref("");
    const result = ref([]);
    const isStreaming = ref(false);
    const isLoading = ref(false);

    async function detect() {
      const img = imgRef.value;
      isLoading.value = true;
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      result.value = predictions;
      // console.log({imgRef, result});
      isLoading.value = false;
    }

    async function openCamera() {
      if (navigator.mediaDevices.getUserMedia) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter((device) => device.kind === "videoinput");
        const camId = cams[0].deviceId;
        const video = cams.length === 1 ? true : { deviceId: { exact: camId } };
        navigator.mediaDevices.getUserMedia({ video: video }).then((stream) => {
          isStreaming.value = true;
          videoRef.value.srcObject = stream;
        });
      }
    }

    function stopStreaming() {
      const stream = videoRef.value.scrObject;
      const tracks = stream.getTracks();
      tracks.map((track) => {
        track.stop();
      });
      isStreaming.value = false;
    }

    function snapshot() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.value, 0, 0, 200, 200);
      const data = canvas.toDataURL("image/png");
      imgRef.value.setAttribute("src", data);
    }

    return {
      imgRef,
      result,
      detect,
      isLoading,
      isStreaming,
      openCamera,
      videoRef,
      stopStreaming,
      snapshot,
    };
  },
};
</script>

<style>
</style>