<template>
  <form>
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <base-file-input type="file" v-model="file" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Rol</label>
        <base-select v-model="role">
          <base-option value="ADMIN">Administrador</base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Apellidos</label>
        <base-input v-model="lastName" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Nombres</label>
        <base-input v-model="firstName" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Email</label>
        <base-input type="email" v-model="email" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Contraseña</label>
        <base-input v-model="password" />
      </div>
    </div>
    <div class="flex-end">
      <base-button type="submit">
        Nuevo Usuario
      </base-button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      file: null,
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
