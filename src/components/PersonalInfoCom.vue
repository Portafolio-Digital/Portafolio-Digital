<template>
  <div class="personal-info-container text-center">
    <h1 class="title">Hola, mi nombre es Diego Jesús Medina Tirado</h1>
    <p class="description mt-3">
      Me apasiona la tecnología y el desarrollo de software. Siempre busco
      nuevos retos que me permitan crecer profesional y personalmente en el
      mundo de la tecnología.
    </p>
    <div class="profile-image-container mt-4">
      <img
        src="../assets/Foto de perfil.jpg"
        alt="Foto de perfil"
        class="profile-image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalInfoCom",
};
</script>

<style scoped>
/* Contenedor principal */
.personal-info-container {
  flex: 1;
  max-width: 800px; /* Limita el ancho del contenido */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  padding: 20px;
  text-align: center;
}

/* Título */
.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #0f110e; /* Color oscuro */
  margin-top: 100px;
}

/* Descripción */
.description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333; /* Color gris oscuro */
}

/* Contenedor de la imagen */
.profile-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Imagen de perfil */
.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%; /* Hace la imagen circular */
  border: 8px solid #92f83f; /* Borde verde */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra para darle profundidad */
  object-fit: cover; /* Asegura que la imagen se ajuste bien al contenedor */
}

@media (max-width: 768px) {
  .profile-image {
    width: 150px;
    height: 150px;
  }
}
</style>
