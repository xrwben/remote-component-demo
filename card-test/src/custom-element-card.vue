<template>
  <div class="custom-element-card">
    <h4>{{ title }}</h4>
    <component :is="cardName"></component>
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


const loadComponent = async (url) => {

  if (!window.Vue) {
    const module = await import('vue')
    window.Vue = module
  }

  const script = document.createElement('script')
  script.src = url
  script.onload = () => {
    if (!customElements.get('card-sku')) {
      console.error('自定义元素未注册')
      return
    }
    // console.log(window.ImCardElement)
    cardName.value = defineComponent({
      render() {
        return h('card-sku')
      }
    })
  }
  document.head.appendChild(script)
}


onMounted(() => {
  loadComponent('http://127.0.0.1:5500/lib/card-sku/CardSku_1.0.0_h5.js')
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
})

</script>

<style>
/* .custom-element-card {
  background: greenyellow;
} */
h4 {
  font-size: 30px;
  line-height: 1;
}
</style>
