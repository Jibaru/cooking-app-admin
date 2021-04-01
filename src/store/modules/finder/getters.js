export default {
  users: (state) => state.users,
  ingredients: (state) => state.ingredients,
  ingredientValues(state) {
    // FIXME: Change filteredIngredients to ingredients when create services
    return state.filteredIngredients.map((ingredient) => {
      return {
        key: ingredient.id,
        value: ingredient.name,
      };
    });
  },
};
