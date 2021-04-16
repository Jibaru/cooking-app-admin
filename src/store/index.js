import { createStore } from "vuex";

import comboModule from "./modules/combo/index";
import equipmentModule from "./modules/equipment/index";
import fileDataModule from "./modules/file-data/index";
import finderModule from "./modules/finder/index";
import ingredientModule from "./modules/ingredient/index";
import ingredientCategoryModule from "./modules/ingredient-category/index";
import navigationModule from "./modules/navigation/index";
import notificationModule from "./modules/notification/index";
import nutrientModule from "./modules/nutrient/index";
import recipeCuisineModule from "./modules/recipe-cuisine/index";
import recipeTagModule from "./modules/recipe-tag/index";
import recipeTypeModule from "./modules/recipe-type/index";
import userModule from "./modules/user/index";

const store = createStore({
  modules: {
    combo: comboModule,
    equipment: equipmentModule,
    fileData: fileDataModule,
    finder: finderModule,
    ingredient: ingredientModule,
    ingredientCategory: ingredientCategoryModule,
    navigation: navigationModule,
    notification: notificationModule,
    nutrient: nutrientModule,
    recipeCuisine: recipeCuisineModule,
    recipeTag: recipeTagModule,
    recipeType: recipeTypeModule,
    user: userModule,
  },
});

export default store;
