<template>
  <div class="skills-container container mt-5">
    <h2 class="text-center mb-4">Conocimientos</h2>
    <div class="row">
      <!-- Educación -->
      <div class="col-md-12 mb-4">
        <h4>Educación</h4>
        <p>
          <strong>Universidad:</strong> Universidad Privada Antenor Orrego -
          Trujillo
        </p>
        <p><strong>Ubicación:</strong> La Libertad, Perú</p>
        <p><strong>Carrera:</strong> Ingeniería de Computación y Sistemas</p>
        <p><strong>Ciclo:</strong> 7° ciclo (actualmente)</p>
      </div>

      <!-- Lenguajes -->
      <div class="col-md-6 mb-4">
        <h4>Lenguajes</h4>
        <ul class="static-list">
          <li>Java</li>
          <li>Python</li>
          <li>HTML5</li>
          <li>JavaScript</li>
          <li>CSS3</li>
        </ul>
      </div>

      <!-- Bibliotecas -->
      <div class="col-md-6 mb-4">
        <h4>Bibliotecas</h4>
        <ul class="static-list">
          <li>Pandas</li>
          <li>NumPy</li>
          <li>Matplotlib</li>
        </ul>
      </div>

      <!-- Frameworks -->
      <div class="col-md-6 mb-4">
        <h4>Frameworks</h4>
        <ul class="static-list">
          <li>FastAPI</li>
          <li>Bootstrap</li>
          <li>Spring Boot</li>
          <li>React.js</li>
          <li>Vue.js</li>
          <li>Angular</li>
        </ul>
      </div>

      <!-- Herramientas -->
      <div class="col-md-6 mb-4">
        <h4>Herramientas</h4>
        <ul class="static-list">
          <li>MySQL</li>
          <li>GitHub</li>
          <li>Postman</li>
          <li>GitHub Desktop</li>
          <li>Visual Studio Code</li>
          <li>Docker</li>
          <li>Krita</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkillsCom",
};
</script>

<style scoped>
/* Contenedor principal */
.skills-container {
  flex: 1;
  max-width: 800px; /* Limita el ancho del contenido */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  padding: 20px;
}

/* Título principal */
h2 {
  color: #0f110e; /* Color oscuro */
  font-weight: bold;
}

/* Subtítulos */
h4 {
  color: #0f110e; /* Color gris oscuro */
  margin-bottom: 9px;
}

/* Lista estática */
.static-list {
  list-style-type: none; /* Elimina los puntos de la lista */
  padding: 0; /* Elimina el padding predeterminado */
  margin: 0; /* Elimina el margen predeterminado */
}

.static-list li {
  font-size: 1.1rem;
  color: #0f110e; /* Color gris medio */
  line-height: 1.6;
  padding: 5px 0; /* Espaciado entre elementos */
  border-bottom: 1px solid #92f83f; /* Línea separadora */
}

.static-list li:last-child {
  border-bottom: none; /* Elimina la línea del último elemento */
}
</style>
