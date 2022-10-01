<template>
   <div>
      <div class="fixed-top progress">
         <div class="progress-bar" role="progressbar" :style="progressWidth" :aria-valuenow="index + 1" aria-valuemin="0" aria-valuemax="9"></div>
      </div>
      <div class="d-flex flex-column justify-content-center">
         <h2 class="text-center">Trage das richtige Ergebnis ein.</h2>
         <h4 class="text-center d-inline my-5">{{ firstFactor }} x {{ secondFactor }} =
            <input class="col-2 form-control-sm" type="text" name="result" v-model="result" @keydown.enter="submitResult()" autocomplete="false" required pattern="[0-9]{1,3}" spellcheck="false" autocorrect="false" autofocus />
         </h4>
      </div>
   </div>
</template>

<script lang="ts" setup>

   // Components
   import { createRange, getRandomFactor, multiply, shuffleNumbers } from '@/components/Mathe/1x1';
   import { computed, reactive, Ref, ref } from 'vue';
   import { useRouter } from 'vue-router';

   const result: Ref = ref();
   const router = useRouter();

   let index: Ref<number> = ref(0);
   const firstFactor = getRandomFactor();
   const secondFactors = shuffleNumbers(createRange(1, 10));
   const secondFactor = computed(() => secondFactors[index.value]);
   const progressWidth = computed(() => `width: ${ secondFactors.length * (index.value) }%;`);


   function submitResult() {

      if (!result.value.match(/\d+/)) {
         result.value = null;
         return;
      }

      if (!result.value) {
         return;
      }

      if ( multiply(firstFactor, secondFactor.value) === parseInt(result.value) ) {
         state.score = state.score + 1;
      }

      index.value++;

      if ( secondFactors.length <= index.value ) {
         console.log("Change route");
         router.push({ name: 'Dein Ergebnis', params: { score: state.score, total: secondFactors.length } });
      }

      result.value = null;
   }

   const state = reactive({
      score: 0
   });

</script>
