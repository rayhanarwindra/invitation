<script setup lang="ts">
import { useTemplateRef, type Ref } from "vue";
import {
  Navbar,
  Landing,
  Event,
  Gallery,
  Gift,
  Message,
  BottomBar,
} from "./components/index.ts";

const event = useTemplateRef<typeof Event>("event");
const gallery = useTemplateRef<typeof Gallery>("gallery");
const gift = useTemplateRef<typeof Gift>("gift");
const message = useTemplateRef<typeof Message>("message");

const scrollTo = (element: HTMLElement | null) => {
  element?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div class="app">
    <div class="app__container">
      <Navbar />
      <Landing />
      <Event ref="event" />
      <Gallery ref="gallery" />
      <Gift ref="gift" />
      <Message ref="message" />
      <BottomBar
        @event="scrollTo(event?.getRootElement())"
        @gallery="scrollTo(gallery?.getRootElement())"
        @gift="scrollTo(gift?.getRootElement())"
        @message="scrollTo(message?.getRootElement())"
      />
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
