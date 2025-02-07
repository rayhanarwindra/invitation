<template>
  <div class="message" ref="rootElement">
    <div class="message__title">{{ t('messages') }}</div>
    <div class="message__content">
      <form
        v-if="!isMessageSent"
        @submit.prevent="submitMessage"
        class="message__form form"
      >
        <div class="form__group">
          <label for="message" class="form__label">{{
            t('anything_to_say')
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
          <label for="sender" class="form__label">{{ t('name') }}</label>
          <input
            id="sender"
            name="sender"
            v-model="formData.sender"
            :placeholder="t('write_name')"
            class="form__input"
          />
        </div>
        <button class="form__button">{{ t('send_message') }}</button>
      </form>
      <div class="message__sent sent" v-else>
        <img class="sent__check" :src="check" alt="check" />
        <span class="sent__text">
          <span class="sent__green">{{ t('message_sent') }}!</span>
          {{ t('thank_you') }}.
        </span>
      </div>
      <div class="message__items">
        <div class="message__item item" v-for="message in messages">
          <span class="item__sender">{{ message.sender }}</span>
          <span class="item__message">{{ message.message }}</span>
        </div>
        <div class="message__pagination">
          <vue-awesome-paginate
            :total-items="totalPage"
            :items-per-page="5"
            :max-pages-shown="3"
            v-model="currentPage"
            @click="onChangePage"
          >
            <template #prev-button>
              <ArrowLeft class="pagination__arrow" />
            </template>
            <template #next-button>
              <ArrowRight class="pagination__arrow" />
            </template>
          </vue-awesome-paginate>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '../lib/supabaseClient'
import check from '../assets/check.svg'
import { VueAwesomePaginate } from 'vue-awesome-paginate'
import ArrowRight from './ArrowRight.vue'
import ArrowLeft from './ArrowLeft.vue'

interface MessageType {
  sender: string
  message: string
  created_at: string
  id: number
}

const { t } = useI18n()

const rootElement = ref<HTMLElement | null>(null)
const isMessageSent = ref<boolean>(false)
const currentPage = ref<number>(1)
const messages = ref<MessageType[]>([])
const totalPage = ref<number>(0)

const formData = reactive({
  message: '',
  sender: '',
})

onMounted(() => {
  getTotalMessages()
  getMessages()
})

const getTotalMessages = async () => {
  const { count } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
  if (count) {
    totalPage.value = count
  }
}

const getMessages = async () => {
  const page = currentPage.value - 1
  const { data } = await supabase
    .from('messages')
    .select()
    .range(0 + page * 5, 4 + page * 5)
    .order('created_at', { ascending: false })
    .returns<MessageType[]>()
  if (data) {
    messages.value = data
  }
}

const submitMessage = async () => {
  if (!formData.message || !formData.sender) {
    return
  }
  try {
    await supabase.from('messages').insert({
      ...formData,
    })
    await getMessages()
    await getTotalMessages()
    isMessageSent.value = true
  } catch (e) {
    console.log(e)
  }
}

const onChangePage = (page: number) => {
  currentPage.value = page
  getMessages()
}

defineExpose({
  getRootElement: () => rootElement.value,
})
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

  &__pagination {
    margin: 0 auto;
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
    font-family: 'Montserrat', serif;
    resize: none;
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

.sent {
  background: #f2f9d9;
  border: 0.5px solid #0da858;
  border-radius: 8px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;

  &__green {
    font-weight: 700;
    color: #0da858;
  }
}

.pagination {
  &__arrow {
    fill: #000;
    display: flex;
    justify-content: space-between;
  }

  &__buttons {
    border: none;
    background: none;
  }
}
</style>

<style>
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 131px;
}

.paginate-buttons {
  border: none;
  background: none;
  cursor: pointer;
}

.number-buttons {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  font-family: 'Montserrat', serif;
}

.active-page {
  font-weight: 700;
  text-decoration: underline;
}
</style>
