import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      roles: [
        {
          value: "ADMINISTRATOR",
          name: "Administrador",
        },
        {
          value: "NORMAL",
          name: "Normal",
        },
      ],
      userStates: [],
      ingredientStates: [],
      equipmentStates: [],
      recipeStates: [],
    };
  },
  mutations,
  actions,
  getters,
};
