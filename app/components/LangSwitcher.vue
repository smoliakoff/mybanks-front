<script setup lang="ts">
import { useI18n } from '#imports'
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <div>
    <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
      {{ locale.name }}
    </NuxtLink>
    <h1>{{ $t('welcome') }}</h1>
  </div>
</template>

<style scoped>

</style>