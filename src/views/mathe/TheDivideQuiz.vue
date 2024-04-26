<template>
  <MathQuiz
    :max-todos="maxTodos" :math-tasks="mathTasks" :arithmetic-symbol="arithmeticSymbol" :validation-method="mathe1x1Helper.divide" />
</template>

<script lang="ts" setup>
import { Mathe1x1Helper } from "@/components/math/Mathe1x1Helper";
import { useDivisionCalculationStore } from "@/stores/divisionCalculation";
import MathQuiz from "@/components/quiz/MathQuiz.vue";

const arithmeticSymbol = "÷";
const maxTodos = 10;

const mathe1x1Helper = new Mathe1x1Helper();
const mathTasks: Array<[number, number]> = mathe1x1Helper.getShuffledDividends(maxTodos);

const divisionStore = useDivisionCalculationStore();
</script>