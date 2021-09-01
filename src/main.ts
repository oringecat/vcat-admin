import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import validate from "./utils/validate";
import layouts from "./layouts";
import components from "./components";
import elementPlus from './lib/element-plus' // 按需引入 element 组件

const app = createApp(App);
app.use(store);
app.use(router);
app.use(validate);
app.use(layouts);
app.use(elementPlus);
app.use(components);
app.mount("#app");
