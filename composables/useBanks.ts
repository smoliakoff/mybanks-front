import { ref, onMounted } from "vue";
import { BankApi } from "@/api/api";
import type { BankRead } from "@/api/models";

const api = new BankApi();

export function useBanks() {
  const banks = ref<BankRead[]>([]);
  const isLoading = ref(false);
  const error = ref<unknown>(null);


  const load = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data } = await api.listBank(); // ← имя метода зависит от operationId
      banks.value = data;
    } catch (err) {
      error.value = err;
      console.error("Ошибка при загрузке банков:", err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(load);

  return {
    banks,
    isLoading,
    error,
    reload: load,
  };
}