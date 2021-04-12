import { createStore } from "vuex";

import comboModule from "./modules/combo/index";
import fileDataModule from "./modules/file-data/index";
import finderModule from "./modules/finder/index";
import ingredientModule from "./modules/ingredient/index";
import ingredientCategoryModule from "./modules/ingredient-category/index";
import navigationModule from "./modules/navigation/index";
import notificationModule from "./modules/notification/index";
import nutrientModule from "./modules/nutrient/index";
import recipeCuisineModule from "./modules/recipe-cuisine/index";
import recipeTagModule from "./modules/recipe-tag/index";
import userModule from "./modules/user/index";

const store = createStore({
  modules: {
    combo: comboModule,
    fileData: fileDataModule,
    finder: finderModule,
    ingredient: ingredientModule,
    ingredientCategory: ingredientCategoryModule,
    navigation: navigationModule,
    notification: notificationModule,
    nutrient: nutrientModule,
    recipeCuisine: recipeCuisineModule,
    recipeTag: recipeTagModule,
    user: userModule,
  },
});

export default store;
