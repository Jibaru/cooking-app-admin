import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      roles: [
        {
          value: "ADMINISTRATOR",
          name: "Administrador",
        },
        {
          value: "NORMAL",
          name: "Normal",
        },
      ],
      userStates: [
        {
          value: "ACTIVE",
          name: "Activo",
        },
        {
          value: "BANNED",
          name: "Baneado",
        },
      ],
      ingredientStates: [
        {
          value: "APPROVED",
          name: "Aprobado",
        },
        {
          value: "DENIED",
          name: "Denegado",
        },
      ],
      equipmentStates: [
        {
          value: "APPROVED",
          name: "Aprobado",
        },
        {
          value: "DENIED",
          name: "Denegado",
        },
      ],
      recipeStates: [],
      regions: [
        {
          value: "NORTH_AMERICA",
          name: "Norteamérica",
        },
        {
          value: "CENTRAL_AMERICA",
          name: "Centroamérica",
        },
        {
          value: "SOUTH_AMERICA",
          name: "Sudámerica",
        },
        {
          value: "EUROPE",
          name: "Europa",
        },
      ],
      mimeTypes: [
        {
          value: "image/jpeg",
          name: "JPEG",
        },
        {
          value: "image/png",
          name: "PNG",
        },
      ],
      units: [
        { value: "kg", name: "KG" },
        { value: "mg", name: "Mg" },
        { value: "lt", name: "Litros" },
        { value: "gr", name: "Gramos" },
        { value: "tz", name: "Tazas" },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
