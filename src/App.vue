<template>
  <div id="app" class="d-flex">
    <Sidebar />
    <div class="content flex-grow-1">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/SidebarCom.vue";

export default {
  name: "App",
  components: {
    Sidebar,
  },
};
</script>

<style>
.content {
  margin-left: 250px;
  padding: 20px;
  color: #0f110e;
  background-color: #f2ffe5;
}
</style>
