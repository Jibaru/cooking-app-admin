export default {
  setIngredients(state, { ingredients }) {
    state.ingredients = ingredients;
  },
  setFilteredIngredients(state, { findedIngredients }) {
    state.filteredIngredients = findedIngredients;
  },
};
