<script setup>
import HelloWorld from './components/HelloWorld.vue';
import * as LiveUpdates from "@capacitor/live-updates";
import {onMounted, reactive} from "vue";
import {App} from "@capacitor/app";
import {StatusBar} from "@capacitor/status-bar";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {AssetManager} from "@capawesome/capacitor-asset-manager";
import {EdgeToEdge} from "@capawesome/capacitor-android-edge-to-edge-support";
import JSZip from 'jszip';

const state = reactive({
  result: null
})

onMounted(() => {
  Filesystem.appendFile({
    path: '/app-update-cache',
    directory: Directory.Cache
  });
  StatusBar.setOverlaysWebView({overlay: true});
  AssetManager.read({encoding: 'utf8', path: 'public'}).then(result => {

  });
  AssetManager.list({path: 'public'}).then(result => {
    console.log('AssetManager.list');
    console.log(result);
  })

  AssetManager.copy({

  })
});

const onCheckUpdate = () => {
  StatusBar.setOverlaysWebView({overlay: true});
  LiveUpdates.sync().then(result => {
    state.result = result;
  }).catch(error => {
    state.result = error;
  });
}

const onCheckUpdate1 = () => {
  EdgeToEdge.disable();
}

const onCheckUpdate2 = () => {
  EdgeToEdge.enable();
}

const onCheckUpdate3 = () => {
  state.result = null;
  EdgeToEdge.getInsets().then(result => {
    state.result = result;
  })
}

const onZipFileChange = async (event) => {
    const file = event.target.files[0];
    const zip = await readAndUnzip(file);
  console.log(zip);
}

function readAndUnzip(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const zip = await JSZip.loadAsync(event.target.result);
        resolve(zip);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

</script>

<template>
  <div>
    <div class="" style="margin-top: 10px; color: #000000">
      <div class="" style="height: 100px"></div>
      <button @click="onCheckUpdate">点击检查更新</button>
      <button @click="onCheckUpdate1">点击隐藏底部小黑条</button>
      <button @click="onCheckUpdate2">点击隐藏底部小黑条2</button>
      <button @click="onCheckUpdate3">点击隐藏底部小黑条3</button>
      <input type="file" accept="application/zip" @change="onZipFileChange">
      <div>结果：{{state.result}}</div>
      <div class="">实时更新测试3</div>
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
