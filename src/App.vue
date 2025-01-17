<script setup lang="ts">
import {
  Navbar,
  Landing,
  Event,
  Gallery,
  Gift,
  Message,
  BottomBar
} from "./components/index.ts";
</script>

<template>
  <div class="app">
    <div class="app__container">
      <Navbar />
      <Landing />
      <Event />
      <Gallery />
      <Gift />
      <Message />
      <BottomBar />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  justify-content: center;
  font-family: "Montserrat", serif;

  &__container {
    max-width: 576px;
    width: 100%;
  }
}
</style>
