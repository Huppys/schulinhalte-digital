<template>
   <div>
      <div class="fixed-top progress">
         <div class="progress-bar" role="progressbar" :style="progressWidth" :aria-valuenow="index + 1" aria-valuemin="0" aria-valuemax="9"></div>
      </div>
      <div class="d-flex flex-column justify-content-center">
         <h2 class="text-center flex-row">Trage das richtige Ergebnis ein.</h2>
         <div class="d-flex flex-row mt-5 mb-2 justify-content-center">
            <label class="col-1 me-2 col-form-label col-form-label-lg" for="result" style="text-align: right;">{{ secondFactor }} x {{ firstFactor }} = </label>
            <div class="d-flex flex-column col-3">
               <input class="form-control form-control-lg" ref="resultInput" type="text" name="result" v-model="result" @keydown.enter="submitResult()" required autocomplete="off" pattern="[0-9]{1,3}" spellcheck="false" autofocus />
               <span v-if="!isCorrectResult" class="text-danger mt-2 ps-2">Das ist leider falsch.<br>Du hast dich bestimmt nur vertippt.</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>

   const resultInput: Ref<HTMLInputElement | null> = ref(null)

   onMounted(() => {
      resultInput.value?.focus();
   });

   // Components
   import { createRange, getRandomFactor, multiply, shuffleNumbers } from '@/components/Mathe/1x1';
   import { computed, onMounted, reactive, Ref, ref } from 'vue';
   import { useRouter } from 'vue-router';

   const result: Ref = ref();
   const router = useRouter();

   const index: Ref<number> = ref(0);
   const firstFactor = getRandomFactor();
   const secondFactors = shuffleNumbers(createRange(1, 10));
   const secondFactor = computed(() => secondFactors[index.value]);
   const progressWidth = computed(() => `width: ${ secondFactors.length * (index.value) }%;`);

   const isCorrectResult = ref(true);


   function submitResult() {

      if ( !result.value.match(/\d+/) ) {
         result.value = null;
         return;
      }

      if ( !result.value ) {
         return;
      }

      if ( multiply(firstFactor, secondFactor.value) === parseInt(result.value) ) {
         state.score = state.score + 1;
         isCorrectResult.value = true;

      } else {
         isCorrectResult.value = false;
         return;
      }

      index.value++;

      if ( secondFactors.length <= index.value ) {
         console.log('Change route');
         router.push({ name: 'Dein Ergebnis'});
      }

      result.value = null;
   }

   const state = reactive({
      score: 0
   });

</script>
