import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';
import Mathe1x1 from '../views/mathe/The1x1Quiz.vue';
import MatheIntro from '../views/mathe/MatheIntro.vue';
import Result from '../views/result/TheResult.vue';
import DeutschLesen from "@/views/reading/TheWordImagesQuiz.vue";
import TheIndex from "@/views/index/TheIndex.vue";
import DeutschIntro from "@/views/deutsch/TheDeutschIntro.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Schule digital',
      component: TheIndex
    },
    {
      path: '/mathe',
      name: 'Mathematik',
      component: MatheIntro
    },
    {
      path: '/mathe/1x1',
      name: 'Das kleine 1x1',
      component: Mathe1x1
    },
    {
      path: '/result',
      name: 'Dein Ergebnis',
      component: Result
    },
    {
      path: '/deutsch',
      name: 'Deutsch',
      component: DeutschIntro
    },
    {
      path: '/deutsch/lesen',
      name: 'Lesen',
      component: DeutschLesen
    }
  ]
});

export default router;
