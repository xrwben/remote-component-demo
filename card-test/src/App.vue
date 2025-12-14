<template>
  <!-- <custom-card
    v-for="item in list"
    :key="item.title" 
    :title="item.title" 
    :content="item.content" 
    :link="item.link">
  </custom-card> -->
  <!-- <custom-card-es title="ESM加载卡片"></custom-card-es> -->
  <!-- <custom-card-umd
    v-for="item in list"
    :key="item.title" 
    :title="item.title" 
    :content="item.content" 
    :link="item.link">
  </custom-card-umd> -->
  <!-- <custom-card-vue
    v-for="item in list"
    :key="item.title" 
    :title="item.title" 
    :content="item.content" 
    :link="item.link">
  </custom-card-vue> -->
  <custom-element-card></custom-element-card>
  <!-- <button @click="handleClick">点击加载卡片</button> -->
</template>

<script setup>
import { ref } from 'vue'
// import CustomCard from './custom-card.vue'
// import CustomCardEs from './custom-card-es.vue'
// import CustomCardUmd from './custom-card-umd.vue'
// import CustomCardVue from './custom-card-vue.vue'
import CustomElementCard from './custom-element-card.vue' 

const list = ref([
  {
    title: '自定义卡片1',
    content: '这是自定义卡片1的内容',
    link: 'http://127.0.0.1:5500/dist/custom-im-card.umd.js'
  },
  {
    title: '自定义卡片2',
    content: '这是自定义卡片2的内容',
    link: 'http://127.0.0.1:5500/dist/custom-im-card.umd.js'
  },
  {
    title: '自定义卡片3',
    content: '这是自定义卡片3的内容',
    link: 'http://127.0.0.1:5500/dist/custom-im-card.umd.js'
  }
])

const handleClick = () => {
  list.value.push({
    title: `自定义卡片${list.value.length + 1}`,
    content: `这是自定义卡片${list.value.length + 1}的内容`,
    link: 'http://127.0.0.1:5500/dist/custom-im-card.umd.js'
  })
}

</script>

<style>

</style>
