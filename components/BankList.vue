<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else>
    <UCard v-for="bank in banks" :key="bank.id" class="bank-card flex flex-col">
      <img :src="bank.logoURL as string" alt="Логотип" class="logo" />
      <template #header>
        <div class="font-semibold text-lg">
          {{ bank.name }}
        </div>
      </template>
      <div class="text-sm text-muted">
        {{ bank.country }}
      </div>
      <a :href="bank.website as string" target="_blank" class="link">Перейти на сайт</a>
      <template #footer>
        <UButton :to="localePath(`/bank/${bank.id}`)">
          Подробнее
        </UButton>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import useBanks from '../composables/useBanks'
import { useLocalePath } from '#i18n'

const localePath = useLocalePath()
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
