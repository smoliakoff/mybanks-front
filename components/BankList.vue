<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else>
    <div v-for="bank in banks" :key="bank.id" class="bank-card">
      <img :src="bank.logoURL as string" alt="Логотип" class="logo" />
      <h3>{{ bank.name }}</h3>
      <p>Страна: {{ bank.country }}</p>
      <a :href="bank.website as string" target="_blank" class="link">Перейти на сайт</a>
      <NuxtLink :to="`/${locale}/bank/${bank.id}`" class="details">Подробнее</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
const { locale } = useI18n()
import useBanks from '../composables/useBanks'
const { banks, loading, error } = useBanks(10)
</script>

<style scoped>
.bank-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  background: #f9f9f9;
}
.logo {
  max-width: 100px;
  height: auto;
}
.link {
  display: block;
  margin-top: 5px;
  color: blue;
}
.details {
  display: block;
  margin-top: 5px;
  font-weight: bold;
  color: darkblue;
}
.error {
  color: red;
}
</style>
