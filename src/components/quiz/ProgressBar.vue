<template>
  <div class="fixed-top progress">
    <div
      class="progress-bar"
      role="progressbar"
      :style="progressWidth"
      :aria-valuenow="index + 1"
      aria-valuemin="0"
      aria-valuemax="9"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  maxAmount: Number,
  index: Number,
});

const progressWidth = computed(
  () => `width: ${props.maxAmount * props.index}%;`
);
</script>
