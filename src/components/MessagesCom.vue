<template>
  <div class="messages-com">
    <h2>Mensajes Recibidos</h2>
    <div v-if="messages.length === 0">No hay mensajes aún.</div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        <p><strong>Mensaje:</strong> {{ message.text }}</p>
        <p><strong>Fecha:</strong> {{ formatDate(message.timestamp) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default {
  name: "MessagesCom",
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return "Fecha desconocida";
      const date = timestamp.toDate();
      return date.toLocaleString();
    },
  },
  mounted() {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      this.messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  },
};
</script>

<style scoped>
.messages-com {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  padding: 10px;
  border: 2px solid #92f83f;
  border-radius: 5px;
}

p {
  margin: 5px 0;
}
</style>
