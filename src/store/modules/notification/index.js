import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      notifications: [...Array(16).keys()].map((id) => {
        return {
          id: id,
          subject: "lorem ipsum dolor sit amet, consectetur adipis" + id,
          content:
            "lorem ipsum dolor sit amet, consectetur adipis lorem ipsum dolor sit amet, consectetur adipis lorem ipsum dolor sit amet, consectetur adipis",
          dateTimeSended: "2015-12-02",
          dateTimeViewed: "2015-12-06",
          createdAt: "2015-12-06",
          user: {
            id: id * 2,
            firstName: "Ignacio",
            lastName: "Rueda",
          },
        };
      }),
      currentPage: 1,
      totalPages: 2,
    };
  },
  mutations,
  actions,
  getters,
};
