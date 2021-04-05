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
};
