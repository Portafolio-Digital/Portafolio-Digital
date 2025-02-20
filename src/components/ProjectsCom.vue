<template>
  <div class="projects-container container mt-5">
    <h2 class="text-center mb-4">Proyectos</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="project in projects" :key="project.id">
        <div class="card project-card">
          <!-- Opción 1: Usando require -->
          <img :src="project.image" class="card-img-top" :alt="project.name" />

          <!-- O prueba esta alternativa si la anterior no funciona -->
          <!-- <img :src="'/src/assets/' + project.image" class="card-img-top" :alt="project.name" /> -->

          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>
            <div class="project-details">
              <p><strong>Tecnologías:</strong> {{ project.technologies }}</p>
              <p><strong>Bibliotecas:</strong> {{ project.libraries }}</p>
              <p><strong>Herramientas:</strong> {{ project.tools }}</p>
              <p><strong>Framework:</strong> {{ project.framework }}</p>
            </div>
            <a :href="project.link" target="_blank" class="btn btn-primary"
              >Ver proyecto</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importa la imagen al inicio del componente
import projectImage from "@/assets/Portafoli_Web.png"; // Ajusta el nombre del archivo

export default {
  name: "ProjectsCom",
  data() {
    return {
      projects: [
        {
          id: 1,
          name: "Portafolio Digital",
          description: "Un portafolio personal para mostrar mis proyectos.",
          technologies: "Vue.js, CSS, HTML",
          libraries: "Bootstrap",
          tools: "VS Code, Github, Github Desktop",
          framework: "Vue.js",
          link: "https://github.com/Portafolio-Digital",
          // Opción 1: Usa la imagen importada
          image: projectImage,
          // Opción 2: Usa el nombre del archivo (asegúrate de que coincida exactamente)
          // image: "portafolio-digital.png",
        },
      ],
    };
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
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-title {
  color: #0f110e;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-text {
  color: #0f110e;
  margin-bottom: 15px;
}

.project-details {
  margin-bottom: 20px;
}

.project-details p {
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
