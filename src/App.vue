<script setup>
import HelloWorld from './components/HelloWorld.vue';
import * as LiveUpdates from "@capacitor/live-updates";
import {onMounted, reactive} from "vue";
import {App} from "@capacitor/app";
import {StatusBar} from "@capacitor/status-bar";

const state = reactive({
  result: null
})

onMounted(() => {

});

const onCheckUpdate = () => {
  LiveUpdates.sync().then(result => {
    state.result = result;
  }).catch(error => {
    state.result = error;
  });
}

</script>

<template>
  <div>
    <div class="" style="margin-top: 100px">
      <button @click="onCheckUpdate">点击检查更新</button>
      <div>结果：{{state.result}}</div>
      <div class="">实时更新测试1</div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
