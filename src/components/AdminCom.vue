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
              class="btn btn-primary mb-2"
            >
              Ver proyecto
            </a>

            <!-- Botón para eliminar el proyecto -->
            <button class="btn btn-danger" @click="deleteProject(project.id)">
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
            <!-- Imagen pequeña -->
            <img
              :src="project.image"
              alt="Vista previa"
              class="preview-image"
              @click="showImageModal(project.image)"
            />
          </div>

          <!-- Modal para mostrar la imagen en grande -->
          <div v-if="showImage" class="image-modal" @click="closeImageModal">
            <img
              :src="currentImage"
              alt="Imagen ampliada"
              class="modal-image"
            />
          </div>
          <div class="form-group">
            <label for="status">Estado:</label>
            <select id="status" v-model="project.status">
              <option value="" disabled>Selecciona un estado</option>
              <option value="Una Idea">Una Idea</option>
              <option value="En Desarrollo">En Desarrollo</option>
              <option value="Completado">Completado</option>
            </select>
          </div>
          <div class="form-group">
            <label for="tools">Herramientas:</label>
            <select id="tools" @change="addTool($event.target.value)">
              <option value="" disabled selected>
                Selecciona una herramienta
              </option>
              <option value="MySQL">MySQL</option>
              <option value="GitHub">GitHub</option>
              <option value="Postman">Postman</option>
              <option value="GitHub Desktop">GitHub Desktop</option>
              <option value="Visual Studio Code">Visual Studio Code</option>
              <option value="Docker">Docker</option>
              <option value="Krita">Krita</option>
            </select>
            <div class="tags-container">
              <span
                v-for="(tool, index) in project.tools"
                :key="index"
                class="tag"
              >
                {{ tool }}
                <button type="button" @click="removeTool(index)">x</button>
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="languages">Lenguajes:</label>
            <select id="languages" @change="addLanguage($event.target.value)">
              <option value="" disabled selected>Selecciona un lenguaje</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="HTML5">HTML5</option>
              <option value="JavaScript">JavaScript</option>
              <option value="CSS3">CSS3</option>
            </select>
            <div class="tags-container">
              <span
                v-for="(language, index) in project.languages"
                :key="index"
                class="tag"
              >
                {{ language }}
                <button type="button" @click="removeLanguage(index)">x</button>
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="libraries">Bibliotecas:</label>
            <select id="libraries" @change="addLibrary($event.target.value)">
              <option value="" disabled selected>
                Selecciona una biblioteca
              </option>
              <option value="Pandas">Pandas</option>
              <option value="NumPy">NumPy</option>
              <option value="Matplotlib">Matplotlib</option>
            </select>
            <div class="tags-container">
              <span
                v-for="(library, index) in project.libraries"
                :key="index"
                class="tag"
              >
                {{ library }}
                <button type="button" @click="removeLibrary(index)">x</button>
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="frameworks">Frameworks:</label>
            <select id="frameworks" @change="addFramework($event.target.value)">
              <option value="" disabled selected>
                Selecciona un framework
              </option>
              <option value="FastAPI">FastAPI</option>
              <option value="Bootstrap">Bootstrap</option>
              <option value="Spring Boot">Spring Boot</option>
              <option value="React.js">React.js</option>
              <option value="Vue.js">Vue.js</option>
              <option value="Angular">Angular</option>
            </select>
            <div class="tags-container">
              <span
                v-for="(framework, index) in project.frameworks"
                :key="index"
                class="tag"
              >
                {{ framework }}
                <button type="button" @click="removeFramework(index)">x</button>
              </span>
            </div>
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
        <li v-for="message in visibleMessages" :key="message.id">
          <p><strong>Mensaje:</strong> {{ message.text }}</p>
          <p><strong>Fecha:</strong> {{ formatDate(message.created_at) }}</p>
        </li>
      </ul>
      <button
        v-if="messages.length > messageLimit"
        @click="loadMoreMessages"
        class="btn btn-secondary"
      >
        Cargar más mensajes
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      projects: [], // Lista de proyectos
      messages: [], // Lista de mensajes
      showForm: false, // Mostrar u ocultar el formulario
      isEditing: false, // Determina si se está editando un proyecto
      project: {
        id: null,
        title: "",
        description: "",
        image: null,
        status: "",
        tools: [], // Lista de herramientas seleccionadas
        languages: [], // Lista de lenguajes seleccionados
        libraries: [], // Lista de bibliotecas seleccionadas
        frameworks: [], // Lista de frameworks seleccionados
        link: "",
      },
      uploading: false, // Indica si se está subiendo una imagen
      messageLimit: 5, // Límite de mensajes visibles
      showImage: false, // Mostrar modal de imagen
      currentImage: null, // Imagen actual en el modal
    };
  },
  methods: {
    // Obtener proyectos desde el backend
    async fetchProjects() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/projects`
        );
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

    // Guardar un nuevo proyecto en la base de datos
    async saveProject() {
      if (!this.validateForm()) return;

      console.log("Datos enviados al backend:", this.project);

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/projects`,
          this.project
        );
        const newProject = { ...this.project, id: response.data.projectId };
        this.projects.push(newProject);
        alert("Proyecto guardado con éxito.");
        this.cancelForm();
      } catch (error) {
        console.error("Error al guardar el proyecto:", error);
        alert("Hubo un error al guardar el proyecto.");
      }
    },

    // Obtener mensajes desde la base de datos
    async fetchMessages() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/api/messages`
        );
        console.log("Mensajes obtenidos del backend:", response.data); // Verificar los datos obtenidos
        this.messages = response.data;
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        alert("Hubo un error al cargar los mensajes.");
      }
    },

    // Mostrar el formulario para crear un nuevo proyecto
    showCreateForm() {
      this.resetForm();
      this.showForm = true;
      this.isEditing = false;
    },

    // Cargar datos de un proyecto para editarlo
    editProject(project) {
      this.project = { ...project };
      this.showForm = true;
      this.isEditing = true;
    },

    // Eliminar un proyecto
    async deleteProject(id) {
      if (!confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
        return;
      }

      try {
        await axios.delete(
          `${process.env.VUE_APP_BACKEND_URL}/api/projects/${id}`
        );
        // Eliminar el proyecto de la lista local
        this.projects = this.projects.filter((project) => project.id !== id);
        alert("Proyecto eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
        alert("Hubo un error al eliminar el proyecto.");
      }
    },

    // Actualizar un proyecto existente
    updateProject() {
      if (!this.validateForm()) return;
      const index = this.projects.findIndex((p) => p.id === this.project.id);
      if (index !== -1) {
        this.projects.splice(index, 1, { ...this.project });
        alert("Proyecto actualizado con éxito.");
        this.cancelForm();
      }
    },

    // Cancelar el formulario
    cancelForm() {
      this.resetForm();
      this.showForm = false;
    },

    // Subir imagen
    uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.uploading = true;

      // Simular subida de imagen
      setTimeout(() => {
        this.project.image = URL.createObjectURL(file);
        this.uploading = false;
        alert("Imagen subida con éxito.");
      }, 2000);
    },

    // Mostrar modal de imagen
    showImageModal(image) {
      this.currentImage = image;
      this.showImage = true;
    },

    // Cerrar modal de imagen
    closeImageModal() {
      this.showImage = false;
      this.currentImage = null;
    },

    // Validar el formulario
    validateForm() {
      if (!this.project.title.trim() || !this.project.description.trim()) {
        alert("El título y la descripción son obligatorios.");
        return false;
      }
      if (!this.project.status) {
        alert("Por favor selecciona un estado para el proyecto.");
        return false;
      }
      return true;
    },

    // Restablecer el formulario
    resetForm() {
      this.project = {
        id: null,
        title: "",
        description: "",
        image: null,
        status: "",
        tools: [], // Lista dinámica de herramientas
        languages: [], // Lista dinámica de lenguajes
        libraries: [], // Lista dinámica de bibliotecas
        frameworks: [], // Lista dinámica de frameworks
        link: "",
      };
    },

    // Formatear fecha de los mensajes
    formatDate(timestamp) {
      if (!timestamp) return "Fecha no disponible"; // Manejar casos donde no haya fecha
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "Fecha no disponible"; // Manejar fechas inválidas
      return date.toLocaleString(); // Formatear la fecha en formato local
    },

    // Cargar más mensajes
    loadMoreMessages() {
      this.messageLimit += 5;
    },

    // Agregar herramienta
    addTool(tool) {
      if (tool && !this.project.tools.includes(tool)) {
        this.project.tools.push(tool);
      }
    },

    // Eliminar herramienta
    removeTool(index) {
      this.project.tools.splice(index, 1);
    },

    // Agregar lenguaje
    addLanguage(language) {
      if (language && !this.project.languages.includes(language)) {
        this.project.languages.push(language);
      }
    },

    // Eliminar lenguaje
    removeLanguage(index) {
      this.project.languages.splice(index, 1);
    },

    // Agregar biblioteca
    addLibrary(library) {
      if (library && !this.project.libraries.includes(library)) {
        this.project.libraries.push(library);
      }
    },

    // Eliminar biblioteca
    removeLibrary(index) {
      this.project.libraries.splice(index, 1);
    },

    // Agregar framework
    addFramework(framework) {
      if (framework && !this.project.frameworks.includes(framework)) {
        this.project.frameworks.push(framework);
      }
    },

    // Eliminar framework
    removeFramework(index) {
      this.project.frameworks.splice(index, 1);
    },
  },
  computed: {
    // Mensajes visibles según el límite
    visibleMessages() {
      return this.messages.slice(0, this.messageLimit);
    },
  },
  async mounted() {
    // Cargar proyectos y mensajes al montar el componente
    await this.fetchProjects();
    await this.fetchMessages();
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

/* Imagen pequeña */
.preview-image {
  width: 100px; /* Tamaño pequeño */
  height: auto;
  cursor: pointer;
  border: 2px solid #7ec445;
  border-radius: 5px;
  transition: transform 0.2s ease-in-out;
}

.preview-image:hover {
  transform: scale(1.1); /* Efecto de zoom al pasar el mouse */
}

/* Modal para la imagen ampliada */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

/* Estilo para el select */
.project-form select {
  width: 100%;
  padding: 10px;
  border: 1px solid #b0eb7f;
  border-radius: 5px;
  font-size: 14px;
  color: #0f110e;
  background-color: #ffffff;
}

.project-form select:focus {
  outline: none;
  border-color: #7ec445;
  box-shadow: 0 0 5px rgba(126, 196, 69, 0.5);
}

/* Estilo para los select múltiples */
.project-form select[multiple] {
  width: 100%;
  height: auto;
  min-height: 100px; /* Altura mínima para mostrar varias opciones */
  padding: 10px;
  border: 1px solid #b0eb7f;
  border-radius: 5px;
  font-size: 14px;
  color: #0f110e;
  background-color: #ffffff;
  resize: vertical; /* Permitir redimensionar verticalmente */
}

.project-form select[multiple]:focus {
  outline: none;
  border-color: #7ec445;
  box-shadow: 0 0 5px rgba(126, 196, 69, 0.5);
}

.dynamic-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.dynamic-item input {
  flex: 1;
  padding: 10px;
  border: 1px solid #b0eb7f;
  border-radius: 5px;
  font-size: 14px;
  color: #0f110e;
  background-color: #ffffff;
}

.dynamic-item button {
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dynamic-item .btn-danger {
  background-color: #ff4d4d;
  color: #ffffff;
}

.dynamic-item .btn-danger:hover {
  background-color: #ff1a1a;
}

.dynamic-item .btn-primary {
  background-color: #7ec445;
  color: #ffffff;
}

.dynamic-item .btn-primary:hover {
  background-color: #92f83f;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.tag {
  display: flex;
  align-items: center;
  background-color: #7ec445;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
}

.tag button {
  background: none;
  border: none;
  color: #ffffff;
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;
}

.tag button:hover {
  color: #ff4d4d;
}

.btn-danger {
  background-color: #ff4d4d;
  border: none;
  padding: 8px 16px;
  width: 100%;
  color: #ffffff;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #ff1a1a;
}

.admin-com {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.project-list,
.messages-list {
  flex: 1;
  width: 100%;
}

@media (max-width: 768px) {
  .project-list,
  .messages-list {
    width: 100%;
  }
}
</style>
