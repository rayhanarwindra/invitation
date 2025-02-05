<template>
  <div class="message" ref="rootElement">
    <div class="message__title">{{ t("messages") }}</div>
    <div class="message__content">
      <form @submit.prevent="submitMessage" class="message__form form">
        <div class="form__group">
          <label for="message" class="form__label">{{
            t("anything_to_say")
          }}</label>
          <textarea
            id="message"
            name="message"
            v-model="formData.message"
            :placeholder="t('write_message')"
            rows="5"
            class="form__textarea"
          ></textarea>
        </div>
        <div class="form__group">
          <label for="sender" class="form__label">{{ t("name") }}</label>
          <input
            id="sender"
            name="sender"
            v-model="formData.sender"
            :placeholder="t('write_name')"
            class="form__input"
          />
        </div>
        <button class="form__button">{{ t("send_message") }}</button>
      </form>
      <div class="message__items">
        <div class="message__item item" v-for="message in messages">
          <span class="item__sender">{{ message.sender }}</span>
          <span class="item__message">{{ message.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { supabase } from "../lib/supabaseClient";

interface MessageType {
  sender: string;
  message: string;
  created_at: string;
  id: number;
}

const { t } = useI18n();

const rootElement = ref<HTMLElement | null>(null);

const formData = reactive({
  message: "",
  sender: "",
});

const messages = ref<MessageType[]>([]);

const getMessages = async () => {
  const { data } = await supabase
    .from("messages")
    .select()
    .order("created_at", { ascending: false })
    .returns<MessageType[]>();
  if (data) {
    messages.value = data;
  }
};

const submitMessage = async () => {
  if (!formData.message || !formData.sender) {
    return;
  }
  try {
    await supabase.from("messages").insert({
      ...formData,
    });
    getMessages();
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  getMessages();
});

defineExpose({
  getRootElement: () => rootElement.value,
});
</script>

<style scoped lang="scss">
.message {
  padding-top: 100px;
  padding-bottom: 100px;
  background: #e4f0e8;
  position: relative;

  &__title {
    text-align: center;
    font-size: 40px;
    line-height: 36px;
    letter-spacing: 2px;
  }

  &__content {
    width: 300px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 40px;
  }

  &__items {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    font-weight: 500;
    background: #fff;
    border: 1px solid #5b8568;
    border-radius: 12px;
  }

  &__textarea {
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #5b8568;
    border-radius: 12px;
    padding: 16px 12px;
    font-weight: 500;
    font-family: "Montserrat", serif;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__label {
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.2px;
  }

  &__button {
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
      0px 4px 8px 3px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    border-radius: 50px;
    background: #5b8568;
    color: #fff;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.2px;
    border: none;
    padding: 16px 0;
  }
}

.item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 0.5px solid #5b8568;
  padding-bottom: 16px;

  &__sender {
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
  }

  &__message {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
  }
}
</style>
