import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      ingredientCategories: [...Array(10).keys()].map((id) => {
        return {
          id: id,
          name: "Ingredient Category " + id,
          description: "lorem ipsum dolor sit amet, consectetur adipis",
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
