<template>
  <div class="custom-card">
    <h4>{{ title }}</h4>
    <p>监听事件：{{ count }}</p>
    <component v-if="cardName" :is="cardName" title="componet业务卡片组件" @card-event="handleCustomEvent"></component>
    <ImCard title="ESM业务卡片组件" @card-event="handleCustomEvent"></ImCard>
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef, defineAsyncComponent } from 'vue'

defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
})

// if (!window.Vue) {
//   const module = await import('vue')
//   window.Vue = module
// }

let cardName = shallowRef(null)

const ImCard = defineAsyncComponent(() => import('http://127.0.0.1:5500/dist/im-card.es.js'))
// console.log(cardName.value)

onMounted(async () => {
  const module  = await import('http://127.0.0.1:5500/dist/im-card.es.js')
  console.log(module)
  const comp = defineAsyncComponent(() => Promise.resolve(module.default))
  cardName.value = comp
  console.log(comp)
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
