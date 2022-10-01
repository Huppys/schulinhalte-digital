<template>
   <div class="d-flex justify-content-center flex-column">
      <h3 class="text-center mb-4">Geschafft! Du hast {{ score }} von {{ total }} richtig gelöst!</h3>
      <img crossorigin="anonymous" class="w-50 m-auto mb-4" :src="randomCatGif" alt="More cats!">
      <div class="d-flex justify-content-center">
         <button class="btn btn-primary" type="button" @click="newRound()">Noch eine Runde!</button>
      </div>
   </div>
</template>
<script lang="ts" setup>
   import { computed } from 'vue';
   import { useRoute, useRouter } from 'vue-router';

   const route = useRoute();
   const score = route.params.score;
   const total = route.params.total;

   const router = useRouter();

   const randomCatGif = computed(() => {

      const catGifs = [
         '/assets/000-jumping-cats.gif',
         '/assets/001-turntable-cats.gif',
         '/assets/002-mob-cats.gif',
         '/assets/003-relaxed-cats.gif',
         '/assets/004-bro-cats.gif',
         '/assets/005-looking-cats.gif',
         '/assets/006-waving-cats.gif',
         '/assets/007-tapping-cats.gif',
         '/assets/008-intellectual-cats.gif',
         '/assets/009-quak-cats.gif',
         '/assets/010-surprise-cats.gif',
         '/assets/011-ninja-cats.gif',
      ];

      const selectIndex = Math.floor(Math.random() * catGifs.length);

      return catGifs[selectIndex];
   });

   function newRound() {
      router.push({ path: '/mathe/1x1' });
   }
</script>