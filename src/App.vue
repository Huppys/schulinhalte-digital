<template>
   <div class="d-flex justify-content-center flex-column mt-4">
      <header class="my-3">
         <h1 class="text-center">{{ title }}</h1>
      </header>
      <div class="container">
         <router-view />
      </div>
   </div>
</template>

<script lang="ts" setup>
   import { computed } from 'vue';
   import { useRoute } from 'vue-router';

   const route = useRoute();

   const title = computed(() => route.name)
</script>
<style lang="scss">
   @import "bootstrap/scss/bootstrap";
</style>