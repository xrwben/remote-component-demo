import { defineCustomElement } from 'vue';
import ImCard from './im-card.vue';

// 将 Vue 组件转换为自定义元素
const CardCustomElement = defineCustomElement(ImCard, {
  shadowRoot: null
});  

// 注册自定义元素（浏览器全局可用）
customElements.define('im-card-element', CardCustomElement);

// 如果是 UMD 版本，需暴露到全局变量（可选）
// if (typeof window !== 'undefined') {
//   window.ImCardElement = CardCustomElement;
// }

export default CardCustomElement;