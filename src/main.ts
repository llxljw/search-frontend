import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


createApp(App).use(Antd).use(router).use(mavonEditor).mount("#app");
