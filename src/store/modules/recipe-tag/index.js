import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      recipeTags: [...Array(11).keys()].map((id) => {
        return {
          id: id,
          name: "Recipe Tag " + id,
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
