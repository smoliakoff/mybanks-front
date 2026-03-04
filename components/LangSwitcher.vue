<script setup lang="ts">
import { useI18n } from '#imports'
const { locales, setLocale } = useI18n()
</script>

<template>
  <div>
    <UButton v-for="locale in locales" @click="setLocale(locale.code)" color="neutral">
      {{ locale.name }}
    </UButton>
    <h1>{{ $t('welcome') }}</h1>
  </div>
</template>

<style scoped>

</style>