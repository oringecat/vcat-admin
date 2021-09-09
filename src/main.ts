import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import validate from "./utils/validate";
import layouts from "./layouts";
import components from "./components";
import elementPlus from './lib/element-plus' // �������� element ���
import util from "./utils"
import './utils/extension'

document.addEventListener("DOMContentLoaded", () => {
    store.dispatch("app/isMobile");
    // �������ڴ�С�仯
    window.addEventListener('resize', util.debounce(() => {
        store.dispatch("app/isMobile");
    }, 200));
}, false);

const app = createApp(App);
app.use(store);
app.use(router);
app.use(validate);
app.use(layouts);
app.use(elementPlus);
app.use(components);
app.mount("#app");