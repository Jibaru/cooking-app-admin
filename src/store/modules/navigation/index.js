import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import { ALL_ROUTES } from "../../../router/index";

export default {
  namespaced: true,
  state() {
    return {
      sidebarLinks: ALL_ROUTES.filter((route) => route.meta.inSidebar).map(
        (route) => {
          return {
            name: route.appName,
            path: route.path,
            icon: {
              prefix: route.meta.icon.prefix,
              name: route.meta.icon.name,
            },
          };
        }
      ),
    };
  },
  mutations,
  actions,
  getters,
};
