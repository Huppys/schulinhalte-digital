<template>
  <div>
    <ProgressBar :max-amount="maxTodos" :index="index" />

    <div class="d-flex flex-column justify-content-center">
      <h2 class="text-center flex-row">Trage das richtige Ergebnis ein.</h2>

      <div class="d-flex flex-row mt-5 mb-2 justify-content-center">
        <label
          v-if="currentMathTask"
          class="col-4 me-2 col-form-label col-form-label-lg"
          for="result"
          style="text-align: right"
        >
          {{ secondNumber }} {{ arithmeticSymbol }} {{ firstNumber }} =
        </label>

        <div class="d-flex flex-column col-6">
          <input
            class="form-control form-control-lg w-50"
            ref="resultInput"
            type="number"
            name="result"
            v-model="result"
            @keydown.enter="submitResult()"
            required
            autocomplete="off"
            max="1000"
            min="0"
            inputmode="numeric"
            spellcheck="false"
            autofocus
          />

          <span v-if="isRetry" class="text-danger mt-2 ps-2"
            >Das ist leider falsch.<br />Du hast noch einen Versuch.</span
          >
        </div>
      </div>
      <button
        class="align-self-center col-5 mt-4 py-4"
        type="submit"
        @click="submitResult"
      >
        OK
      </button>

      <div
        v-if="showFailuresWarning"
        class="d-flex flex-column justify-content-center align-items-center"
      >
        <h5 class="text-danger m-3 ps-2">
          <strong
            >Tipp nicht irgendwas ein. Du musst schon die Aufgabe lösen!</strong
          >
        </h5>

        <video
          class="w-75"
          autoplay
          loop
          src="/assets/videos/waiting-kid.mp4"
        ></video>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProgressBar from "@/components/quiz/ProgressBar.vue";
import { computed, ComputedRef, onMounted, ref, Ref } from "vue";
import { useScoreStore } from "@/stores/scoreStore";
import { useRouter } from "vue-router";
import { useRoutingStore } from "@/stores/routingStore";

const props = defineProps({
  maxTodos: Number,
  mathTasks: [],
  arithmeticSymbol: String,
  validationMethod: Function,
});

const index: Ref<number> = ref(0);
const currentMathTask: ComputedRef<[number, number]> = computed(
  () => props.mathTasks[index.value]
);

const firstNumber: ComputedRef<number> = computed(() => {
  return currentMathTask.value[0];
});

const secondNumber: ComputedRef<number> = computed(() => {
  return currentMathTask.value[1];
});

const result: Ref = ref();

function resetResultInputField() {
  result.value = null;
}

function getNextCalculation() {
  index.value++;
}

const scoreStore = useScoreStore();

const isRetry: Ref<boolean> = ref(false);

function resetRetry() {
  isRetry.value = false;
}

const router = useRouter();
const routingStore = useRoutingStore();
const resultInput: Ref<HTMLInputElement | null> = ref(null);

onMounted(() => {
  resultInput.value?.focus();
  routingStore.updateCurrentQuizRoute(router.currentRoute.value.path);
});

const showFailuresWarning: ComputedRef<boolean> = computed(
  () => scoreStore.failures - scoreStore.score >= 7
);

function submitResult() {
  if (!result.value) {
    return;
  }

  // if (!result.value.match(/\d+/)) {
  //   result.value = null;
  //   return;
  // }

  const isCorrect =
    props.validationMethod(firstNumber.value, secondNumber.value) ===
    parseInt(result.value);

  if (!isCorrect && showFailuresWarning.value) {
    resetRetry();
    return;
  }

  if (isCorrect) {
    scoreStore.plusOne();
    resetRetry();
    getNextCalculation();
  } else if (!isRetry.value) {
    isRetry.value = true;
    scoreStore.retry();
  } else {
    // divisionStore.addTodo(currentMathTask.value);
    scoreStore.failed();
    resetRetry();
    getNextCalculation();
  }

  resetResultInputField();

  if (index.value >= props.maxTodos) {
    // divisionStore.saveTodosToLocalStorage();
    router.push({ name: "Dein Ergebnis" });
  }

  resultInput.value.focus();
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
