<template>
  <div class="landing" :class="{ 'landing__has-openned': props.hasOpenned }">
    <img
      v-if="imageLoaded"
      alt="landing image"
      class="landing__image"
      :src="backgroundImage"
    />
    <div v-else class="landing__skeleton" />
    <img
      alt="sparkle gif"
      class="landing__gif"
      src="https://i.gifer.com/2iiB.gif"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const props = defineProps<{
  hasOpenned?: boolean
}>()

const backgroundImage = ref(
  new URL('../assets/landing.webp', import.meta.url).href
)
const imageLoaded = ref(false)
onBeforeMount(async () => {
  await preLoadImage()
  imageLoaded.value = true
})

const preLoadImage = () => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = backgroundImage.value
    img.onload = resolve
    img.onerror = reject
  })
}
</script>

<style scoped lang="scss">
.landing {
  width: 100%;
  position: relative;

  &__has-openned {
    margin-top: 48px;
  }

  &__skeleton {
    width: 576px;
    height: 864px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    background-color: #dddbdd;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
      );
      animation: shimmer 5s infinite;
      content: '';
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  }

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
