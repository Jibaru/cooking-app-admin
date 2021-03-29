import { createStore } from "vuex";

import comboModule from "./modules/combo/index";
import finderModule from "./modules/finder/index";
import navigationModule from "./modules/navigation/index";

const store = createStore({
  modules: {
    combo: comboModule,
    finder: finderModule,
    navigation: navigationModule,
  },
});

export default store;
