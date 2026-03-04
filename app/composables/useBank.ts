import { ref, reactive, computed } from 'vue';
import {type Bank, useBankByIdQuery} from '~/gql-generated/types';
import { useI18n } from '#imports'
const useBank = function(id: string = '') {
  const { locale } = useI18n()

  // Вызов сгенерированной функции запроса
  const { result, loading, error } = useBankByIdQuery({
    id,  // Мы передаем переменную id в запрос,
    locale: locale.value
  });
  // Для удобства создаем реактивное свойство для банка
  const bank = computed(() =>  {
    return result?.value?.node
  });

  // Обрабатываем ответ
  // if (result.value && result.value.bank && result.value.bank.id) {
  //   debugger
  //   bank.value = result.value.bank;  // Получаем первый банк из edges
  // }

  // Возвращаем реактивные переменные
  return {
    bank,      // Отдаем данные о банке
    loading,   // Статус загрузки
    error      // Статус ошибки
  };
};

export default useBank;