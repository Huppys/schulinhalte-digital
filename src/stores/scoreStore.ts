import { defineStore, StoreState } from "pinia";
import { computed, ref } from "vue";

const rawScoreStore = {
  score: 0,
  failures: 0,
  retryUsed: false,
};

export const useScoreStore = defineStore("scoreStore", () => {
  const state = ref(Object.assign({}, rawScoreStore));

  const score = computed(() => state.value.score);

  function plusOne() {
    state.value.score++;
  }

  function reset() {
    state.value = Object.assign({}, rawScoreStore);
  }

  function failed() {
    state.value.failures++;
  }

  function retry() {
    state.value.retryUsed = true;
  }

  const retryUsed = computed(() => state.value.retryUsed);

  const failures = computed(() => state.value.failures);

  return {
    plusOne,
    failed,
    score,
    failures,
    reset,
    retryUsed,
    retry,
  };
});
