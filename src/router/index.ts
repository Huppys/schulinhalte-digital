import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';
import Mathe1x1 from '../views/Mathe1x1.vue';
import MatheIntro from '../views/MatheIntro.vue';
import MatheResult from '../views/MatheResult.vue';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/mathe'
    },
    {
      path: '/mathe',
      name: 'Mathematik',
      component: MatheIntro,
    },
    {
      path: '/mathe/1x1',
      component: Mathe1x1,
      name: 'Das kleine 1x1'
    },
    {
      path: '/mathe/result',
      name: 'Dein Ergebnis',
      component: MatheResult
    }
  ],
});

export default router;
