import { defineStore } from "pinia";
import { computed, ComputedRef } from "vue";

export const useRoutingStore = defineStore("routingStore", () => {
  let _currentQuizRoute = "";

  const currentQuizRoute: ComputedRef<string> = computed(
    () => _currentQuizRoute
  );

  function updateCurrentQuizRoute(value: string) {
    _currentQuizRoute = value;
  }

  return {
    currentQuizRoute,
    updateCurrentQuizRoute,
  };
});
