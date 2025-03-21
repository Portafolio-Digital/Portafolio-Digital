<template>
  <div id="app" class="d-flex">
    <!-- Botón para alternar el sidebar -->
    <button class="toggle-btn" @click="toggleSidebar">
      <i class="fas" :class="isSidebarCollapsed ? 'fa-bars' : 'fa-times'"></i>
    </button>
    <!-- Sidebar -->
    <SidebarCom :isCollapsed="isSidebarCollapsed" />
    <!-- Contenido principal -->
    <div class="content flex-grow-1">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarCom from "./components/SidebarCom.vue";

export default {
  name: "App",
  components: {
    SidebarCom,
  },
  data() {
    return {
      isSidebarCollapsed: false, // Controla si el sidebar está colapsado
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
#app {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  overflow-x: hidden; /* Evitar desbordamiento horizontal */
}

/* Contenido principal */
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 400px; /* Espacio para el sidebar en pantallas grandes */
  color: #0f110e;
  background-color: #f2ffe5;
  padding: 20px;
  box-sizing: border-box;
  transition: margin-left 0.3s ease-in-out; /* Transición suave al cambiar el margen */
}

@media (max-width: 768px) {
  .content {
    margin-left: 0; /* Eliminar espacio del sidebar en pantallas pequeñas */
  }
}

/* Botón para alternar el sidebar */
.toggle-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0f110e;
  z-index: 1100; /* Asegurarse de que el botón esté encima del sidebar */
}

@media (min-width: 769px) {
  .toggle-btn {
    display: none; /* Ocultar el botón en pantallas grandes */
  }
}
</style>
