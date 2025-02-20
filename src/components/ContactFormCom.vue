<template>
  <div class="contact-form-com">
    <h2>Mandame un Mensaje</h2>
    <textarea
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
      <div class="contact-item">
        <img src="@/assets/Telefono.png" alt="Teléfono" class="icon" />
        <span>Teléfono: +51 9364516267</span>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default {
  name: "ContactFormCom",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async sendMessage() {
      if (this.message.trim()) {
        try {
          await addDoc(collection(db, "messages"), {
            text: this.message,
            timestamp: serverTimestamp(),
          });
          alert("Mensaje enviado correctamente.");
          this.message = ""; // Limpiar el mensaje después de enviarlo
        } catch (error) {
          console.error("Error al enviar el mensaje: ", error);
          alert("Hubo un error al enviar el mensaje.");
        }
      } else {
        alert("Por favor, escribe un mensaje antes de enviarlo.");
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
  padding: 34px;
}

h2 {
  font-size: 35px;
  margin-bottom: 30px;
}

textarea {
  width: 70%;
  height: 500px;
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
</style>
