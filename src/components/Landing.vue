<template>
  <div class="landing">
    <img alt="landing image" class="landing__image" :src="Banner"/>
    <img alt="sparkle gif" class="landing__gif" src="https://i.gifer.com/2iiB.gif">
  </div>
</template>

<script setup lang="ts">
import Banner from "../assets/Rayhan & Nabila Wedding Invitation RGB.webp";
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
