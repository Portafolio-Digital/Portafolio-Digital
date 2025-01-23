import { createRouter, createWebHistory } from "vue-router";
import PersonalInfo from "../components/PersonalInfoCom.vue";
import Skills from "../components/SkillsCom.vue";
import Projects from "../components/ProjectsCom.vue";
import ContactForm from "../components/ContactFormCom.vue";

const routes = [
  { path: "/", component: PersonalInfo },
  { path: "/skills", component: Skills },
  { path: "/projects", component: Projects },
  { path: "/contact", component: ContactForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
