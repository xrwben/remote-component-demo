import { defineCustomElement } from 'vue'
import card from './index.vue'

const CardSku = defineCustomElement(card)
customElements.define('card-sku', CardSku)


export { card }
