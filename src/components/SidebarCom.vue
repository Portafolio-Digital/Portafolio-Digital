<template>
  <div class="sidebarcom">
    <!-- Contenedor de los botones -->
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
};
</script>

<style scoped>
/* Estilo general del sidebar */
.sidebarcom {
  width: 400px;
  height: 100vh;
  position: fixed;
  color: #0f110e;
  background-color: #92f83f; /* Verde llamativo */
  background-image: url("@/assets/DiseñodelSidebar.png"); /* Imagen de fondo */
  background-size: 100% 100%; /* Ajusta la imagen para cubrir todo el contenedor */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  background-position: center; /* Centra la imagen */
  display: flex;
  justify-content: flex-start; /* Alinea el contenido al inicio verticalmente */
  align-items: flex-start; /* Alinea el contenido al inicio horizontalmente */
  padding: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
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
