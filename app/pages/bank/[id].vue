<script setup lang="ts">
import useBank from '~/composables/useBank'
import { useLocalePath, useI18n } from '#i18n'

const localePath = useLocalePath()
const { locale } = useI18n()

const route = useRoute()
const { bank, loading, error } = useBank(route.params.id)

function hostFromUrl(url?: string | null) {
  if (!url) return null
  try {
    return new URL(url).host.replace(/^www\./, '')
  } catch {
    return null
  }
}

function minutesAgo(iso: string) {
  const ts = Date.parse(iso)
  if (!Number.isFinite(ts)) return '—'
  const diffMs = Date.now() - ts
  const mins = Math.max(0, Math.floor(diffMs / 60000))
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  return `${hrs}h ago`
}

const title = computed(() => bank.value?.translation?.name || bank.value?.name || '')
const description = computed(() => bank.value?.translation?.description || '')

const ratesColumns = [
  { id: 'currency', accessorKey: 'currency', header: 'Currency' },
  { id: 'buy', accessorKey: 'buy', header: 'Buy' },
  { id: 'sell', accessorKey: 'sell', header: 'Sell' },
  { id: 'createdAt', accessorKey: 'createdAt', header: 'Updated' }
]

const offersByType = computed(() => {
  const list = bank.value?.offers ?? []
  // лёгкая группировка по type, чтобы выглядело “богаче”
  const map = new Map<string, any[]>()
  for (const o of list) {
    const key = o.type || 'other'
    map.set(key, [...(map.get(key) ?? []), o])
  }
  return Array.from(map.entries())
})
</script>

<template>
  <UContainer class="py-8">
    <div v-if="loading" class="text-sm text-muted">Loading…</div>
    <div v-else-if="error" class="text-sm text-red-500">Failed to load bank</div>

    <div v-else-if="bank" class="space-y-6">
      <!-- Header -->
      <UCard>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-4">
            <!-- Logo -->
            <div class="h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5 bg-white">
              <img
                  v-if="bank.logoURL"
                  :src="bank.logoURL"
                  :alt="title"
                  class="h-full w-full object-contain p-2"
              />
              <div v-else class="h-full w-full grid place-items-center text-xs text-muted">
                No logo
              </div>
            </div>

            <!-- Title -->
            <div class="min-w-0">
              <h1 class="text-xl font-semibold leading-tight truncate">
                {{ title }}
              </h1>
              <div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
                <span>{{ bank.country }}</span>
                <span v-if="bank.website">•</span>
                <span v-if="bank.website">{{ hostFromUrl(bank.website) }}</span>
              </div>

              <p v-if="description" class="mt-2 text-sm text-muted max-w-prose">
                {{ description }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <UButton
                variant="outline"
                class="w-full justify-center sm:w-auto"
                :to="localePath(`/banks`)"
            >
              ← Back
            </UButton>

            <UButton
                v-if="bank.website"
                class="w-full justify-center sm:w-auto"
                :to="bank.website"
                target="_blank"
            >
              Official website
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- Content -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Rates -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="font-medium">Exchange rates</div>
              <div class="text-xs text-muted">Buy / Sell</div>
            </div>
          </template>

          <div v-if="!bank.currencyRates?.length" class="text-sm text-muted">
            No rates yet
          </div>

          <div v-else class="overflow-x-auto">
            <UTable
                :data="bank.currencyRates"
                :columns="ratesColumns"
                class="min-w-[520px]"
            >
              <template #currency-cell="{ row }">
                <div class="font-medium">{{ row.original.currency }}</div>
              </template>

              <template #buy-cell="{ row }">
                <div class="font-semibold tabular-nums">
                  {{ row.original.buy ?? '—' }}
                </div>
              </template>

              <template #sell-cell="{ row }">
                <div class="font-semibold tabular-nums">
                  {{ row.original.sell ?? '—' }}
                </div>
              </template>

              <template #createdAt-cell="{ row }">
                <div class="text-sm text-muted tabular-nums">
                  {{ minutesAgo(row.original.createdAt) }}
                </div>
              </template>
            </UTable>
          </div>
        </UCard>

        <!-- Offers -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="font-medium">Offers</div>
              <div class="text-xs text-muted">
                {{ bank.offers?.length || 0 }}
              </div>
            </div>
          </template>

          <div v-if="!bank.offers?.length" class="text-sm text-muted">
            No offers yet
          </div>

          <div v-else class="space-y-4">
            <div v-for="[type, list] in offersByType" :key="type" class="space-y-2">
              <div class="text-xs uppercase tracking-wide text-muted">
                {{ type }}
              </div>

              <div
                  v-for="offer in list"
                  :key="offer.id"
                  class="rounded-2xl border border-black/5 p-3"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <div class="font-medium leading-snug">
                      {{ offer.description }}
                    </div>
                    <div v-if="offer.link" class="mt-1 text-xs text-muted">
                      {{ hostFromUrl(offer.link) }}
                    </div>
                  </div>

                  <UButton
                      v-if="offer.link"
                      size="sm"
                      variant="outline"
                      class="shrink-0 whitespace-nowrap"
                      :to="offer.link"
                      target="_blank"
                  >
                    Open
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>