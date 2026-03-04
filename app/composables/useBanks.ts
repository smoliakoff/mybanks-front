import {useGetBanksQuery} from "~/gql-generated/types";
import {computed} from "vue";
import { useI18n } from '#imports'
const useBanks = function(first: number = 10) {
  const { locale } = useI18n()
  // Вызов сгенерированной функции запроса
  const {
    result,
    loading,
    error
  } = useGetBanksQuery({locale: locale.value})

  const banks = computed(() => result.value?.banks?.edges
    ?.map(e => e?.node!));

  // Возвращаем реактивные переменные
  return {
    banks, // ожидается, что result.value имеет структуру { banks: { edges: [...] } }
    loading,
    error,
  }
}

export default useBanks