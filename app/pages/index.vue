<script setup lang="ts">
import useBanks from '~/composables/useBanks'
import type { GetBanksQuery } from '~/gql-generated/types'

type BankNode = NonNullable<
    NonNullable<
        NonNullable<GetBanksQuery['banks']>['edges']
    >[number]
>['node']

type CurrencyCode = 'USD' | 'EUR' | 'GEL'
type Mode = 'sell' | 'buy'

type Row = {
  id: string
  name: string
  country: string
  website?: string | null
  buy: number
  sell: number
  updatedAt: string // ISO
  isBest: boolean
}

const localePath = useLocalePath()

const selectedCurrency = ref<CurrencyCode>('USD')
const mode = ref<Mode>('sell') // sell=покупаю валюту у банка → лучший min(sell)
const sortDir = ref<'best' | 'worst'>('best')

const currencyOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'TRY', value: 'TRY' }
]

const tabs = [
  { label: 'Buy', value: 'sell' },  // пользователь покупает валюту → сравниваем sell
  { label: 'Sell', value: 'buy' }   // пользователь продаёт валюту → сравниваем buy
] as const

const { banks, loading, error, refresh } = useBanks()

const columns = [
  { id: 'name', accessorKey: 'name', header: 'Bank' },
  { id: 'buy', accessorKey: 'buy', header: 'Buy' },
  { id: 'sell', accessorKey: 'sell', header: 'Sell' },
  { id: 'updatedAt', accessorKey: 'createdAt', header: 'Updated' },
  { id: 'actions', accessorKey: 'actions', header: '' }
]

const subtitle = computed(() => {
  return mode.value === 'sell'
      ? 'You buy currency from the bank — lower SELL is better.'
      : 'You sell currency to the bank — higher BUY is better.'
})

const rows = computed<Row[]>(() => {
  const currency = selectedCurrency.value

  const mapped = (banks.value as BankNode[])
      .map((b) => {
        if (!b) return null

        const name = b.translation?.name || b.name
        const rateRec = b.currencyRates?.find(r => r.currency === currency)

        if (typeof rateRec?.buy !== 'number' || typeof rateRec?.sell !== 'number') return null

        return {
          id: b.id,
          name,
          country: b.country,
          website: b.website,
          buy: rateRec.buy,
          sell: rateRec.sell,
          updatedAt: rateRec.createdAt,
          isBest: false
        } satisfies Row
      })
      .filter((x): x is Row => x !== null)

  const bestFirst = sortDir.value === 'best'

  mapped.sort((a, b) => {
    if (mode.value === 'sell') {
      // BUY tab (покупаю валюту): min(sell)
      const diff = a.sell - b.sell
      return bestFirst ? diff : -diff
    } else {
      // SELL tab (продаю валюту): max(buy)
      const diff = b.buy - a.buy
      return bestFirst ? diff : -diff
    }
  })

  if (!mapped.length) return mapped

  const bestValue = mode.value === 'sell' ? mapped[0].sell : mapped[0].buy
  const eq = (x: number, y: number) => Math.abs(x - y) < 1e-9

  return mapped.map(r => ({
    ...r,
    isBest: mode.value === 'sell' ? eq(r.sell, bestValue) : eq(r.buy, bestValue)
  }))
})

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

const sortLabel = computed(() => (sortDir.value === 'best' ? 'Best first' : 'Worst first'))
</script>

<template>
  <UContainer class="py-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Exchange rates in Georgia</h1>
        <p class="text-sm text-muted mt-1">{{ subtitle }}</p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <USelect v-model="selectedCurrency" :items="currencyOptions" class="w-28" />

        <!-- Tabs переключатель -->
        <UTabs
            v-model="mode"
            :items="tabs"
            class="w-[200px]"
        />

        <UButton variant="outline" :loading="loading" @click="refresh()">
          Refresh
        </UButton>
      </div>
    </div>

    <UCard class="mt-6">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="font-medium">{{ selectedCurrency }} rates by bank</div>
          <div v-if="error" class="text-sm text-red-500">Failed to load</div>
        </div>
      </template>

      <UTable :data="rows" :columns="columns" :loading="loading">
        <template #name-cell="{ row }">
          <div class="flex items-center gap-2">
            <UButton variant="link" :to="localePath(`/bank/${row.original.id}`)">
              <div class="font-medium">{{ row.original.name }}</div>
            </UButton>
            <UBadge v-if="row.original.isBest" color="success" variant="soft">Best</UBadge>
          </div>
          <div class="text-xs text-muted">{{ row.original.country }}</div>
        </template>

        <template #buy-cell="{ row }">
          <div class="font-semibold tabular-nums">{{ row.original.buy }}</div>
        </template>

        <template #sell-cell="{ row }">
          <div class="font-semibold tabular-nums">{{ row.original.sell }}</div>
        </template>

        <template #updatedAt-cell="{ row }">
          <div class="tabular-nums text-sm text-muted">
            {{ minutesAgo(row.original.updatedAt) }}
          </div>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex justify-end gap-2">
            <UButton size="sm" variant="soft" :to="localePath(`/bank/${row.original.id}`)">
              Details
            </UButton>

            <UButton
                v-if="row.original.website"
                size="sm"
                variant="outline"
                :to="row.original.website"
                target="_blank"
            >
              Website
            </UButton>
          </div>
        </template>
      </UTable>
    </UCard>
  </UContainer>
</template>