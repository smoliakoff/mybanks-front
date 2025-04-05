import { ref, reactive, computed } from 'vue';
import {type Bank, useGetBankQuery} from '../gql-generated/types';

const useBank = function(id: string = '') {
  // Вызов сгенерированной функции запроса
  const { result, loading, error } = useGetBankQuery({
    id  // Мы передаем переменную id в запрос
  });
  // Для удобства создаем реактивное свойство для банка
  const bank = computed(() =>  {
    return result?.value?.bank as Bank
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