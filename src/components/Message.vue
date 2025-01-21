<template>
    <div ref="rootElement">

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rootElement = ref<HTMLElement | null>(null);

defineExpose({
  getRootElement: () => rootElement.value,
})
</script>

<style scoped>

</style>