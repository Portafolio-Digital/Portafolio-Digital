<template>
  <div class="container mt-5">
    <h2>Proyectos</h2>
    <div class="row mt-4">
      <div class="col-md-4" v-for="project in projects" :key="project.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectsCom",
  data() {
    return {
      projects: [
        {
          id: 1,
          name: "Proyecto 1",
          description: "Descripción del proyecto 1",
        },
        {
          id: 2,
          name: "Proyecto 2",
          description: "Descripción del proyecto 2",
        },
        {
          id: 3,
          name: "Proyecto 3",
          description: "Descripción del proyecto 3",
        },
      ],
    };
  },
};
</script>
