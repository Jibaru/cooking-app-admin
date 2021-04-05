import { createStore } from "vuex";

import comboModule from "./modules/combo/index";
import finderModule from "./modules/finder/index";
import navigationModule from "./modules/navigation/index";
import notificationModule from "./modules/notification/index";
import nutrientModule from "./modules/nutrient/index";
import userModule from "./modules/user/index";

const store = createStore({
  modules: {
    combo: comboModule,
    finder: finderModule,
    navigation: navigationModule,
    notification: notificationModule,
    nutrient: nutrientModule,
    user: userModule,
  },
});

export default store;
