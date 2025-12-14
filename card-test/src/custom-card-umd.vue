<template>
  <div class="custom-card">
    <h4>{{ title }}</h4>
    <p>监听事件：{{ count }}</p>
    <component v-if="cardComponent" :is="cardComponent" title="componet业务卡片组件" @card-event="handleCustomEvent"></component>
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef, onUnmounted } from 'vue'
import { cardCache } from './utils/cardCache.js'

const props = defineProps({
  title: {
    type: String,
    default: '默认标题'
  },
  link: {
    type: String,
    default: ''
  }
})

// if (!window.Vue) {
//   const module = await import('vue')
//   window.Vue = module
// }

let cardComponent = shallowRef(null)

const loadComponent = async (link) => {

  const cachedComponent = cardCache.getComponent(link)
  if (cachedComponent) {
    console.log('组件已缓存>>>>>', cachedComponent)
    return cachedComponent
  }

  const cachedUrl = cardCache.getUrl(link)
  if (cachedUrl) {
    console.log('链接正在加载中>>>>>', cachedUrl)
    return cachedUrl
  }

  const script = document.createElement('script')
  script.src = link
  document.head.appendChild(script)
  const promise = new Promise((resolve, reject) => {
    script.onload = () => {
      // console.log('script onload', window.ImCard.ImCard)
      const component = window.ImCard.ImCard
      resolve(component)
      cardCache.setComponent(link, component)
    }
    script.onerror = () => {
      reject(new Error(`Failed to load script ${link}`))
    }
  })
  cardCache.setUrl(link, promise)
  return promise
}

onMounted(async () => {
  cardComponent.value = await loadComponent(props.link)
  console.log(cardComponent.value)
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
