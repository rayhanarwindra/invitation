<template>
  <nav :class="{ navbar__hidden: !showNavbar }" class="navbar" id="navbar">
    <span class="navbar__title"
      >R<span class="navbar__ampersand">&</span>N</span
    >
    <div ref="langDropdown" class="navbar__language language">
      <button @click="isLangOpen = !isLangOpen" class="language__button">
        <template v-if="i18n.locale.value === 'id'">
          <img alt="indo flag" :src="Indonesian" />
          Bahasa
        </template>
        <template v-else>
          <img alt="uk flag" :src="English" />
          English
        </template>
        <img alt="chevron down" :src="ChevronDown" />
      </button>
      <div v-show="isLangOpen" class="language__dropdown">
        <button @click="toggleLanguage('id')" class="language__option">
          <img alt="indo flag" :src="Indonesian" />
          Bahasa
        </button>
        <button @click="toggleLanguage('en')" class="language__option">
          <img alt="uk flag" :src="English" />
          English
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import Indonesian from '../assets/Indonesia (ID).svg'
import English from '../assets/United Kingdom (GB).svg'
import ChevronDown from '../assets/chevron.svg'
import { useI18n } from 'vue-i18n'

const isLangOpen = ref<boolean>(false)
const langDropdown: Ref<HTMLDivElement | null> = ref(null)
const showNavbar = ref<boolean>(true)

const i18n = useI18n()

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)
})

const handleClickOutside = (event: MouseEvent) => {
  if (
    langDropdown.value &&
    !langDropdown.value.contains(event.target as Node)
  ) {
    isLangOpen.value = false
  }
}

let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > lastScrollY) {
    showNavbar.value = false
  } else {
    showNavbar.value = true
  }

  lastScrollY = currentScrollY
}

const toggleLanguage = (lang: string) => {
  i18n.locale.value = lang
  isLangOpen.value = false
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 576px;
  background: rgba($color: #202020, $alpha: 0.9);
  padding: 8px 16px;
  box-sizing: border-box;
  position: fixed;
  z-index: 4;
  top: 0;
  transition: top 0.3s;

  &__hidden {
    top: -48px;
  }

  &__title {
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 5%;
    line-height: 30px;
  }

  &__ampersand {
    font-family: 'Pinyon Script', serif;
  }
}

.language {
  position: relative;

  &__button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #fff;
    font-size: 12px;
    line-height: 22px;
    font-weight: 500;
  }

  &__dropdown {
    position: absolute;
    list-style-type: none;
    border-radius: 16px;
    background: #fff;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 132px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    left: -25px;
    top: 30px;
    z-index: 4;
  }

  &__option {
    cursor: pointer;
    padding: 12px 4px;
    border: none;
    background: #fff;
    width: 100%;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    &:first-child {
      border-radius: 16px 16px 0 0;
    }

    &:last-child {
      border-radius: 0 0 16px 16px;
    }

    &:hover {
      background: #e4f0e8;
    }
  }
}
</style>
