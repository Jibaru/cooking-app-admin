import { createStore } from "vuex";

import comboModule from "./modules/combo/index";
import finderModule from "./modules/finder/index";
import navigationModule from "./modules/navigation/index";
import userModule from "./modules/user/index";

const store = createStore({
  modules: {
    combo: comboModule,
    finder: finderModule,
    navigation: navigationModule,
    user: userModule,
  },
});

export default store;
