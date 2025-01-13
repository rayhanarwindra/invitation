import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import en from "./lang/en";
import id from "./lang/id";

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
app.mount('#app');
