<script setup lang="ts">
import useBanks from '~/composables/useBanks'
import { useLocalePath, useI18n } from '#i18n'

const localePath = useLocalePath()
const { locale } = useI18n()

const { banks, loading, error, refresh } = useBanks(24) // можно 10, но для сетки приятнее 24

function hostFromUrl(url?: string | null) {
  if (!url) return null
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return null
  }
}

function displayName(b: any) {
  return b?.translation?.name || b?.name || ''
}
</script>

<template>
  <UContainer class="py-8">
    <div class="flex items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-semibold">Banks</h1>
        <p class="text-sm text-muted mt-1">Browse banks and open details.</p>
      </div>

      <UButton variant="outline" :loading="loading" @click="refresh()">
        Refresh
      </UButton>
    </div>

    <div v-if="loading" class="mt-6 text-sm text-muted">Loading…</div>
    <div v-else-if="error" class="mt-6 text-sm text-red-500">Failed to load</div>

    <div v-else class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <UCard
          v-for="bank in banks"
          :key="bank.id"
          class="h-full"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <!-- logo -->
            <div class="h-12 w-12 shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5 bg-white">
              <img
                  v-if="bank.logoURL"
                  :src="bank.logoURL"
                  :alt="displayName(bank)"
                  class="h-full w-full object-contain p-2"
              />
              <div v-else class="h-full w-full grid place-items-center text-[10px] text-muted">
                No logo
              </div>
            </div>

            <!-- title -->
            <div class="min-w-0">
              <div class="font-semibold leading-tight truncate">
                {{ displayName(bank) }}
              </div>
              <div class="mt-0.5 text-xs text-muted">
                {{ bank.country }}
                <span v-if="bank.website"> • {{ hostFromUrl(bank.website) }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- body -->
        <div class="space-y-3">
          <p v-if="bank.translation?.description" class="text-sm text-muted line-clamp-3">
            {{ bank.translation.description }}
          </p>

          <div v-else class="text-sm text-muted">
            No description
          </div>
        </div>

        <template #footer>
          <div class="flex items-center justify-between gap-2">
            <UButton
                size="sm"
                class="whitespace-nowrap"
                :to="localePath(`/bank/${bank.id}`)"
            >
              Details
            </UButton>

            <UButton
                v-if="bank.website"
                size="sm"
                variant="outline"
                class="whitespace-nowrap"
                :to="bank.website"
                target="_blank"
            >
              Website
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>