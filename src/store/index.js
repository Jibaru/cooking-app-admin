import { createStore } from "vuex";

import comboModule from "./modules/combo/index";
import navigationModule from "./modules/navigation/index";

const store = createStore({
  modules: {
    combo: comboModule,
    navigation: navigationModule,
  },
});

export default store;
