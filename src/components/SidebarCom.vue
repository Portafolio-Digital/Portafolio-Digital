<template>
  <div class="sidebar">
    <ul>
      <li><router-link to="/">Información Personal</router-link></li>
      <li><router-link to="/projects">Proyectos</router-link></li>
      <li><router-link to="/contact">Contacto</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SidebarCom",
};
</script>

<style>
.sidebar {
  width: 200px;
  background-color: #32cd32;
  /* Verde llamativo */
  height: 100vh;
  position: fixed;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 20px 0;
}
</style>
