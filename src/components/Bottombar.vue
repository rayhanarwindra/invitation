<template>
  <div class="bottomBar">
    <div class="bottomBar__item" v-for="item in items">
      <img :src="item.image" />
      <span>{{ t(item.text) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import event from "../assets/event.svg";
import gallery from "../assets/gallery.svg";
import gift from "../assets/gift.svg";
import message from "../assets/message.svg";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const items = ref([
  {
    text: "event",
    image: event,
  },
  {
    text: "gallery",
    image: gallery,
  },
  {
    text: "gift",
    image: gift,
  },
  {
    text: "message",
    image: message,
  },
]);
</script>

<style scoped lang="scss">
    .bottomBar {
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        z-index: 3;
        background: rgba($color: #202020, $alpha: 0.9);
        width: 100%;
        box-sizing: border-box;
        width: 576px;
        padding: 24px 32px;
        border-radius: 24px 24px 0 0;

        &__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #999;
            font-size: 12px;
            line-height: 18px;
            font-weight: 500;
            gap: 8px;
            cursor: pointer;
            transition: 0.3s;

            &:hover {
                & > img {
                    transform: scale(1.1);
                }
            }

            & > img {
                width: 24px;
                height: 24px;
                transition: 0.3s;
            }
        }
    }
</style>
