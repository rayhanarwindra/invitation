<template>
  <div class="landing">
    <img v-if="imageLoaded" alt="landing image" class="landing__image" :src="backgroundImage"/>
    <img alt="sparkle gif" class="landing__gif" src="https://i.gifer.com/2iiB.gif">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const backgroundImage = ref(new URL("../assets/landing.webp", import.meta.url).href)
const imageLoaded = ref(false)
onMounted(() => {
  preLoadImage()
})

const preLoadImage = () => {
  const img = new Image()
  img.src = backgroundImage.value
  img.onload = () => {
    imageLoaded.value = true
  }
}
</script>

<style scoped lang="scss">
.landing {
    width: 100%;
    position: relative;
    height: fit-content;

    &__gif {
        position: absolute;
        left: 0;
        width: 100%;
    }
    &__image {
        width: 100%;
        object-fit: cover;
    }
}
</style>
