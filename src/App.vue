<script setup>
import HelloWorld from './components/HelloWorld.vue';
import * as LiveUpdates from "@capacitor/live-updates";
import {onMounted, reactive} from "vue";
import {App} from "@capacitor/app";
import {StatusBar} from "@capacitor/status-bar";

const state = reactive({
  result: null
})

const initializeApp = async () => {
  // Register event to fire each time user resumes the app
  App.addListener('resume', async () => {
    StatusBar.setOverlaysWebView({ overlay: true });

    if (localStorage.shouldReloadApp === 'true') {
      await LiveUpdates.reload();
    }
    else {
      state.result = await LiveUpdates.sync();
    }
  });

  // First sync on app load
  state.result = await LiveUpdates.sync();
}

onMounted(() => {
  initializeApp();
})

</script>

<template>
  <div>
    <div class="">
      更新检查结果为：{{state.result}}
    </div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
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
