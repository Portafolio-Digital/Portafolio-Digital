<template>
  <div class="sidebarcom d-flex flex-column vh-100">
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/" class="btn-custom my-2" active-class="active"
          >Información Personal</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/skills" class="btn-custom my-2" active-class="active"
          >Conocimientos</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          to="/projects"
          class="btn-custom my-2"
          active-class="active"
          >Proyectos</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/contact" class="btn-custom my-2" active-class="active"
          >Formas de Contacto</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SidebarCom",
};
</script>

<style scoped>
/* Estilo general del sidebar */
.sidebarcom {
  width: 400px;
  position: fixed;
  color: #0f110e;
  background-color: #92f83f; /* Verde llamativo */
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
}

/* Estilo de los botones */
.btn-custom {
  display: block;
  width: 100%;
  padding: 10px 15px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #0f110e; /* Texto oscuro */
  background-color: #7ec445; /* Fondo verde claro */
  border-radius: 25px; /* Esquinas redondeadas */
  text-decoration: none; /* Quitar subrayado */
  transition: all 0.3s ease; /* Animación suave */
}

/* Hover: Cambia el color al pasar el mouse */
.btn-custom:hover {
  background-color: #b0eb7f; /* Fondo oscuro */
  color: #0f110e; /* Texto blanco */
}

/* Botón activo: Resalta el botón de la ruta actual */
.active {
  background-color: #b0eb7f; /* Fondo oscuro */
  color: #0f110e; /* Texto blanco */
}
</style>
