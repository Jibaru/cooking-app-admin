import { createStore } from "vuex";

import navigationModule from "./modules/navigation/index";

const store = createStore({
  modules: {
    navigation: navigationModule,
  },
});

export default store;
