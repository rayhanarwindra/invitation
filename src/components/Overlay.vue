<template>
  <div class="overlay">
    <div class="overlay__content">
      <span class="overlay__header">Kepada Yth.</span>
      <span class="overlay__recipient">{{
        recipient
          ?.split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }}</span>
      <img class="overlay__separator" :src="separator" />
      <button @click="emit('open-invitation')" class="overlay__button">
        Buka Undangan
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import separator from '../assets/separator.webp'

const queryParams = new URLSearchParams(window.location.search)
const recipient = queryParams.get('to')
const emit = defineEmits<{
  (e: 'open-invitation'): void
}>()

if (!recipient) {
  emit('open-invitation')
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  height: 100vh;
  width: inherit;
  background: linear-gradient(
    180deg,
    rgba(217, 217, 217, 0) 0%,
    rgba(255, 248, 243, 1) 70%
  );
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  &__content {
    margin-bottom: 82px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  &__header {
    font-size: 12px;
    line-height: 150%;
    font-weight: 500;
  }

  &__recipient {
    font-size: 16px;
    font-weight: 500;
    line-height: 150%;
    margin-top: 4px;
  }

  &__separator {
    max-width: 300px;
    margin-top: 12px;
  }

  &__button {
    &:hover {
      opacity: 0.8;
    }

    transition: 0.3s;
    cursor: pointer;
    margin-top: 12px;
    background-color: #5b8568;
    border-radius: 50px;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    line-height: 150%;
    padding: 12px 98px;
    border: none;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3), 0px 4px 8px rgba(0, 0, 0, 0.15);
  }
}
</style>
