<template>
  <div class="landing">
    <img class="landing__image" :src="Banner"/>
    <img class="landing__gif" src="https://i.gifer.com/2iiB.gif" alt="">
  </div>
</template>

<script setup lang="ts">
import Banner from "../assets/Rayhan & Nabila Wedding Invitation RGB.webp";
</script>

<style scoped lang="scss">
.landing {
    width: 100%;
    position: relative;
    height: 669px;

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
