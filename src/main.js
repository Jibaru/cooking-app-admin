import { createApp } from "vue";

import store from "./store/index";
import { router } from "./router/index";
import { addIcons, addComponents } from "./plugins/index";

import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(store);

addIcons();
addComponents(app);

app.mount("#app");
