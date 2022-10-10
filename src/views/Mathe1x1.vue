<template>
   <div>
      <div class="fixed-top progress">
         <div class="progress-bar" role="progressbar" :style="progressWidth" :aria-valuenow="index + 1" aria-valuemin="0" aria-valuemax="9"></div>
      </div>
      <div class="d-flex flex-column justify-content-center">
         <h2 class="text-center flex-row">Trage das richtige Ergebnis ein.</h2>
         <div class="d-flex flex-row mt-5 mb-2 justify-content-center">
            <label v-if="currentFactor" class="col-3 col-lg-2 me-2 col-form-label col-form-label-lg" for="result" style="text-align: right;">{{ secondFactor }} x {{ firstFactor }} = </label>
            <div class="d-flex flex-column col-3 col-lg-1">
               <input class="form-control form-control-lg" ref="resultInput" type="text" name="result" v-model="result" @keydown.enter="submitResult()" required autocomplete="off" pattern="[0-9]{1,3}" spellcheck="false" autofocus />
               <span v-if="isRetry" class="text-danger mt-2 ps-2">Das ist leider falsch.<br>Du hast noch einen Versuch.</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>

   // Components
   import { useMultiplyCalculationStore } from '@/stores/multiplyCalculation';
   import { computed, ComputedRef, onMounted, reactive, Ref, ref } from 'vue';
   import { useRouter } from 'vue-router';
   import { Mathe1x1Helper } from '@/components/Mathe/1x1';


   onMounted(() => {
      resultInput.value?.focus();
   });

   const router = useRouter();
   const multiplyStore = useMultiplyCalculationStore();

   const mathe1x1Helper = new Mathe1x1Helper();
   const maxTodos = 10;

   const resultInput: Ref<HTMLInputElement | null> = ref(null)
   const result: Ref = ref();
   const isRetry: Ref<boolean> = ref(false);

   const index: Ref<number> = ref(0);
   const factors: Array<[number, number]> = mathe1x1Helper.getFactors(maxTodos);
   const currentFactor: ComputedRef<[number, number]> = computed(() => factors[index.value]);
   const firstFactor: ComputedRef<number> = computed(() => {
      return currentFactor.value[0];
   });
   const secondFactor: ComputedRef<number> = computed(() => {
      return currentFactor.value[1];
   });

   const progressWidth = computed(() => `width: ${ maxTodos * (index.value) }%;`);


   function resetRetry() {
      isRetry.value = false;
   }

   function resetResultInputField() {
      result.value = null;
   }

   function getNextCalculation() {
      index.value++;
   }

   function submitResult() {

      if ( !result.value ) {
         return;
      }

      if ( !result.value.match(/\d+/) ) {
         result.value = null;
         return;
      }

      if ( mathe1x1Helper.multiply(firstFactor.value, secondFactor.value) === parseInt(result.value) ) {
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

      if ( index.value >= maxTodos ) {
         multiplyStore.saveTodosToLocalStorage();
         router.push({ name: 'Dein Ergebnis'});
      }
   }

   const state = reactive({
      score: 0
   });

</script>
