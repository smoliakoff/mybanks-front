import {useGetBanksQuery} from "../gql-generated/types";
import {computed} from "vue";
const useBanks = function(first: number = 10) {
  // Вызов сгенерированной функции запроса
  const {result, loading, error } = useGetBanksQuery()

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