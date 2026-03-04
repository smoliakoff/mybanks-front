<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (v: boolean) => {
    colorMode.preference = v ? 'dark' : 'light'
  }
})
</script>

<template>
  <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm
           bg-white/80 dark:bg-gray-900/60 dark:border-gray-700
           hover:bg-gray-50 dark:hover:bg-gray-900 transition"
      @click="colorMode.preference = (colorMode.value === 'dark' ? 'light' : 'dark')"
  >
    <span class="select-none">
      {{ colorMode.value === 'dark' ? '🌙' : '☀️' }}
    </span>
    <span class="select-none">
      {{ colorMode.value === 'dark' ? 'Dark' : 'Light' }}
    </span>
  </button>
</template>