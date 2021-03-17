<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Nombres</base-cell>
      <base-cell tag="th">Apellidos</base-cell>
      <base-cell tag="th">Email</base-cell>
      <base-cell tag="th">Fecha Creación</base-cell>
      <base-cell tag="th">Rol</base-cell>
      <base-cell tag="th">Estado</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr>
        <base-cell tag="td">1</base-cell>
        <base-cell tag="td">Ignacio</base-cell>
        <base-cell tag="td">Rueda Boada</base-cell>
        <base-cell tag="td">ignacioruedaboada@gmail.com</base-cell>
        <base-cell tag="td">27/07/1997</base-cell>
        <base-cell tag="td">ADMIN</base-cell>
        <base-cell tag="td">ACTIVE</base-cell>
        <base-cell tag="td">aa</base-cell>
      </tr>
    </template>
  </base-table>
</template>
