import type { Router } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import The1x1Quiz from "../views/mathe/The1x1Quiz.vue";
import MatheIntro from "../views/mathe/MatheIntro.vue";
import Result from "../views/result/TheResult.vue";
import DeutschLesen from "@/views/reading/TheWordImagesQuiz.vue";
import TheIndex from "@/views/index/TheIndex.vue";
import DeutschIntro from "@/views/deutsch/TheDeutschIntro.vue";
import TheDivideQuiz from "@/views/mathe/TheDivideQuiz.vue";
import Mathe1x1Overview from "@/views/mathe/Mathe1x1Overview.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Schule digital",
      component: TheIndex
    },
    {
      path: "/mathe",
      name: "Mathematik",
      component: MatheIntro
    },
    {
      path: "/mathe/1x1/overview",
      name: "Das kleine 1x1",
      component: Mathe1x1Overview
    },
    {
      path: "/mathe/1x1/:lesson",
      // TODO: name should adjust to dynamic parameter
      name: "Die Reihen",
      component: The1x1Quiz
    },
    {
      path: "/mathe/divide",
      name: "Zahlen bis 100 teilen",
      component: TheDivideQuiz
    },
    {
      path: "/result",
      name: "Dein Ergebnis",
      component: Result
    },
    {
      path: "/deutsch",
      name: "Deutsch",
      component: DeutschIntro
    },
    {
      path: "/deutsch/lesen",
      name: "Lesen",
      component: DeutschLesen
    }
  ]
});

export default router;
