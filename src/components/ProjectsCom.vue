<template>
  <div class="projects-container container mt-5">
    <h2 class="text-center mb-4">Proyectos</h2>
    <div class="row">
      <!-- Categoría: Terminados -->
      <div class="col-md-4 mb-4">
        <h4 class="category-title">Terminados</h4>
        <div
          class="card project-card"
          v-for="project in projects.filter((p) => p.category === 'Terminados')"
          :key="project.id"
        >
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>
          </div>
        </div>
      </div>

      <!-- Categoría: En proceso -->
      <div class="col-md-4 mb-4">
        <h4 class="category-title">En proceso</h4>
        <div
          class="card project-card"
          v-for="project in projects.filter((p) => p.category === 'En proceso')"
          :key="project.id"
        >
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>
          </div>
        </div>
      </div>

      <!-- Categoría: Ideas -->
      <div class="col-md-4 mb-4">
        <h4 class="category-title">Ideas</h4>
        <div
          class="card project-card"
          v-for="project in projects.filter((p) => p.category === 'Ideas')"
          :key="project.id"
        >
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectsCom",
  data() {
    return {
      projects: [
        {
          id: 1,
          name: "Proyecto 1",
          description: "Descripción del proyecto 1",
          category: "Terminados",
        },
        {
          id: 2,
          name: "Proyecto 2",
          description: "Descripción del proyecto 2",
          category: "En proceso",
        },
        {
          id: 3,
          name: "Proyecto 3",
          description: "Descripción del proyecto 3",
          category: "Ideas",
        },
        {
          id: 4,
          name: "Proyecto 4",
          description: "Descripción del proyecto 4",
          category: "Terminados",
        },
        {
          id: 5,
          name: "Proyecto 5",
          description: "Descripción del proyecto 5",
          category: "En proceso",
        },
        {
          id: 6,
          name: "Proyecto 6",
          description: "Descripción del proyecto 6",
          category: "Ideas",
        },
      ],
    };
  },
};
</script>

<style scoped>
.projects-container {
  flex: 1;
  max-width: 800px; /* Limita el ancho del contenido */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  padding: 20px;
}

h2 {
  color: #0f110e; /* Color oscuro */
  font-weight: bold;
}

.category-title {
  font-size: 1.5rem;
  color: #333; /* Color gris oscuro */
  margin-bottom: 15px;
  text-align: center;
}

.project-card {
  background-color: #92f83f; /* Fondo verde */
  color: #0f110e; /* Texto oscuro */
  border: none; /* Sin bordes */
  border-radius: 10px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Animación suave */
}

.project-card:hover {
  transform: translateY(-5px); /* Efecto de elevación */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Sombra más intensa */
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #333; /* Color gris oscuro */
}
</style>
