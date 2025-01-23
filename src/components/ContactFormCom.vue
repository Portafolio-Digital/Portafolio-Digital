<template>
  <div class="container mt-5">
    <h2>Contacto</h2>
    <form @submit.prevent="sendMessage">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" id="name" class="form-control" v-model="name" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input type="email" id="email" class="form-control" v-model="email" />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea
          id="message"
          class="form-control"
          v-model="message"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-success">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactFormCom",
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    sendMessage() {
      alert(`Mensaje enviado por ${this.name}`);
    },
  },
};
</script>
