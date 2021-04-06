import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      recipeCuisines: [...Array(10).keys()].map((id) => {
        return {
          id: id,
          name: "Recipe Cuisine " + id,
          region: "CENTRAL_AMERICA",
          createdAt: "2015-12-06",
        };
      }),
      currentPage: 1,
      totalPages: 2,
    };
  },
  mutations,
  actions,
  getters,
};
