<template>
  <form @submit.prevent="sendMessage">
    <input type="text" placeholder="Nombre" v-model="name" required />
    <input type="email" placeholder="Correo" v-model="email" required />
    <textarea placeholder="Mensaje" v-model="message" required></textarea>
    <button type="submit">Enviar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    sendMessage() {
      // Lógica para enviar el mensaje al backend
    },
  },
};
</script>
