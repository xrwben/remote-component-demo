// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
      template: {
        compilerOptions: {
          shadowMode: true, // 默认值，可省略
        },
      }
    })
  ],
  build: {
    lib: {
      entry: './index.js', // 组件入口文件
      name: 'ImCard', // 全局变量名
      fileName: format => `custom-im-card.${format}.js`, // 输出文件名
      formats: ['umd'], // 仅生成 UMD 格式
    },
    emptyOutDir: false,
    rollupOptions: {
      external: ['vue'], // 排除 Vue 依赖（主应用需提前加载）
      output: {
        globals: {
          vue: 'Vue', // 指定全局变量名（与主应用一致）
        },
      },
    },
    watch:  {}
  },
});