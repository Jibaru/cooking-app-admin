export default {
  users: (state) => state.users,
  userValues(state) {
    // FIXME: Change filteredUsers to users when create services
    return state.filteredUsers.map((user) => {
      return {
        key: user.id,
        value: user.firstName + " " + user.lastName,
      };
    });
  },
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
  recipes: (state) => state.recipes,
  recipeValues(state) {
    // FIXME: Change filteredRecipes to recipes when create services
    return state.filteredRecipes.map((recipe) => {
      return {
        key: recipe.id,
        value: recipe.title,
      };
    });
  },
};
