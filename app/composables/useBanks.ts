import { useGetBanksQuery } from '~/gql-generated/types'
import { computed, unref } from 'vue'
import { useI18n } from '#imports'

const useBanks = (first: number = 10) => {
  const { locale } = useI18n()

  const { result, loading, error, refetch } = useGetBanksQuery(
    () => ({ locale: unref(locale) }) // ✅ реактивно
  )

  const banks = computed(() => result.value?.banks?.edges?.map(e => e?.node!).filter(Boolean) ?? [])

  const refresh = () => refetch({ locale: unref(locale) })

  return {
    banks,
    loading,
    error,
    refresh
  }
}

export default useBanks