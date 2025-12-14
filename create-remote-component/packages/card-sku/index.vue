<template>
    <div class="card-sku">
        <h2>{{ str }}</h2>
        <img src="https://img95.699pic.com/photo/60041/2416.jpg_wh300.jpg!/fh/300/quality/90" alt="">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const str = ref('商品卡片')
</script>

<style lang="less" scoped>
.card-sku {
    width: 375px;
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px;
    h2 {
        font-size: 24px;
        font-weight: bold;
        color: goldenrod;
        margin: 0;
    }
    img {
        width: 100%;
        height: 200px;
        display: block;
    }
}
</style>