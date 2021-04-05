export default {
  async findIngredients(context, { value }) {
    // TODO: find ingredients

    const findedIngredients = context.getters.ingredients.filter((option) =>
      option.name.includes(value)
    );

    context.commit("setFilteredIngredients", { findedIngredients });
  },
  async findUsers(context, { value }) {
    // TODO: find users

    const findedUsers = context.getters.users.filter(
      (option) =>
        option.firstName.includes(value) || option.lastName.includes(value)
    );

    context.commit("setFilteredUsers", { findedUsers });
  },
};
