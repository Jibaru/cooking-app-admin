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
          email: "ignaciorueda@gmail.com",
          createdAt: "27/07/1997",
          role: "ADMIN",
          status: id % 2 === 0 ? "ACTIVE" : "BANNED",
          image:
            id === 5
              ? {
                  url:
                    "https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg",
                }
              : null,
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
