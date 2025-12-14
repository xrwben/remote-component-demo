<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <slot></slot>
    <button @click="handleClick">操作</button>

    <div class="layer" v-if="isShow" @click="closeCard"></div>
    <p @click="showLayer">显示弹窗</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 接收主应用传递的参数
const props = defineProps({
  title: { type: String, default: '业务卡片' },
  config: { type: Object, default: () => ({}) }
});

const emit = defineEmits();
const handleClick = () => {
  // 触发自定义事件回传数据
  emit('card-event', { data: '来自卡片的交互数据', timestamp: Date.now() });
};

// 定义状态变量
const isShow = ref(false);
// 点击操作时显示层
const showLayer = () => {
  emit('popup-event', '点击了显示弹窗');
  isShow.value = true;
};

// 点击层关闭卡片
const closeCard = () => {
  isShow.value = false;
};


</script>

<style scoped>
.card {
  background: paleturquoise;
  margin: 0;
  padding: 0;
}
h3 {
  font-size: 0.5rem;
}
.layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>