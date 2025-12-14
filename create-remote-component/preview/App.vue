<template>
  <div class="page">
    <div class="pic">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </div>
    <card-comment></card-comment>
    <card-sku></card-sku>
  </div>
</template>

<script setup lang="ts">
import CardComment from '../packages/card-comment/index.vue'
import CardSku from '../packages/card-sku/index.vue'
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
} 
.logo {
  height: 6em;
}
</style>
