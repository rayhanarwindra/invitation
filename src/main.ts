import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import ToastPlugin from "vue-toast-notification";
import en from "./lang/en";
import id from "./lang/id";

import 'vue-toast-notification/dist/theme-bootstrap.css';

const i18n = createI18n({
  locale: "id",
  fallbackLocale: "id",
  messages: {
    en: en,
    id: id,
  },
});

const app = createApp(App);
app.use(i18n);
app.use(ToastPlugin);
app.mount("#app");
