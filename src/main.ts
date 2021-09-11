import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import validate from "./utils/validate"; // �����ָ֤��
import layouts from "./layouts"; // �������
import components from "./components"; // ͨ�����
import elementPlus from './lib/element-plus' // �������� element ���
import { onresize } from "./utils" // ������
import "./utils/extension" // ԭ����չ
import "./mock" // ģ������

document.addEventListener("DOMContentLoaded", () => {
    store.dispatch("app/isMobile");
    onresize(() => store.dispatch("app/isMobile"));
}, false);

const app = createApp(App);
app.use(store);
app.use(router);
app.use(validate);
app.use(layouts);
app.use(elementPlus);
app.use(components);
app.mount("#app");