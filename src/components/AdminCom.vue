<template>
  <div class="admin-com">
    <!-- Columna central: Proyectos -->
    <div class="project-list">
      <h2>Proyectos</h2>
      <button @click="showCreateForm" class="btn btn-primary mb-3">
        Registrar proyecto nuevo
      </button>

      <!-- Mostrar lista de proyectos -->
      <div v-if="!showForm">
        <div v-for="project in projects" :key="project.id" class="project-item">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-actions">
            <button @click="editProject(project)" class="btn btn-warning">
              Editar
            </button>
            <button @click="deleteProject(project.id)" class="btn btn-danger">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <!-- Formulario para crear o editar proyectos -->
      <div v-if="showForm" class="project-form">
        <h3>
          {{ isEditing ? "Editar Proyecto" : "Registrar Proyecto Nuevo" }}
        </h3>
        <form @submit.prevent="isEditing ? updateProject() : saveProject()">
          <div class="form-group">
            <label for="title">Título del Proyecto:</label>
            <input
              type="text"
              id="title"
              v-model="project.title"
              placeholder="Escribe el título del proyecto"
            />
          </div>
          <div class="form-group">
            <label for="description">Descripción:</label>
            <textarea
              id="description"
              v-model="project.description"
              placeholder="Escribe una descripción del proyecto"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="image">Subir Imagen:</label>
            <input type="file" id="image" @change="uploadImage" />
          </div>
          <div v-if="uploading" class="uploading-message">
            <p>Subiendo imagen... Por favor espera.</p>
          </div>
          <div v-if="project.image" class="image-preview">
            <p>Imagen subida correctamente.</p>
            <img
              :src="project.image"
              alt="Vista previa"
              class="preview-image"
            />
          </div>
          <div class="form-group">
            <label for="status">Estado:</label>
            <input
              type="text"
              id="status"
              v-model="project.status"
              placeholder="Estado del proyecto (Ej: En desarrollo, Completado)"
            />
          </div>
          <div class="form-group">
            <label for="tools">Herramientas:</label>
            <input
              type="text"
              id="tools"
              v-model="project.tools"
              placeholder="Herramientas utilizadas"
            />
          </div>
          <div class="form-group">
            <label for="languages">Lenguajes:</label>
            <input
              type="text"
              id="languages"
              v-model="project.languages"
              placeholder="Lenguajes de programación"
            />
          </div>
          <div class="form-group">
            <label for="libraries">Bibliotecas:</label>
            <input
              type="text"
              id="libraries"
              v-model="project.libraries"
              placeholder="Bibliotecas utilizadas"
            />
          </div>
          <div class="form-group">
            <label for="frameworks">Frameworks:</label>
            <input
              type="text"
              id="frameworks"
              v-model="project.frameworks"
              placeholder="Frameworks utilizados"
            />
          </div>
          <div class="form-group">
            <label for="link">Enlace del Proyecto:</label>
            <input
              type="text"
              id="link"
              v-model="project.link"
              placeholder="URL del proyecto o repositorio"
            />
          </div>
          <div class="form-actions">
            <button type="submit" :disabled="uploading" class="btn btn-primary">
              {{ isEditing ? "Actualizar Proyecto" : "Guardar Proyecto" }}
            </button>
            <button @click="cancelForm" type="button" class="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Columna derecha: Lista de mensajes -->
    <div class="messages-list">
      <h2>Mensajes Recibidos</h2>
      <div v-if="messages.length === 0">No hay mensajes aún.</div>
      <ul>
        <li v-for="message in messages" :key="message.id">
          <p><strong>Mensaje:</strong> {{ message.text }}</p>
          <p><strong>Fecha:</strong> {{ formatDate(message.timestamp) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "AdminCom",
  data() {
    return {
      projects: [],
      messages: [],
      project: {
        title: "",
        description: "",
        image: "",
        status: "",
        tools: "",
        languages: "",
        libraries: "",
        frameworks: "",
        link: "",
      },
      showForm: false,
      isEditing: false,
      editingProjectId: null,
      uploading: false,
    };
  },
  methods: {
    async uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.uploading = true;
      const storageRef = ref(storage, `projects/${file.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        this.project.image = downloadURL;
        this.uploading = false;
      } catch (error) {
        console.error("Error al subir la imagen: ", error);
        alert("Hubo un error al subir la imagen.");
        this.uploading = false;
      }
    },
    async saveProject() {
      try {
        await addDoc(collection(db, "projects"), {
          ...this.project,
          timestamp: serverTimestamp(),
        });
        alert("Proyecto guardado correctamente.");
        this.resetForm();
      } catch (error) {
        console.error("Error al guardar el proyecto: ", error);
        alert("Hubo un error al guardar el proyecto.");
      }
    },
    async updateProject() {
      try {
        const projectRef = doc(db, "projects", this.editingProjectId);
        await updateDoc(projectRef, { ...this.project });
        alert("Proyecto actualizado correctamente.");
        this.resetForm();
      } catch (error) {
        console.error("Error al actualizar el proyecto: ", error);
        alert("Hubo un error al actualizar el proyecto.");
      }
    },
    async deleteProject(projectId) {
      try {
        await deleteDoc(doc(db, "projects", projectId));
        alert("Proyecto eliminado correctamente.");
      } catch (error) {
        console.error("Error al eliminar el proyecto: ", error);
        alert("Hubo un error al eliminar el proyecto.");
      }
    },
    editProject(project) {
      this.project = { ...project };
      this.editingProjectId = project.id;
      this.isEditing = true;
      this.showForm = true;
    },
    showCreateForm() {
      this.resetForm();
      this.showForm = true;
    },
    cancelForm() {
      this.resetForm();
    },
    resetForm() {
      this.project = {
        title: "",
        description: "",
        image: "",
        status: "",
        tools: "",
        languages: "",
        libraries: "",
        frameworks: "",
        link: "",
      };
      this.isEditing = false;
      this.editingProjectId = null;
      this.showForm = false;
    },
    formatDate(timestamp) {
      if (!timestamp) return "Fecha desconocida";
      const date = timestamp.toDate();
      return date.toLocaleString();
    },
  },
  mounted() {
    const projectsQuery = query(
      collection(db, "projects"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(projectsQuery, (snapshot) => {
      this.projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

    const messagesQuery = query(
      collection(db, "messages"),
      where("timestamp", "<", serverTimestamp() - 1209600000) // 2 semanas
    );
    onSnapshot(messagesQuery, (snapshot) => {
      this.messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  },
};
</script>

<style scoped>
/* Ajuste del contenedor principal */
.admin-com {
  display: flex;
  height: 100vh;
  padding: 20px;
  background-color: #f2ffe5; /* Fondo general */
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
}

/* Ajuste para la barra lateral */
.project-list {
  flex: 2;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: 200px; /* Espacio para SidebarCom.vue */
}

/* Columna de mensajes */
.messages-list {
  flex: none;
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

/* Estilo del formulario */
.project-form {
  margin-top: 20px;
}

.project-form .form-group {
  margin-bottom: 15px;
}

.project-form label {
  display: block;
  font-size: 14px;
  color: #0f110e;
  margin-bottom: 5px;
}

.project-form input,
.project-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #b0eb7f;
  border-radius: 5px;
  font-size: 14px;
  color: #0f110e;
  background-color: #ffffff;
}

.project-form input:focus,
.project-form textarea:focus {
  outline: none;
  border-color: #7ec445;
  box-shadow: 0 0 5px rgba(126, 196, 69, 0.5);
}

.project-form .form-actions {
  display: flex;
  gap: 10px;
}

.project-form button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.project-form .btn-primary {
  background-color: #7ec445;
  color: #ffffff;
}

.project-form .btn-primary:hover {
  background-color: #92f83f;
}

.project-form .btn-secondary {
  background-color: #b0eb7f;
  color: #0f110e;
}

.project-form .btn-secondary:hover {
  background-color: #92f83f;
}
</style>
