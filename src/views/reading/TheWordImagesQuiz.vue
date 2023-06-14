<template>
  <div>
    <div class="fixed-top progress">
      <div class="progress-bar" role="progressbar" :style="progressWidth" :aria-valuenow="index + 1" aria-valuemin="0" aria-valuemax="9"></div>
    </div>
    <div class="d-flex flex-column justify-content-center">
      <h2 class="text-center flex-row">Welches Bild gehört zu diesem Wort?</h2>
      <div class="d-flex flex-row mt-5 mb-2 justify-content-center">
        <label class="col-3 col-lg-2 me-2 col-form-label col-form-label-lg" for="result" style="text-align: right;">{{ readableWord }}</label>
        <div class="d-flex flex-column col-3 col-lg-1 lesen-bilder">
          <button type="button">
            <img :src="firstImage">
            <img :src="secondImage">
          </button>
          <span v-if="isRetry" class="text-danger mt-2 ps-2">Das ist leider falsch.<br>Du hast noch einen Versuch.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import {useMultiplyCalculationStore} from '@/stores/multiplyCalculation';
import {computed, ComputedRef, onMounted, reactive, Ref, ref} from 'vue';
import {useRouter} from 'vue-router';
import {WordImageQuiz, WordImagesQuizHelper} from '@/components/reading/wordImagesQuizHelper';
import {useReadingWordImagesQuizStore} from "@/stores/wordImagesQuiz";


onMounted(() => {
  resultInput.value?.focus();
});

const router = useRouter();
const multiplyStore = useMultiplyCalculationStore();
const wordImagesQuizStore = useReadingWordImagesQuizStore();

const wordImagesQuizHelper = new WordImagesQuizHelper();
const maxTodos = 10;

const resultInput: Ref<HTMLInputElement | null> = ref(null)
const result: Ref = ref();
const isRetry: Ref<boolean> = ref(false);



const index: Ref<number> = ref(0);
const wordImageQuiz: Array<WordImageQuiz> = wordImagesQuizHelper.getQuizes();

const currentQuiz: ComputedRef<WordImageQuiz> = computed(() => wordImageQuiz[index.value]);
const firstImage: ComputedRef<string> = computed(() => {
  return currentQuiz.value.image1;
});
const secondImage: ComputedRef<string> = computed(() => {
  return currentQuiz.value.image2;
});

const progressWidth = computed(() => `width: ${maxTodos * (index.value)}%;`);


function resetRetry() {
  isRetry.value = false;
}

function resetResultInputField() {
  result.value = null;
}

function getNextCalculation() {
  index.value++;
}

function readableWord() {
  return wordImageQuiz[0];
}


function submitResult() {

  if (!result.value) {
    return;
  }

  if (!result.value.match(/\d+/)) {
    result.value = null;
    return;
  }

  if (mathe1x1Helper.multiply(firstFactor.value, secondFactor.value) === parseInt(result.value)) {
    state.score = state.score + 1;
    resetRetry();
    getNextCalculation();
  } else if (!isRetry.value) {
    isRetry.value = true;
  } else {
    multiplyStore.addTodo(currentFactor.value);
    resetRetry();
    getNextCalculation();
  }

  resetResultInputField();

  if (index.value >= maxTodos) {
    multiplyStore.saveTodosToLocalStorage();
    router.push({name: 'Dein Ergebnis'});
  }
}

const state = reactive({
  score: 0
});
</script>

<style scoped lang="scss">
  .lesen-bilder img {
    max-height: 200px;
  }
</style>