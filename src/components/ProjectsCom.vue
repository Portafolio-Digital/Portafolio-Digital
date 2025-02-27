<template>
  <div class="projects-container container mt-5">
    <h2 class="text-center mb-4">Proyectos</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="project in projects" :key="project.id">
        <div class="card project-card">
          <!-- Imagen del proyecto -->
          <img :src="project.image" class="card-img-top" :alt="project.name" />

          <div class="card-body">
            <!-- Nombre del proyecto -->
            <h5 class="card-title">{{ project.name }}</h5>

            <!-- Descripción corta -->
            <p class="card-text">{{ project.description }}</p>

            <!-- Estado del proyecto -->
            <p><strong>Estado:</strong> {{ project.status }}</p>

            <!-- Herramientas -->
            <p><strong>Herramientas:</strong> {{ project.tools }}</p>

            <!-- Lenguajes -->
            <p><strong>Lenguajes:</strong> {{ project.languages }}</p>

            <!-- Bibliotecas -->
            <p><strong>Bibliotecas:</strong> {{ project.libraries }}</p>

            <!-- Frameworks -->
            <p><strong>Frameworks:</strong> {{ project.frameworks }}</p>

            <!-- Enlace al proyecto -->
            <a :href="project.link" target="_blank" class="btn btn-primary">
              Ver proyecto
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default {
  name: "ProjectsCom",
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    // Leer proyectos desde Firestore en tiempo real
    const q = query(collection(db, "projects"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      this.projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
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
