import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { Quasar } from "quasar";

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

import 'quasar/dist/quasar.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Buat instance Pinia
const pinia = createPinia();

// Buat aplikasi Vue dan gunakan plugin yang diperlukan
const app = createApp(App);

// Menggunakan Pinia dan router
app.use(pinia);
app.use(router);

// Menggunakan Quasar
app.use(Quasar, {
  plugins: {}, // Import Quasar plugins and add here
});

// Mount aplikasi ke elemen dengan id "app"
app.mount("#app");
