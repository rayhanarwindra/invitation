<script setup lang="ts">
import { useTemplateRef, ref, watch } from 'vue'
import {
  Navbar,
  Landing,
  Event,
  Gallery,
  Gift,
  Message,
  BottomBar,
  Overlay,
} from './components/index'

const event = useTemplateRef<typeof Event>('event')
const gallery = useTemplateRef<typeof Gallery>('gallery')
const gift = useTemplateRef<typeof Gift>('gift')
const message = useTemplateRef<typeof Message>('message')

const hasOpenned = ref<boolean>(false)

const scrollTo = (element: HTMLElement | null) => {
  element?.scrollIntoView({ behavior: 'smooth' })
}

const openInvitation = () => {
  hasOpenned.value = true
}

if (!new URLSearchParams(window.location.search).get('to')) {
  openInvitation()
}

watch(
  () => hasOpenned.value,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  },
  { immediate: true }
)


</script>

<template>
  <div class="app">
    <div class="app__container">
      <Overlay @open-invitation="openInvitation()" v-show="!hasOpenned" />
      <Navbar v-show="hasOpenned" />
      <Landing :hasOpenned="hasOpenned" />
      <Event ref="event" />
      <Gallery ref="gallery" />
      <Gift ref="gift" />
      <Message ref="message" />
      <BottomBar
        v-show="hasOpenned"
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
  font-family: 'Montserrat', serif;

  &__container {
    max-width: 576px;
    width: 100%;
    position: relative;
  }
}
</style>
