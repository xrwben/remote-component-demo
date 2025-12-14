<template>
    <div class="comment-card">
        <p>{{ str }}</p>
        <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.9WBulTVjfoszbgJy-MpKCwHaHa?w=180&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1" alt="">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const str = ref('嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻')
</script>

<style lang="less" scoped>
.comment-card {
    width: 375px;
    height: 80px;
    box-sizing: border-box;
    background-color: pink;
    border-radius: 6px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        color: #0f0202;
        font-size: 18px;
        flex: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        overflow: hidden;
        margin: 0;
    }
    img {
        width: 60px;
        height: 60px;
        margin-left: 10px;
    }
}
</style>