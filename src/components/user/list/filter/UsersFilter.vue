<template>
  <form>
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-6">
        <label>Nombres</label>
        <base-input />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-6">
        <label>Apellidos</label>
        <base-input />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Desde</label>
        <base-input type="date" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Hasta</label>
        <base-input type="date" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Email</label>
        <base-input type="email" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Rol</label>
        <base-select>
          <base-option value="ADMIN">Administrador</base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Estado</label>
        <base-select>
          <base-option value="ACTIVE">Activo</base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button block>Pref. Recetas</base-button>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button block>Filtrar</base-button>
      </div>
    </div>
  </form>
</template>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
