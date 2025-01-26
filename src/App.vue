<template>
  <div id="app" class="d-flex">
    <SidebarCom />
    <div class="content flex-grow-1">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarCom from "./components/SidebarCom.vue";

export default {
  name: "App",
  components: {
    SidebarCom,
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 250px;
  color: #0f110e;
  background-color: #f2ffe5;
}
</style>
