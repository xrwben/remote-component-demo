// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import importToConst from 'rollup-plugin-import-to-const';

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    importToConst(),
  ],
  build: {
    lib: {
      entry: './index-es.js', // 组件入口文件
      name: 'ImCard', // 全局变量名
      fileName: format => `im-card.${format}.js`, // 输出文件名
      formats: ['es'], // 仅生成 ES 格式
    },
    rollupOptions: {
      external: ['vue'], // 排除 Vue 依赖（主应用需提前加载）
      output: {
        // 对于ES模块，提供路径映射
        // paths: {
        //   vue: 'https://unpkg.com/vue@3/dist/vue.esm-browser.js' // 使用CDN上的Vue
        // },
        globals: {
          vue: 'Vue', // 指定全局变量名（与主应用一致）
        },
      },
    },
    watch:  {}
  },
});