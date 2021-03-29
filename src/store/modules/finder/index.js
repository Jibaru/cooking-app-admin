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
    };
  },
  mutations,
  actions,
  getters,
};
