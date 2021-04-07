import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      users: [...Array(10).keys()].map((id) => {
        return {
          id: id,
          firstName: "Ignacio" + id,
          lastName: "Rueda",
        };
      }),
      // FIXME: Remove filteredUsers when create services
      filteredUsers: [...Array(10).keys()].map((id) => {
        return {
          id: id,
          firstName: "Ignacio" + id,
          lastName: "Rueda",
        };
      }),
      ingredients: [...Array(15).keys()].map((id) => {
        return {
          id: id,
          name: "Ingredient " + id,
        };
      }),
      // FIXME: Remove filteredIngredients when create services
      filteredIngredients: [...Array(15).keys()].map((id) => {
        return {
          id: id,
          name: "Ingredient " + id,
        };
      }),
      recipes: [...Array(15).keys()].map((id) => {
        return {
          id: id,
          title: "Recipe " + id,
        };
      }),
      // FIXME: Remove filteredRecipes when create services
      filteredRecipes: [...Array(15).keys()].map((id) => {
        return {
          id: id,
          title: "Recipe " + id,
        };
      }),
      nutrients: [...Array(15).keys()].map((id) => {
        return {
          id: id,
          name: "Nutrient " + id,
        };
      }),
      // FIXME: Remove filteredNutrients when create services
      filteredNutrients: [...Array(15).keys()].map((id) => {
        return {
          id: id,
          name: "Nutrient " + id,
        };
      }),
    };
  },
  mutations,
  actions,
  getters,
};
