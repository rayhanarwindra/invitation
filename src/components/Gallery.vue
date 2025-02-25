<template>
  <div ref="rootElement" class="gallery">
    <span class="gallery__title">{{ t('gallery') }}</span>
    <div class="gallery__photos photos">
      <img class="photos__one" :src="Gallery1" alt="photo gallery 1" />
      <img class="photos__two" :src="Gallery2" alt="photo gallery 2" />
      <img class="photos__three" :src="Gallery3" alt="photo gallery 3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Gallery1 from '../assets/gallery_1.webp'
import Gallery2 from '../assets/gallery_2.webp'
import Gallery3 from '../assets/gallery_3.webp'
import { ref } from 'vue'

const { t } = useI18n()

const rootElement = ref<HTMLElement | null>(null)
defineExpose({
  getRootElement: () => rootElement.value,
})
</script>

<style scoped lang="scss">
.gallery {
  background-color: #312a17;
  padding-top: 30px;
  margin: 0;

  &__title {
    display: block;
    padding-top: 24px;
    text-align: center;
    font-size: 24px;
    color: #fff8f3;
    line-height: 36px;
    letter-spacing: 1.2px;
  }
}

.photos {
  display: grid;
  padding: 0 15px;
  grid-template-areas: 'one two' 'three three';
  margin-top: 20px;
  gap: 10px;

  &__one {
    grid-area: one;
    width: 100%;
    object-fit: cover;
    object-position: bottom;
  }

  &__two {
    grid-area: two;
    width: 100%;
    object-fit: cover;
    object-position: bottom;
  }

  &__three {
    grid-area: three;
    width: 100%;
    object-fit: cover;
    object-position: 10px 75%;
    height: 237px;
  }
}
</style>
