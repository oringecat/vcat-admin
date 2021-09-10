import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import validate from "./utils/validate"; // 表达验证指令
import layouts from "./layouts"; // 布局组件
import components from "./components"; // 通用组件
import elementPlus from './lib/element-plus' // 按需引入 element 组件
import { debounce } from "./utils" // 工具类
import './utils/extension' // 原型扩展

document.addEventListener("DOMContentLoaded", () => {
    store.dispatch("app/isMobile");
    // 监听窗口大小变化
    window.addEventListener('resize', debounce(() => {
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