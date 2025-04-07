<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else-if="bank" class="bank-details">
    <img :src="bank.logo_url" alt="Логотип" class="logo" />
    <h1>{{ bank.name }}</h1>
    <p>Страна: {{ bank.country }}</p>
    <p><a :href="bank.website" target="_blank" class="link">Официальный сайт</a></p>


    <h3>Курсы валют:</h3>
    <ul>
      <li v-for="rate in bank.currency_rates" :key="rate.currency">
        {{ rate.currency }}: {{ rate.rate }}
      </li>
    </ul>

    <h3>Предложения:</h3>
    <ul>
      <li v-for="offer in bank.offers" :key="offer.link">
        <a :href="offer.link" target="_blank">{{ offer.description }}</a>
      </li>
    </ul>

    <NuxtLink :to="`/${locale}/banks`" class="back">← Назад к списку</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import useBank from '../composables/useBank';
const { locale } = useI18n()
const route = useRoute()
const { bank, loading, error } = useBank(route.params.id)
</script>

<style scoped>
.bank-details {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
}
.logo {
  max-width: 150px;
  height: auto;
}
.link {
  display: block;
  margin-top: 5px;
  color: blue;
}
.back {
  display: block;
  margin-top: 15px;
  font-weight: bold;
  color: darkblue;
}
.error {
  color: red;
}
</style>
