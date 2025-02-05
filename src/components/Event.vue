<template>
  <div ref="rootElement" class="event">
    <div class="event__title">{{ t("event_details") }}</div>
    <div class="event__details details">
      <span class="details__highlight">
        {{ t("saturday") }}
      </span>
      <div class="details__time">
        <span class="details__month">
          {{ t("october") }}
        </span>
        <span class="details__date">11</span>
        <span class="details__year">2025</span>
      </div>
      <span class="details__highlight"> 11:00-13:00 </span>
    </div>
    <div class="event__location location">
      <img alt="pinpoint" :src="PinPoint" />
      <div class="location__details">
        <span class="location__building">{{ t("al_azhar") }}</span>
        <span class="location__area">KEBAYORAN BARU, JAKARTA SELATAN</span>
      </div>
    </div>
    <div class="event__map">
      <iframe
        title="google maps"
        width="300"
        height="300"
        style="border: 0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        :src="`https://www.google.com/maps/embed/v1/place?q=place_id:${PLACE_ID}&key=${API_KEY}`"
      >
      </iframe>
    </div>
    <a target="_blank" :href="calendarLink" class="event__calendar">
      <img alt="calendar" :src="GoogleCalendar" />
      {{ t("add_to_calendar") }}
    </a>
    <img alt="masjid background" :src="Masjid" class="event__masjid" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import PinPoint from "../assets/pinpoint.svg";
import GoogleCalendar from "../assets/google_calendar.svg";
import Masjid from "../assets/masjid.svg";
import { ref } from "vue";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const PLACE_ID = import.meta.env.VITE_PLACE_ID;

const { t } = useI18n();
const calendarLink =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ray+%26+Nabila%27s+Wedding&dates=20251011T110000/20251011T130000&details=Ray+%26+Nabila%27s+Wedding&location=Masjid+Agung+Al-Azhar+Blok+M%2C+Jakarta%2C+Indonesia&ctz=Asia/Jakarta";

const rootElement = ref<HTMLElement | null>(null);

defineExpose({
  getRootElement: () => rootElement.value,
})
</script>

<style scoped lang="scss">
.event {
  background: #fff8f3;
  position: relative;
  padding-bottom: 190px;

  &__title {
    text-align: center;
    color: #5b8568;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 1.2px;
    line-height: 36px;
    padding-top: 36px;
  }

  &__map {
    display: flex;
    justify-content: center;
    margin-top: 18px;
    position: relative;
    z-index: 2;
  }

  &__calendar {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: #fff;
    border-radius: 50px;
    color: #000;
    text-decoration: none;
    width: 193px;
    display: flex;
    justify-content: center;
    padding: 16px 0;
    gap: 8px;
    margin-top: 24px;
    margin-left: auto;
    margin-right: auto;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    z-index: 2;
    position: relative;
  }

  &__masjid {
    position: absolute;
    bottom: -1px;
    width: 100%;
    z-index: 1;
    object-fit: cover;
  }
}

.details {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;

  &__highlight {
    color: #000;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    border-top: 1px solid #5b8568;
    border-bottom: 1px solid #5b8568;
    padding: 8px 0;
    width: 96px;
    text-align: center;
  }

  &__time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  &__month {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: #000;
  }

  &__date {
    color: #5b8568;
    font-size: 40px;
    line-height: 60px;
    font-family: "Great Vibes", serif;
  }

  &__year {
    font-size: 12px;
    line-height: 18px;
    font-weight: 500;
    color: #000;
    letter-spacing: 6.7px;
  }
}

.location {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 14px;

  &__details {
    display: flex;
    flex-direction: column;
    font-weight: 500;
  }

  &__building {
    font-size: 16px;
    line-height: 24px;
    color: #5b8568;
  }

  &__area {
    font-size: 12px;
    line-height: 18px;
    color: #000;
  }
}
</style>
