<template>
   <div class="d-flex justify-content-center flex-column">
      <h3 class="text-center mb-4">Super! Du hast alle richtig gelöst!</h3>
      <img crossorigin="anonymous" class="w-50 m-auto mb-4" :src="randomCatGif" alt="More cats!">
      <div class="d-flex justify-content-center">
         <button class="btn btn-primary" type="button" @click="newRound">Noch eine Runde!</button>
      </div>
   </div>
</template>
<script lang="ts" setup>
   import { computed } from 'vue';
   import { useRouter } from 'vue-router';
   import catGif000 from '../../assets/000-jumping-cats.gif';
   import catGif001 from '../../assets/001-turntable-cats.gif';
   import catGif002 from '../../assets/002-mob-cats.gif';
   import catGif003 from '../../assets/003-relaxed-cats.gif';
   import catGif004 from '../../assets/004-bro-cats.gif';
   import catGif005 from '../../assets/005-looking-cats.gif';
   import catGif006 from '../../assets/006-waving-cats.gif';
   import catGif007 from '../../assets/007-tapping-cats.gif';
   import catGif008 from '../../assets/008-intellectual-cats.gif';
   import catGif009 from '../../assets/009-quak-cats.gif';
   import catGif010 from '../../assets/010-surprise-cats.gif';
   import catGif011 from '../../assets/011-ninja-cats.gif';

   const router = useRouter();

   const randomCatGif = computed(() => {

      const catGifs = [
         catGif000,
         catGif001,
         catGif002,
         catGif003,
         catGif004,
         catGif005,
         catGif006,
         catGif007,
         catGif008,
         catGif009,
         catGif010,
         catGif011,
      ];

      const selectIndex = Math.floor(Math.random() * catGifs.length);

      return catGifs[selectIndex];
   });

   function newRound() {
      router.push({ path: '/mathe/1x1' });
   }
</script>
<style lang="scss">
   @import "bootstrap/scss/functions";
   @import "bootstrap/scss/variables";
   @import "bootstrap/scss/maps";
   @import "bootstrap/scss/mixins";

   img {
      @include media-breakpoint-up(lg) {
         max-height: 600px;
      }
      object-fit: contain;
   }
</style>