export default {
  async findIngredients(context, { value }) {
    // TODO: find ingredients

    const findedIngredients = context.getters.ingredients.filter((option) =>
      option.name.includes(value)
    );

    context.commit("setFilteredIngredients", { findedIngredients });
  },
};
