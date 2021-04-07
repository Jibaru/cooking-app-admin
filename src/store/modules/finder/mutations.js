export default {
  setIngredients(state, { ingredients }) {
    state.ingredients = ingredients;
  },
  setFilteredIngredients(state, { findedIngredients }) {
    state.filteredIngredients = findedIngredients;
  },
  setUsers(state, { users }) {
    state.users = users;
  },
  setFilteredUsers(state, { findedUsers }) {
    state.filteredUsers = findedUsers;
  },
  setRecipes(state, { recipes }) {
    state.recipes = recipes;
  },
  setFilteredRecipes(state, { findedRecipes }) {
    state.filteredRecipes = findedRecipes;
  },
  setNutrients(state, { nutrients }) {
    state.nutrients = nutrients;
  },
  setFilteredNutrients(state, { findedNutrients }) {
    state.filteredNutrients = findedNutrients;
  },
};
