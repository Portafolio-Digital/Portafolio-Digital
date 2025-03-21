<template>
  <div class="sidebarcom" :class="{ collapsed: isCollapsed }">
    <!-- Botón para alternar el sidebar -->
    <button class="toggle-btn" @click="toggleSidebar">
      <i class="fas" :class="isCollapsed ? 'fa-bars' : 'fa-times'"></i>
    </button>
    <div class="button-container">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" class="btn-custom my-2" active-class="active">
            Información Personal
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/skills"
            class="btn-custom my-2"
            active-class="active"
          >
            Conocimientos
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/projects"
            class="btn-custom my-2"
            active-class="active"
          >
            Proyectos
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/contact"
            class="btn-custom my-2"
            active-class="active"
          >
            Formas de Contacto
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarCom",
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Sidebar */
.sidebarcom {
  width: 400px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #92f83f; /* Color de fondo de respaldo */
  background-image: url("@/assets/sidebar-design.png"); /* Ruta de la imagen */
  background-size: cover; /* Ajustar la imagen al tamaño del sidebar */
  background-repeat: no-repeat; /* Evitar que la imagen se repita */
  background-position: center; /* Centrar la imagen */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 1000; /* Asegurarse de que el sidebar esté encima del contenido */
}

/* Ocultar el sidebar solo en pantallas pequeñas */
.sidebarcom.collapsed {
  transform: translateX(-100%); /* Ocultar el sidebar */
}

@media (max-width: 768px) {
  .sidebarcom {
    width: 100%; /* El sidebar ocupa todo el ancho en pantallas pequeñas */
    transform: translateX(-100%); /* Ocultar el sidebar por defecto */
  }

  .sidebarcom.collapsed {
    transform: translateX(0); /* Mostrar el sidebar cuando no está colapsado */
  }
}

/* Botón para alternar el sidebar */
.toggle-btn {
  display: none; /* Ocultar el botón por defecto */
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0f110e;
  z-index: 1100; /* Asegurarse de que el botón esté encima del sidebar */
}

@media (max-width: 768px) {
  .toggle-btn {
    display: block; /* Mostrar el botón en pantallas pequeñas */
  }
}

/* Contenedor de los botones */
.button-container {
  width: 100%; /* Asegura que los botones ocupen todo el ancho disponible */
  display: flex;
  flex-direction: column; /* Alinea los botones en columna */
  justify-content: flex-start; /* Alinea los botones al inicio verticalmente */
  align-items: flex-end; /* Mueve los botones hacia la derecha */
  margin-top: 250px; /* Ajusta la posición vertical de los botones */
  padding-right: 20px; /* Agrega espacio desde el borde derecho */
}

/* Estilo de los botones */
.btn-custom {
  display: block;
  width: 100%; /* Ajusta el ancho de los botones */
  padding: 10px 15px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #0f110e; /* Texto oscuro */
  background-color: #7ec445; /* Fondo verde claro */
  border-radius: 25px; /* Esquinas redondeadas */
  text-decoration: none; /* Quitar subrayado */
  transition: all 0.3s ease; /* Animación suave */
  margin: 10px 0; /* Espaciado entre los botones */
}

/* Hover: Cambia el color al pasar el mouse */
.btn-custom:hover {
  background-color: #b0eb7f; /* Fondo más claro */
  color: #0f110e; /* Texto oscuro */
}

/* Botón activo: Resalta el botón de la ruta actual */
.active {
  background-color: #b0eb7f; /* Fondo más claro */
  color: #0f110e; /* Texto oscuro */
}
</style>
