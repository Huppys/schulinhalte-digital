<template>
  <div class="d-flex justify-content-center flex-column">
    <h3 class="text-center mb-4">{{ scoreLabel }}<br /></h3>
    <h4 class="text-center mb-4">
      Du hast {{ scoreStore.score }} von 10 Aufgaben richtig gelöst!
    </h4>
    <img
      v-if="Math.random() > 0.9"
      crossorigin="anonymous"
      class="w-50 m-auto mb-4"
      :src="randomImage"
      alt="More cats!"
    />
    <video
      v-else
      :src="randomVideo"
      class="w-50 m-auto mb-4"
      loop
      autoplay
    ></video>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary" type="button" @click="newRound">
        Noch eine Runde!
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useRoutingStore } from "@/stores/routingStore";
import { useScoreStore } from "@/stores/scoreStore";

const router = useRouter();
const routingStore = useRoutingStore();
const scoreStore = useScoreStore();

const randomImage = computed(() => {
  const images = ["/assets/images/000-bleh-redpanda.jpg"];

  const selectIndex = Math.floor(Math.random() * images.length);

  return images[selectIndex];
});

const scoreLabel = computed(() => {
  switch (scoreStore.score) {
    case 10:
      if (!scoreStore.retryUsed) {
        return "Der blanke Wahnnsinn! Auf Anhieb alle richtig!";
      }
      return "Wow! Du hast alle Fragen richtig beantwortet!";
    case 9:
      return "Das war richtig stark!";
    case 8:
      return "Klasse!";
    case 7:
      return "Voll gut!";
    case 6:
      return "Geschafft!";
    case 5:
      return "Möchtest du noch eine Runde spielen?";
    case 4:
      return "Du hast nicht alle Aufgaben richtig.";
    case 3:
    case 2:
    case 1:
    default:
      return "Wiederhole die Aufgaben nochmal zusammen mit jemanden.";
  }
});

const randomVideo = computed(() => {
  const videos = [
    "/assets/videos/000-jumping-cats.mp4",
    "/assets/videos/001-turntable-cats.mp4",
    "/assets/videos/002-mob-cats.mp4",
    "/assets/videos/003-relaxed-cats.mp4",
    "/assets/videos/004-bro-cats.mp4",
    "/assets/videos/005-looking-cats.mp4",
    "/assets/videos/006-waving-cats.mp4",
    "/assets/videos/007-tapping-cats.mp4",
    "/assets/videos/008-intellectual-cats.mp4",
    "/assets/videos/009-quak-cats.mp4",
    "/assets/videos/010-surprise-cats.mp4",
    "/assets/videos/011-ninja-cats.mp4",
    "/assets/videos/012-munching-hamster.mp4",
    "/assets/videos/012-running-hamster.mp4",
    "/assets/videos/013-eating-treekangaroo.mp4",
    "/assets/videos/014-sweet-hamster.mp4",
    "/assets/videos/015-eatingContest-guineapig.mp4",
    "/assets/videos/016-eatingContest-hare.mp4",
    "/assets/videos/017-eating-hamster.mp4",
    "/assets/videos/018-falling-hamster.mp4",
    "/assets/videos/019-snuggly-otter.mp4",
    "/assets/videos/020-sleepy-seacow.mp4",
    "/assets/videos/021-sa-hi-cat.mp4",
  ];

  const selectIndex = Math.floor(Math.random() * videos.length);

  return videos[selectIndex];
});

function newRound() {
  scoreStore.reset();
  router.push({ path: routingStore.currentQuizRoute });
}
</script>
<style lang="scss">
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";

img,
video {
  object-fit: contain;

  @include media-breakpoint-up(lg) {
    max-height: 600px;
  }
}
</style>
