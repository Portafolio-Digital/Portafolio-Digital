<template>
  <div class="contact-form-com">
    <h2>Mandame un Mensaje</h2>
    <label for="message">Escribe tu mensaje:</label>
    <textarea
      id="message"
      v-model="message"
      placeholder="Escribe y luego presiona enter para enviar y si quieres poner en una línea separada presiona shift enter"
      @keydown.enter.prevent.exact="sendMessage"
      @keydown.shift.enter.stop
    ></textarea>
    <div class="contact-info">
      <div class="contact-item">
        <img src="@/assets/Correo.png" alt="Correo" class="icon" />
        <span>Correo: tonacho904@gmail.com</span>
      </div>
      <div class="contact-item">
        <img src="@/assets/GitHub.png" alt="GitHub" class="icon" />
        <span>
          GitHub:
          <a
            href="https://github.com/Medina-Tirado-Diego-Jesus"
            target="_blank"
          >
            https://github.com/Medina-Tirado-Diego-Jesus
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "", // Variable para almacenar el mensaje
    };
  },
  methods: {
    async sendMessage() {
      if (this.message.trim() === "") {
        alert("El mensaje no puede estar vacío."); // Validación del formulario
        return;
      }

      try {
        // Enviar el mensaje al backend
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/api/messages`, // Usar la variable de entorno
          {
            message: this.message,
          }
        );

        alert(response.data.message); // Mostrar mensaje de éxito
        this.message = ""; // Limpiar el campo después de enviar
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
      }
    },
  },
};
</script>

<style scoped>
.contact-form-com {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h2 {
  font-size: 35px;
  margin-bottom: 30px;
}

label {
  font-size: 20px;
  margin-bottom: 10px;
}

textarea {
  width: 100%;
  height: 200px;
  border: 10px solid #92f83f;
  border-radius: 10px;
  padding: 20px;
  font-size: 25px;
  background-color: #eaffd4;
  margin-bottom: 80px;
  resize: none;
}

textarea:focus {
  outline: none;
  border-color: #92f83f;
}

.contact-info {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 25px;
}

.icon {
  width: 55px;
  height: 55px;
}

@media (max-width: 768px) {
  textarea {
    height: 150px;
  }
}
</style>
