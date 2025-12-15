<template>
  <div class="custom-element-card">
    <h4>createApp{{ title }}</h4>
    <p>监听事件：{{ count }}</p>
    <!-- <component v-if="cardName" :is="cardName" title="componet业务卡片组件" @card-event="handleCustomEvent"></component> -->
    <div class="remote-node" ref="remoteNodeRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef, defineComponent, markRaw, h } from 'vue'

// 接收主应用传递的参数
const props = defineProps({
  title: { type: String, default: '远程组件卡片' },
  content: { type: String, default: '' },
  link: { type: String, default: '' }
})

const cardName = shallowRef(null)
const remoteNodeRef = ref(null)

let count = ref(0)

const handleCustomEvent = (e) => {
  console.log('子应用触发事件', e)
  count.value++
}


const loadComponent = async (url) => {

  if (!window.Vue) {
    const module = await import('vue')
    window.Vue = module
  }

  const script = document.createElement('script')
  script.src = url
  script.onload = () => {
    console.log(window.ImCard.ImCard)
    cardName.value = window.ImCard.ImCard
    window.ImCard.mountApp(remoteNodeRef.value, {
      ...props,
      // 事件监听
      onCardEvent: handleCustomEvent,
    })
  }
  document.head.appendChild(script)
}


onMounted(() => {
  loadComponent('http://127.0.0.1:5500/vite-lib/dist/im-card.umd.js')
})

</script>

<style>
h4 {
  font-size: 30px;
  line-height: 1;
}
</style>
