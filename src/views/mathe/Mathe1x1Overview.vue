<template>
  <div class="d-flex justify-content-center">
    <ul>
      <li
        v-for="lesson in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :key="lesson"
        class="mt-2"
      >
        <router-link :to="'/mathe/1x1/' + lesson"
          >die {{ lesson }}er-Reihe</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup></script>
