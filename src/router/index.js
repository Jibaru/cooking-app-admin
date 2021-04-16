import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/home/HomeView";
import AuthView from "../views/AuthView";

import EquipmentsView from "../views/home/views/EquipmentsView";
import FileDatasView from "../views/home/views/FileDatasView";
import IngredientCategoriesView from "../views/home/views/IngredientCategoriesView";
import IngredientsView from "../views/home/views/IngredientsView";
import NotificationsView from "../views/home/views/NotificationsView";
import NutrientsView from "../views/home/views/NutrientsView";
import RecipeCuisinesView from "../views/home/views/RecipeCuisinesView";
import RecipesView from "../views/home/views/RecipesView";
import RecipeTagsView from "../views/home/views/RecipeTagsView";
import RecipeTypesView from "../views/home/views/RecipeTypesView";
import UsersView from "../views/home/views/UsersView";

const APP_ROUTES = [
  {
    path: "/",
    component: HomeView,
    meta: {
      inSidebar: false,
    },
    children: [
      {
        name: "Equipments",
        appName: "Materiales",
        path: "/materiales",
        component: EquipmentsView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "utensil-spoon",
          },
        },
      },
      {
        name: "FileDatas",
        appName: "Archivos",
        path: "/archivos",
        component: FileDatasView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "file-alt",
          },
        },
      },
      {
        name: "IngredientCategories",
        appName: "Categorías Ingrediente",
        path: "/categorias-ingrediente",
        component: IngredientCategoriesView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "clipboard-check",
          },
        },
      },
      {
        name: "Ingredients",
        appName: "Ingredientes",
        path: "/ingredientes",
        component: IngredientsView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "apple-alt",
          },
        },
      },
      {
        name: "Notifications",
        appName: "Notificaciones",
        path: "/notificaciones",
        component: NotificationsView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "envelope",
          },
        },
      },
      {
        name: "Nutrients",
        appName: "Nutrientes",
        path: "/nutrientes",
        component: NutrientsView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "capsules",
          },
        },
      },
      {
        name: "RecipeCuisines",
        appName: "Cocinas de Receta",
        path: "/cocinas-receta",
        component: RecipeCuisinesView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "globe-americas",
          },
        },
      },
      {
        name: "Recipes",
        appName: "Recetas",
        path: "/recetas",
        component: RecipesView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "book",
          },
        },
      },
      {
        name: "RecipeTags",
        appName: "Tags de Recetas",
        path: "/tags-recetas",
        component: RecipeTagsView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "tags",
          },
        },
      },
      {
        name: "RecipeTypes",
        appName: "Tipos de Recetas",
        path: "/tipos-recetas",
        component: RecipeTypesView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "pizza-slice",
          },
        },
      },
      {
        name: "Users",
        appName: "Usuarios",
        path: "/usuarios",
        component: UsersView,
        meta: {
          inSidebar: true,
          icon: {
            prefix: "fas",
            name: "user",
          },
        },
      },
    ],
  },
  {
    name: "Login",
    path: "/iniciar-sesion",
    component: AuthView,
    meta: {
      inSidebar: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: APP_ROUTES,
});

const ALL_ROUTES = (() => {
  const findedRoutes = [];

  const findRoutes = (routes) => {
    findedRoutes.push(...routes);

    for (const route of routes) {
      if (route.children) {
        findRoutes(route.children);
      }
    }
  };

  findRoutes(APP_ROUTES);
  return findedRoutes;
})();

export { router, APP_ROUTES, ALL_ROUTES };
