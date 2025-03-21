<template>
  <div class="projects-container container mt-5">
    <h2 class="text-center mb-4">Proyectos</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="project in projects" :key="project.id">
        <div class="card project-card">
          <!-- Imagen del proyecto -->
          <img
            v-if="project.image"
            :src="project.image"
            class="card-img-top"
            :alt="project.title"
          />
          <div class="card-body">
            <!-- Nombre del proyecto -->
            <h5 class="card-title">{{ project.title }}</h5>

            <!-- Descripción corta -->
            <p class="card-text">{{ project.description }}</p>

            <!-- Estado del proyecto -->
            <p><strong>Estado:</strong> {{ project.status }}</p>

            <!-- Herramientas -->
            <p v-if="project.tools.length">
              <strong>Herramientas:</strong> {{ project.tools.join(", ") }}
            </p>

            <!-- Lenguajes -->
            <p v-if="project.languages.length">
              <strong>Lenguajes:</strong> {{ project.languages.join(", ") }}
            </p>

            <!-- Bibliotecas -->
            <p v-if="project.libraries.length">
              <strong>Bibliotecas:</strong> {{ project.libraries.join(", ") }}
            </p>

            <!-- Frameworks -->
            <p v-if="project.frameworks.length">
              <strong>Frameworks:</strong> {{ project.frameworks.join(", ") }}
            </p>

            <!-- Enlace al proyecto -->
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              class="btn btn-primary"
            >
              Ver proyecto
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      projects: [], // Lista de proyectos obtenidos desde la base de datos
    };
  },
  methods: {
    // Obtener proyectos desde el backend
    async fetchProjects() {
      try {
        const response = await axios.get("http://localhost:3000/api/projects");
        // Convertir cadenas separadas por comas en arrays
        this.projects = response.data.map((project) => ({
          ...project,
          tools: project.tools ? project.tools.split(",") : [],
          languages: project.languages ? project.languages.split(",") : [],
          libraries: project.libraries ? project.libraries.split(",") : [],
          frameworks: project.frameworks ? project.frameworks.split(",") : [],
        }));
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
        alert("Hubo un error al cargar los proyectos.");
      }
    },
  },
  async mounted() {
    // Cargar proyectos al montar el componente
    await this.fetchProjects();
  },
};
</script>

<style scoped>
.projects-container {
  padding: 20px;
}

.project-card {
  height: 100%;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #92f83f;
  margin-bottom: 20px;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

@media (max-width: 768px) {
  .card-img-top {
    height: 120px;
  }
}

.card-title {
  color: #0f110e;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-text {
  color: #0f110e;
  margin-bottom: 15px;
  white-space: pre-wrap; /* Permitir saltos de línea en la descripción */
}

p {
  margin-bottom: 8px;
  color: #0f110e;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #0f110e;
  border: none;
  padding: 8px 16px;
  width: 100%;
}

.btn-primary:hover {
  background-color: #333;
}
</style>
