import { createApp } from 'vue';
import ImCard from './im-card.vue';

const mountApp = (el, props) => {
    const app = createApp(ImCard, props)
    app.mount(el)
}


export {
    ImCard,
    mountApp
}
