import { createRouter, createWebHistory } from "vue-router";
import PersonalInfo from "../components/PersonalInfoCom.vue";
import Skills from "../components/SkillsCom.vue";
import Projects from "../components/ProjectsCom.vue";
import ContactForm from "../components/ContactFormCom.vue";
import Messages from "../components/AdminCom.vue";

const routes = [
  { path: "/", component: PersonalInfo },
  { path: "/skills", component: Skills },
  { path: "/projects", component: Projects },
  { path: "/contact", component: ContactForm },
  {
    path: "/admin",
    name: "Admin",
    component: Messages,
    beforeEnter: (to, from, next) => {
      const secretKey = "22062002"; // Cambia esto por tu clave secreta
      if (to.query.key === secretKey) {
        next(); // Permitir acceso si la clave es correcta
      } else {
        alert("Acceso denegado. Clave incorrecta.");
        next(false); // Bloquear acceso
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
