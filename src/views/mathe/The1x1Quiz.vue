<template>
  <MathQuiz
    :max-todos="maxTodos"
    :math-tasks="mathTasks"
    :arithmetic-symbol="arithmeticSymbol"
    :validation-method="mathe1x1Helper.multiply"
  />
</template>

<script lang="ts" setup>
// Components
import { Mathe1x1Helper } from "@/components/math/Mathe1x1Helper";
import MathQuiz from "@/components/quiz/MathQuiz.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const route = router.currentRoute;
const lesson = route.value.params.lesson;

const arithmeticSymbol = "x";
const maxTodos = 10;

const mathe1x1Helper = new Mathe1x1Helper();
const mathTasks: Array<[number, number]> = mathe1x1Helper.getShuffledFactors(
  maxTodos,
  lesson
);
</script>
