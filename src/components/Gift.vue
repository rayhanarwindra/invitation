<template>
  <div ref="rootElement" class="gift">
    <div class="gift__content content">
      <img class="content__lantern" src="../assets/lantern.svg" alt="lantern" />
      <span class="content__title">{{ t("wedding_gift") }}</span>
      <span class="content__description">
        {{ t("giving") }}
        <span>{{ t("cashless") }}</span> {{ t("our_journey") }}
      </span>
      <div class="gift__goals">
        <div class="gift__goal goal">
          <img class="goal__image" :src="honeymoon" alt="honeymoon to japan" />
          <span class="goal__title">{{ t("honeymoon") }}</span>
        </div>
        <span class="gift__ampersand">&</span>
        <div class="gift__goal goal">
          <img class="goal__image" :src="house" alt="our house" />
          <span class="goal__title">{{ t("home") }}</span>
        </div>
      </div>
      <img class="gift__qris" :src="qris" alt="qris" />
      <span class="gift__or">{{ t("or") }}</span>
      <div class="gift__bank bank">
        <span class="bank__holder">
          <span class="bank__name">BCA </span>
          - Nabila Ayu Dewanti
        </span>
        <div class="bank__details">
          <span class="bank__account">5405202376</span>
          <button v-if="!isTextCopied" class="bank__copy" @click="copyBankAccount">
            <img :src="copy" alt="copy" />
            <span>{{ t("copy") }}</span>
          </button>
          <div class="bank__copy bank__copied" v-else>
            <span>{{ t("copied") }}</span>
            <img class="bank__check" :src="check" alt="check" />
          </div>
        </div>
      </div>
      <img :src="vines" class="content__vines" alt="vines" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import honeymoon from "../assets/honeymoon.webp";
import house from "../assets/house.webp";
import qris from "../assets/qris.png";
import copy from "../assets/copy.svg";
import vines from "../assets/vines.svg";
import check from "../assets/check.svg"
import { ref } from "vue";

const { t } = useI18n();
const isTextCopied = ref(false)

const copyBankAccount = async () => {
  await navigator.clipboard.writeText("5405202376");
  isTextCopied.value = true
};

const rootElement = ref<HTMLElement | null>(null);

defineExpose({
  getRootElement: () => rootElement.value,
});
</script>

<style scoped lang="scss">
.gift {
  background-color: #312a17;
  background-position: center;
  padding-top: 30px;

  &__goals {
    display: flex;
    justify-content: space-between;
    margin-top: 36px;
    width: 320px;
  }

  &__qris {
    margin-top: 36px;
    width: auto;
    height: 411px;
    object-fit: cover;
  }

  &__ampersand {
    color: #5b8568;
    font-weight: 700;
    font-size: 48px;
    line-height: 36px;
    align-self: center;
    font-family: "Pinyon Script", serif;
  }

  &__or {
    display: block;
    margin: 48px 0 24px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16.5px;
  }
}

.content {
  position: relative;
  background-image: url("../assets/kubah.svg");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  margin-top: 30px;

  &__vines {
    position: absolute;
    width: 100%;
    bottom: -85px;
    z-index: 2;
  }

  &__title {
    color: #5b8568;
    font-size: 24px;
    font-weight: 500;
    line-height: 36px;
    letter-spacing: 1.2px;
    text-align: center;
    display: block;
    margin-top: 20px;
  }

  &__lantern {
    height: 53px;
    width: auto;
    margin: 0 auto;
  }

  &__description {
    margin-top: 30px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.5px;
    text-align: center;
    width: 80%;

    & > span {
      font-weight: 700;
    }
  }
}

.goal {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 125px;
  gap: 6px;

  &__image {
    width: 125px;
    height: 125px;
    object-fit: cover;
  }

  &__title {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
  }
}

.bank {
  &__check {
    width: 16px;
    height: 16px;
  }

  &__holder {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    display: block;
    text-align: center;
  }

  &__name {
    font-weight: 700;
  }

  &__details {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    border-radius: 8px;
    background: #e5dfdb;
    padding: 16px;
    width: 270px;
    z-index: 3;
  }

  &__account {
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
  }

  &__copy {
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    background: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
  }

  &__copied {
    cursor: default;
  }
}
</style>
