<template>
  <div class="custom-card">
    <h4>{{ title }}</h4>
    <p>动态加载卡片：{{ count }}</p>
    <component :is="cardName" title="业务卡片组件" @card-event="handleCustomEvent" @popup-event="popupEvent">
      <p>我是slot插槽</p>
    </component>
    <!-- <im-card-element title="动态加载"></im-card-element> -->
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef, defineComponent, markRaw, h } from 'vue'
import { loadRemoteScript } from './utils/resourceLoader'

// 接收主应用传递的参数
const props = defineProps({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  link: { type: String, default: '' }
})


const loaded = ref(false)
const cardName = shallowRef(null)


const loadComponent = async (url) => {

  if (!window.Vue) {
    const module = await import('vue')
    window.Vue = module
  }

  const script = document.createElement('script')
  script.src = url
  script.onload = () => {
    if (!customElements.get('im-card-element')) {
      console.error('自定义元素未注册')
      return
    }
    loaded.value = true
    console.log(window.ImCardElement)
    cardName.value = defineComponent({
      render() {
        return h('im-card-element', )
      }
    })
  }
  document.head.appendChild(script)
}

let count = ref(0)

const handleCustomEvent = (e) => {
  console.log(e.detail)
  count.value++
}

const popupEvent = (e) => {
  console.log(e.detail)
}


onMounted(() => {
  // loadComponent('http://127.0.0.1:5500/dist/im-card.umd.js')
  // if (customElements.get('im-card-element')) {
  //   console.log(customElements)
  //   cardName.value = defineComponent({
  //     render () {
  //       return h('im-card-element')
  //     } 
  //   })
  //   return
  // }
  // loadComponent(props.link)
  loadRemoteScript(props.link).then((res) => {
    cardName.value = res.component
  })
})

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
