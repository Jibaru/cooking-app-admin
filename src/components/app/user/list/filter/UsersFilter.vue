<template>
  <form @submit.prevent="submitFilter">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-6">
        <label>Nombres</label>
        <base-input v-model.trim="firstName" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-6">
        <label>Apellidos</label>
        <base-input v-model.trim="lastName" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Desde</label>
        <base-input type="date" v-model="fromDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Hasta</label>
        <base-input type="date" v-model="toDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Email</label>
        <base-input type="email" v-model="email" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Rol</label>
        <base-select v-model="role">
          <base-option value="#" selected>
            Todos
          </base-option>
          <base-option
            v-for="role in roles"
            :key="role.value"
            :value="role.value"
          >
            {{ role.name }}
          </base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Estado</label>
        <base-select v-model="userState">
          <base-option value="#" selected>
            Todos
          </base-option>
          <base-option
            v-for="userState in userStates"
            :key="userState.value"
            :value="userState.value"
          >
            {{ userState.name }}
          </base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button
          type="button"
          @click="togglePrefRecipesModal"
          @mouseenter="isOpenPrefRecipesPopover = true"
          @mouseleave="isOpenPrefRecipesPopover = false"
          class="popover-target"
          data-id="pref-recipes-btn"
          block
        >
          Pref. Recetas
        </base-button>
        <base-modal
          title="Preferencias de recetas"
          :open="isOpenPrefRecipesModal"
          @close="togglePrefRecipesModal"
        >
          <users-recipe-count-filter
            :minRecipesCreated="prefRecipes.recipesCreated.min"
            :maxRecipesCreated="prefRecipes.recipesCreated.max"
            :minRecipesFavorite="prefRecipes.recipesFavorite.min"
            :maxRecipesFavorite="prefRecipes.recipesFavorite.max"
            :minRecipesStored="prefRecipes.recipesStored.min"
            :maxRecipesStored="prefRecipes.recipesStored.max"
            @selected="savePreferencesAndCloseModal"
          />
        </base-modal>
        <base-popover
          target-data-id="pref-recipes-btn"
          :open="isOpenPrefRecipesPopover"
        >
          <base-simple-list :elements="prefRecipesList"></base-simple-list>
        </base-popover>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button block>Filtrar</base-button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
import UsersRecipeCountFilter from "./UsersRecipeCountFilter";

export default {
  emits: ["filter"],
  components: {
    UsersRecipeCountFilter,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      fromDate: "",
      toDate: "",
      email: "",
      role: "#",
      userState: "#",
      prefRecipes: {
        recipesCreated: {
          name: "Recetas Creadas",
          min: null,
          max: null,
        },
        recipesFavorite: {
          name: "Recetas Favoritas",
          min: null,
          max: null,
        },
        recipesStored: {
          name: "Recetas Guardadas",
          min: null,
          max: null,
        },
      },
      isOpenPrefRecipesModal: false,
      isOpenPrefRecipesPopover: false,
    };
  },
  computed: {
    ...mapGetters({
      roles: "combo/roles",
      userStates: "combo/userStates",
    }),
    prefRecipesList() {
      return Object.keys(this.prefRecipes).reduce((prev, preference) => {
        return prev.concat([
          `Min. ${this.prefRecipes[preference].name}: ${this.prefRecipes[
            preference
          ].min ?? "-"}`,
          `Max. ${this.prefRecipes[preference].name}: ${this.prefRecipes[
            preference
          ].max ?? "-"}`,
        ]);
      }, []);
    },
  },
  methods: {
    togglePrefRecipesModal() {
      this.isOpenPrefRecipesModal = !this.isOpenPrefRecipesModal;
    },
    savePreferencesAndCloseModal(preferences) {
      Object.keys(preferences).forEach((typePreference) => {
        for (const key in preferences[typePreference]) {
          this.prefRecipes[typePreference][key] =
            preferences[typePreference][key];
        }
      });
      this.togglePrefRecipesModal();
    },
    submitFilter() {
      const filters = {
        ...(this.firstName !== "" && {
          firstName: this.firstName,
        }),
        ...(this.lastName !== "" && {
          firstName: this.lastName,
        }),
        ...(this.fromDate !== "" && {
          fromDate: this.fromDate,
        }),
        ...(this.toDate !== "" && {
          toDate: this.toDate,
        }),
        ...(this.email !== "" && {
          email: this.email,
        }),
        ...(this.role !== "#" && {
          role: this.role,
        }),
        ...(this.userState !== "#" && {
          userState: this.userState,
        }),
        ...(this.prefRecipes.recipesCreated.min && {
          minRecipesCreated: this.prefRecipes.recipesCreated.min,
        }),
        ...(this.prefRecipes.recipesCreated.max && {
          maxRecipesCreated: this.prefRecipes.recipesCreated.max,
        }),
        ...(this.prefRecipes.recipesFavorite.min && {
          minRecipesFavorite: this.prefRecipes.recipesFavorite.min,
        }),
        ...(this.prefRecipes.recipesFavorite.max && {
          maxRecipesFavorite: this.prefRecipes.recipesFavorite.max,
        }),
        ...(this.prefRecipes.recipesStored.min && {
          minRecipesStored: this.prefRecipes.recipesStored.min,
        }),
        ...(this.prefRecipes.recipesStored.max && {
          maxRecipesStored: this.prefRecipes.recipesStored.max,
        }),
      };

      this.$emit("filter", filters);
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
