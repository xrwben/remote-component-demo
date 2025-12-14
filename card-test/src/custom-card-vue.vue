<template>
  <div class="custom-card">
    <h4>{{ title }}</h4>
    <p>监听事件：{{ count }}</p>
    <component v-if="cardName" :is="cardName" title="componet业务卡片组件" @card-event="handleCustomEvent"></component>
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef, defineAsyncComponent } from 'vue'
import { loadModule } from 'vue3-sfc-loader'


defineProps({
  title: {
    type: String,
    default: ''
  }
})


let cardName = shallowRef(null)

// loadModule 配置项
const options = {
  moduleCache: { //  缓存模块
    vue: Vue
  },
  // 获取文件内容的方法，接收一个 URL，返回该 URL 的文本内容
  async getFile(url) {
    const response = await fetch(url)
    if (response.status === 200) {
      return response.text()
    } else {
      throw new Error(response.statusText)
    }
  },
  // 将组件中提取的样式插入到页面 head 中
  addStyle (textContent) {
    const s = document.createElement('style')
    s.id = 'im-card-style'
    const style = Object.assign(s, { textContent })
    // console.log(style, document.createElement("style"), textContent)
    document.head.appendChild(style)
  }
}

// 如果这种方案，那可操作的空间就很大了，可以添加到shadom dom中
const loadVueComponent = (url) => {
  console.log(loadModule(url, options))
  return loadModule(url, options)
}


onMounted(async () => {
  const comp = await loadVueComponent('http://127.0.0.1:5500/im-card.vue')
  console.log(comp)
  cardName.value = comp
})


let count = ref(0)

const handleCustomEvent = (e) => {
  count.value++
}


</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.custom-card {
  border: 4px solid green;
}
h4 {
  line-height: 1;
}
</style>
